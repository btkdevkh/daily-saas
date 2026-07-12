# Coding Standards Checklist — Daily SaaS

Derived from `CLAUDE.md`. Next.js 16 App Router · PostgreSQL/Prisma · Tailwind v4 · Recharts · no test framework.

## General
- [ ] All user-facing strings, comments, and thrown errors are in **French**.
- [ ] Use the `@/*` path alias (maps to repo root): `@/lib/prisma`, `@/actions/...`, `@/types/...`.
- [ ] Convert Prisma `Decimal` columns (running km/calories, bank balance/income/expense) before doing JS arithmetic.
- [ ] Run `npx prisma generate` after any schema edit.

## Server Actions (the API layer)
- [ ] Put it in `actions/{get,post,update,delete}/<domain>.ts` (domains: bank, chatai, password, rdv, running, user).
- [ ] Call `getConnectedUser()` **first**; throw `"Identification inconnu"` if absent.
- [ ] Scope every query by `userId: user.id`.
- [ ] **Mutations** (`post`/`update`): signature `(prevState, formData)`, read via `formData.get(...)`, return `{ ...prevState, success, message }`, and call `revalidatePath("/")` after writing.
- [ ] **Reads**: return `{ success, message, <domain> }` or `{ error }` on failure.
- [ ] Use the standard three-branch `try/catch`: `SyntaxError` → `"message" in err` → `"Internal server error"`.

## Auth & Routing
- [ ] Route protection goes in `proxy.ts` at repo root (exports `proxy` + `config.matcher`).
- [ ] NextAuth v4 JWT strategy; thread `role`/`image` through jwt/session callbacks (typed in `types/next-auth.d.ts`).

## Encryption (don't mix them up)
- [ ] Vault passwords → **AES-256-GCM** (recoverable), key `sha256(NEXT_PUBLIC_MASTER_KEY)`, via `encrypt`/`decrypt` in `actions/post/password.ts`.
- [ ] User account passwords → **bcrypt** (hashed).

## Frontend
- [ ] Pages under `app/dashboard/<domain>/{page,layout}.tsx` with `create` and `update/[id]` subroutes.
- [ ] Reuse shared wrappers: `FormWrapper`, `ModalWrapper`, `PageWrapper`, `SubmitButton`.
- [ ] CSV logic uses `*ImportForm.tsx` / `ExportData.tsx`; parsing helpers in `utils/utils.ts`.
- [ ] Shared types in `types/`: `PrevState`, `LoginPrevState`, `UpdatePrevState`, and `types/interfaces/I<Domain>.ts`.

## Commands
- [ ] `npm run lint` before committing.
- [ ] Toggling DB engine = edit both `lib/prisma.ts` **and** the `datasource` provider in `prisma/schema.prisma`.
