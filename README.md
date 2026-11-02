# Nail Designers App - Mani CRM

SaaS platform for nail designers. Monorepo with Turborepo.

## Structure

```
nail-designers-app/
├── apps/
│   ├── mobile/          # Expo SDK 51+ (React Native)
│   └── admin-web/       # Next.js 14
├── packages/
│   ├── design-system/   # Tokens, Tailwind config
│   ├── supabase-schema/ # Migrations, types
│   └── shared/          # Zod schemas, types, utils
└── turbo.json
```

## Setup

```bash
npm install
npm run build
```

## Scripts

- `npm run dev` - Start all apps in dev mode
- `npm run build` - Build all packages and apps
- `npm run lint` - Lint all code
- `npm run typecheck` - Type check all code
