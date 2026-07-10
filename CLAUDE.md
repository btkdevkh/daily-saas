# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Daily SaaS is a Next.js 16 (App Router) personal-utilities dashboard: appointment (RDV), password vault, running tracker, budget/bank, user admin, and an OpenAI chat proxy. UI text and domain terms are in French — match this when writing user-facing strings and error messages.

## Commands

```bash
npm run dev              # Next dev server on http://localhost:3000 (Turbopack)
npm run build            # Production build
npm run lint             # ESLint (eslint-config-next, core-web-vitals + typescript)

# Prisma / DB (PostgreSQL by default)
npx prisma migrate dev --name <name>   # Create + apply migration
npx prisma generate                    # Regenerate client (needed after schema edits)
npx prisma db seed                     # Seed fake data (tsx prisma/seed.ts)
```

There is no test framework configured in this repo. Environment variables are required for most flows — see README.md for the full `.env` list (DB, NextAuth, SMTP, master key, cron secret, chat AI URL).

Docker: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build` (dev) or `docker-compose.prod.yml` (prod).

## Architecture

**Server Actions are the API layer.** There is almost no REST; data flows through `"use server"` functions in `actions/`, organized by verb then domain: `actions/{get,post,update,delete}/<domain>.ts` (domains: bank, chatai, password, rdv, running, user) plus `actions/auth/user.ts`. Pages and components import these directly. The only route handlers are `app/api/auth/[...nextauth]/route.ts` and `app/api/cron/notify-rdv/route.ts`.

**Conventions every action follows** — replicate these when adding one:
- Mutations (`post`/`update`) take `(prevState, formData)` and are used with React `useActionState`. They read fields via `formData.get(...)`, return `{ ...prevState, success, message }`.
- Reads return `{ success, message, <domain> }` on success or `{ error }` on failure.
- Every action calls `getConnectedUser()` (from `actions/auth/user.ts`) first and throws `"Identification inconnu"` if absent; queries are then scoped by `userId: user.id`.
- The same three-branch `try/catch` (`SyntaxError` → `"message" in err` → `"Internal server error"`) is copy-pasted everywhere.
- Mutations call `revalidatePath("/")` after writing.

**Auth** (`lib/auth.ts`, NextAuth v4, JWT strategy): two `CredentialsProvider`s — `password-login` (bcrypt) and `otp-login` (6-digit code emailed via `AuthCode` table, SHA-256 hashed, 15-min expiry). `role` and `image` are threaded through the jwt/session callbacks; session typing is extended in `types/next-auth.d.ts`. Password-reset uses a hashed token in `PasswordResetToken` (1-hour expiry).

**Route protection** lives in `proxy.ts` at the repo root (Next.js 16 renamed `middleware.ts` → `proxy.ts`; it exports a `proxy` function + `config.matcher`). It redirects unauthenticated users away from `/dashboard` and `/resetpass`, and authenticated users away from `/login`.

**Prisma client** (`lib/prisma.ts`): singleton on `globalForPrisma`, using the `@prisma/adapter-pg` (PostgreSQL) adapter. A commented-out block switches to the better-sqlite3 adapter — toggling DB engines means editing this file *and* the `datasource` provider in `prisma/schema.prisma`.

**Password vault encryption** (`actions/post/password.ts`): stored passwords are AES-256-GCM encrypted (not hashed — they must be recoverable). The key is `sha256(NEXT_PUBLIC_MASTER_KEY)`; `encrypt`/`decrypt` helpers live at the bottom of that file and serialize `{iv, tag, data}` as JSON. This is distinct from user *account* passwords, which are bcrypt-hashed.

**Cron / email reminders**: `app/api/cron/notify-rdv` (GET, guarded by `Bearer ${CRON_SECRET}`) emails users whose RDV is exactly 3 days out, via Nodemailer SMTP. `lib/cron-dev.ts` uses `node-cron` to hit that endpoint daily at 18:00 in dev.

**Frontend**: `app/dashboard/<domain>/{page,layout}.tsx` with `create` and `update/[id]` subroutes. Reusable pieces in `components/` (domain folders + shared wrappers like `FormWrapper`, `ModalWrapper`, `PageWrapper`, `SubmitButton`). CSV import/export is a cross-cutting feature (`*ImportForm.tsx`, `ExportData.tsx`); CSV parsing helpers are in `utils/utils.ts`. Charts use Recharts. Styling is Tailwind CSS v4 (`@tailwindcss/postcss`, no `tailwind.config` — configured via CSS).

**Path alias**: `@/*` maps to the repo root (`tsconfig.json`), e.g. `@/lib/prisma`, `@/actions/...`, `@/types/...`.

## Conventions

- Shared types/interfaces live in `types/` — `PrevState`, `LoginPrevState`, `UpdatePrevState` for action state; `types/interfaces/I<Domain>.ts` for domain shapes.
- `Decimal` columns (running kilometers/calories, bank balance/income/expense) come back as Prisma `Decimal` — convert before arithmetic in JS.
- User-facing strings, comments, and thrown error messages are in French; keep new ones consistent.
