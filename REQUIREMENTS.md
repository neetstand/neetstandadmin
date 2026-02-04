# Admin Panel Requirements

## 1. System Configuration
- **Port**: The admin panel must run on port `4000`.

## 2. Role-Based Access Control (RBAC) Architecture
The system follows a hierarchy similar to Django Admin, with specific roles and granular permissions.

### Roles Hierarchy
1.  **Owner**:
    -   Top-level authority.
    -   Details are pre-seeded in the system.
    -   One-time responsibility: Set up the initial Superadmin (can be themselves).
2.  **Superadmin**:
    -   Assigned by the Owner.
    -   Has **all access**.
    -   Responsible for setting up teams, departments, and viewing high-level reports.
3.  **Functional Manager**:
    -   Can see multiple views/departments.
    -   Can generate reports for their level.
    -   Can assign access to members within their scope.
    -   **Constraint**: Can revoke access but **cannot delete** users.
4.  **Manager**:
    -   Standard managerial access (scope to be defined).

### Permission Structure
Permissions are granular and can be defined at two levels:
1.  **Page/Resource Access**: Ability to access a specific page or module (e.g., "User Management", "Finance Reports").
2.  **Action Access (CRUD)**:
    -   **Read**: View data.
    -   **Write**: Create new entries.
    -   **Update**: Modify existing entries.
    -   **Delete**: Remove entries (Restricted for some roles).

## 3. Initialization Flow
- **First Run**:
    -   System checks if Owner is set up (should be pre-seeded).
    -   Owner logs in.
    -   If no Superadmin exists, Owner is prompted to set up the Superadmin.
    -   Owner provides details + "I am the Superadmin" checkbox option.

## 4. UI/UX Requirements
- **Dynamic Side Drawer**:
    -   The sideb menu must render items dynamically based on the logged-in user's role and permissions.
    -   If a user doesn't have access to a module, it should not appear in the drawer.

## 5. Technical Stack (Implied)
-   Framework: Next.js (apps/admin)
-   Database: Supabase (Postgres)
-   Styling: Tailwind CSS / Shadcn UI (consistent with web app)
