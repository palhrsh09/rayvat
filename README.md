# Rayvat Backend Setup

A Node.js + Express backend boilerplate with built-in authentication, role-based access control (RBAC), and user initialization on server startup.

---

### Getting Started

#### 1. Clone the repository
```bash
git clone https://github.com/palhrsh09/rayvat.git
cd rayvat
npm install
npm run start
```

---

### Features

- JWT-based authentication
- Role-based access control (RBAC)
- Default user & admin creation on first run
- Cookie-based token handling
- Modular folder structure

---

### Authentication

#### User Registration (Optional)
You can create a user manually using the following API:

**POST** `/api/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword",
  "role": "admin" 
}
```

*If role is not provided, it will default to "user".*

#### User Login
**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

---

### Role-Based Access Control (RBAC)

The app supports basic RBAC:

- **Users** can only view (GET) data
- **Admins** can perform full CRUD operations based on routes and roles
