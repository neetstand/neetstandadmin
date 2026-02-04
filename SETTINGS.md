# Settings Documentation

The `settings` table stores global configuration variables for the application.
Direct access to this table is restricted to **Owner** and **Superadmin** roles only.

## Table Structure

| Column        | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| `variable`    | `varchar` | Primary Key. The name of the setting key.  |
| `value`       | `boolean` | The boolean value of the setting.          |
| `description` | `text`    | Optional description for admin UI/docs.    |
| `updated_at`  | `date`    | Timestamp of last update.                  |

## Available Settings

### `maintenance_mode`

- **Type**: `boolean`
- **Default**: `false` (if record is missing)
- **Description**: Toggles the global maintenance mode for the public website.
- **Effect**:
    - `true`: The website (`apps/web`) will block all access and show a "Under Maintenance" full-screen message.
    - `false` (or missing): The website operates normally.
- **Public Access**:
    - Regular users cannot query the table directly.
    - The website uses the secure function result `is_maintenance_mode()` to check this status.

## access Control

- **Read/Write**: Owner, Superadmin via RLS policies.
- **Public Read (Specific Function)**: `is_maintenance_mode()` function allows public/anon access to read *only* the `maintenance_mode` status.
