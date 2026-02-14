
# Admin Setup & Deployment Guide

## 1. Prerequisites
- **Node.js** (v18+)
- **Supabase Project** (with Database URL and Anon Key)
- **Brevo Account** (for Transactional Emails)

## 2. Environment Variables
Ensure `.env.local` is configured in `apps/admin`:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY] # Optional, but recommended for admin scripts
ADMIN_URL=http://localhost:4000
WEB_URL=http://localhost:3000
ADMIN_API_KEY=[SECURE_RANDOM_STRING] # Used for secure communication with Web App
```

## 3. Database Setup

### Fresh Start (Reset & Seed)
To completely reset the database and seed initial roles:
```bash
npm run db:fresh
```
*Warning: This deletes all users and profiles.*

### Install Extensions
The system requires `pg_net` for sending emails via Supabase Edge Functions/Database Webhooks.
```bash
npx tsx scripts/migrate-function.ts
```
*This script installs `pg_net`, creates the `net` schema, and applies the `send_email` function.*

## 4. Owner Setup

1.  **Navigate to Setup**: Go to `http://localhost:4000/setup`.
2.  **Create Owner Account**: Sign up with your email and password.
3.  **Email Configuration**:
    - You will be prompted to configure email settings.
    - **API Key**: Required. Get this from your [Brevo Dashboard](https://app.brevo.com/settings/keys/api).
    - **Sender Email**: Optional but recommended (e.g., `no-reply@yourdomain.com`).
    - **Sender Name**: Optional (defaults to `NEET Stand`).
4.  **Verification**: Click **"Save & Send Test Email"**.
5.  **Confirmation**: Click **"Yes, I received the email"** to verify and proceed.

## 5. Super Admin Setup

Once the Owner is set up and email is verified:
1.  **Invite Super Admin**: The Owner acts as the first admin to invite the Super Admin.
2.  **Accept Invite**: The Super Admin clicks the link in their email to set their password.
3.  **Authentication Switch**:
    - Once a Super Admin exists, the system switches to **OTP-only login** for security.
    - Password login is disabled for Owners and Admins.

## 6. Maintenance Mode
- Can be toggled by Owner or Super Admin from the Dashboard (`/dashboard/maintenance`).
- Requires `WEB_URL` and `ADMIN_API_KEY` to be set to properly clear the Web App's cache.
