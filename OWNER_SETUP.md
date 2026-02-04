# Owner Account Setup

## Prerequisites
- Supabase Project running.
- `apps/admin` configured with `.env.local` containing `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `DATABASE_URL`.
- Database seeded with roles (`npm run db:migrate:security` & seed script).

## Steps

### 1. Create User
Create a user account for the Owner.
- **Option A**: Sign up via the application UI if registration is open.
- **Option B**: Create a user manually in the Supabase Dashboard > Authentication > Users > Add User.

### 2. Promote to Owner
Run the promotion script from the `apps/admin` directory:

```bash
npm run promote:owner <owner-email>
```

Example:
```bash
npm run promote:owner ajay@neetstand.com
```

## Troubleshooting
- **User not found**: Ensure the email matches exactly (case-sensitive often).
- **Profile missing**: The script will attempt to auto-create a profile if the registration trigger failed.
- **Missing Roles**: Ensure you ran the seed script to populate roles: `npx tsx src/scripts/seed.ts`.
