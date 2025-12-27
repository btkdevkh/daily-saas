# Daily SaaS

Un SaaS de gestionnnaire d'utilités.

## Features (Existantes)

- Gestionnaire des comptes d'utilisateur (Admin)
- Gestionnaire des rendez-vous
- Gestionnaire des mots de passe
- Gestionnaire des course à pied
- Gestionnaire des budgets
- Chat I.A d'OpenAI

## Features (Récemment ajoutées)

- Une horloge local
- L'import des données depuis CSV
- L'export des données vers CSV
- La barre de recherche des données
- L'envoie d'e-mail automatique du rappel de RDV dans 3 jours
- La gestion de dépense et revenu

![Daily SaaS Login](https://github.com/btkdevkh/daily-saas/blob/main/public/login_v6_code.png?raw=true)
![Daily SaaS Users](https://github.com/btkdevkh/daily-saas/blob/main/public/users_v12.png?raw=true)
![Daily SaaS Rapel Rdv](https://github.com/btkdevkh/daily-saas/blob/main/public/notif_rdv.png?raw=true)
![Daily SaaS Running](https://github.com/btkdevkh/daily-saas/blob/main/public/running_v7.png?raw=true)
![Daily SaaS Balance](https://github.com/btkdevkh/daily-saas/blob/main/public/balance_v1.png?raw=true)
![Daily SaaS Chat AI](https://github.com/btkdevkh/daily-saas/blob/main/public/chatai_v10.png?raw=true)

## Technologies utilisées

- Next.js
- TypeScript
- NextAuth
- TailwindCSS
- Prisma ORM (PostgreSQL, SQLite)

## Structure du projet

- `/app` - Pages et layout de l'application
- `/components` - Composants réutilisables
- `/data` - Données mockées
- `/types` - Types et interfaces TypeScript
- `/etc...`

## Installation

Créer un fichier `.env` avec les variables ci-dessous

```bash
POSTGRES_USER="postgres_user"
POSTGRES_PASSWORD="postgres_password"
POSTGRES_DB="postgres_db"
DATABASE_URL="url_bdd"
NEXTAUTH_URL="url_origin"
AUTH_SECRET="auth_secret"
NEXT_PUBLIC_MASTER_KEY="master_key"
NEXT_PUBLIC_SMTP_USER="smtp_user"
NEXT_PUBLIC_SMTP_PASS="smtp_pass"
NEXT_PUBLIC_SMTP_HOST="smtp_host"
NEXT_PUBLIC_SMTP_PORT="smtp_port"
NEXT_PUBLIC_APP_URL="url_origin"
NEXT_PUBLIC_CHAT_AI_API_URL="https://votre_domaine.com/api/chat"
CRON_SECRET="cron_secret"
APP_URL="url_origin"
```

Le `NEXT_PUBLIC_MASTER_KEY` peut être générer avec cette commande sous Linux: `openssl rand -hex 16`

### Local mode

Dans le terminal, tapez

```bash
npm install
```

Migrer, Générer PrismaClient & Seeder le fake data

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

### Démarrage en développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

### Docker mode

Aussurez-vous d'avoir Docker installé.

Lancer cette commande en développement :

```bash
sudo docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Lancer cette commande pour le build en production :

```bash
sudo docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

L'application sera accessible sur http://localhost:3000
