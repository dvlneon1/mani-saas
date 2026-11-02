# Projeto Mani - Supabase Schema

Database schema, migrations, RLS policies, and TypeScript types for the Nail Designers SaaS.

## Structure

```
packages/supabase-schema/
├── migrations/
│   └── 001_initial_schema.sql    # Core schema, enums, tables, indexes, RLS
├── seeds/
│   └── seed_initial_data.sql     # Default folders, anamnese templates, triggers
├── src/
│   ├── types/
│   │   └── database.types.ts     # TypeScript types (manual or generated)
│   └── index.ts
├── rls-policies.sql              # RLS documentation (reference)
├── package.json
└── README.md
```

## Tables

| Table | Description |
|-------|-------------|
| `professionals` | Tenants (nail designers/studios) |
| `members` | Team members (multi-user support) |
| `clients` | Customers of professionals |
| `services` | Service catalog |
| `appointments` | Bookings/sessions |
| `appointment_photos` | Before/after photos |
| `supplies` | Inventory/products |
| `transactions` | Financial records |
| `feed_folders` | Organization for saved content |
| `feed_posts` | Instagram/Pinterest inspiration |
| `anamnese_templates` | Client intake form templates |
| `notifications` | User notifications |

## Enums

- `appointment_status`: scheduled, confirmed, in_progress, completed, cancelled, no_show
- `payment_status`: pending, partial, paid, refunded
- `location_type`: studio, home_visit, online
- `feed_source`: instagram, pinterest, manual
- `member_role`: owner, manager, professional
- `plan_type`: free, starter, pro, enterprise

## Applying Migrations

### Option 1: Supabase CLI (Recommended)

```bash
# Install CLI if needed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Push migrations
supabase db push

# Or reset local development
supabase db reset
```

### Option 2: Supabase Dashboard

1. Open your project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Create new query
4. Paste contents of `migrations/001_initial_schema.sql`
5. Execute
6. Repeat for `seeds/seed_initial_data.sql`

### Option 3: Direct PostgreSQL

```bash
psql -h <host> -U <user> -d <database> -f migrations/001_initial_schema.sql
psql -h <host> -U <user> -d <database> -f seeds/seed_initial_data.sql
```

## Generating TypeScript Types

### With Supabase CLI

```bash
# From local development
supabase gen types typescript --local > src/types/database.types.ts

# From remote project
supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
```

### Manual

Types in `src/types/database.types.ts` are maintained manually based on schema. Update when schema changes.

## Row Level Security (RLS)

### Overview

All tenant-scoped tables have RLS enabled. Policies use `auth.professional_id()` to isolate data per tenant.

### JWT Claims Required

Supabase Auth must include `professional_id` in JWT claims:

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "professional_id": "professional-uuid",
  "role": "authenticated"
}
```

Configure in: **Authentication > Providers > JWT Claims**

### Policy Pattern

```sql
-- Example: clients table
CREATE POLICY "clients_select" ON clients
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "clients_insert" ON clients
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "clients_update" ON clients
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "clients_delete" ON clients
  FOR DELETE USING (professional_id = auth.professional_id());
```

### Testing RLS

```sql
BEGIN;
SET LOCAL request.jwt.claims = '{"professional_id": "<uuid>"}';
SELECT * FROM clients;  -- Only rows for that professional
ROLLBACK;
```

### Service Role Bypass

Service role key bypasses RLS for:
- Stripe webhooks
- Background jobs
- Admin operations

**Never expose service role key to client.**

## Development

### Local Supabase

```bash
# Start local Supabase stack
supabase start

# Stop
supabase stop

# View status
supabase status
```

### Reset Database

```bash
# Drops all data and re-applies migrations
supabase db reset
```

### Create New Migration

```bash
supabase migration new <name>
```

## Notes

1. **Updated at triggers**: All tables with `updated_at` have auto-update triggers
2. **Default folders**: 4 folders auto-created for new professionals via trigger
3. **Default anamnese**: Standard template auto-created for new professionals
4. **Transactions immutable**: No UPDATE policy - maintains audit trail
5. **Notifications system-managed**: No INSERT policy from client

## Troubleshooting

### RLS blocking queries

- Verify JWT contains `professional_id` claim
- Check policy exists for operation type
- Test with `SET LOCAL request.jwt.claims`

### Migration conflicts

```bash
supabase db diff  # View differences
supabase db push  # Apply changes
```

### Type generation issues

- Ensure migrations applied to linked project
- Use `--local` if types missing from remote
