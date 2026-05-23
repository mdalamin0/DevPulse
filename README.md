# 🚀 DevPulse Issue Tracker API

**Live URL:** https://dev-pulse-six-mu.vercel.app

A RESTful Issue Tracking System built with Node.js, Express, and PostgreSQL with role-based access control for managing bugs and feature requests.

---

## Features

- JWT-based authentication
- Role-based access control (`contributor`, `maintainer`)
- Create, update, delete issues
- Issue details include reporter info
- Secure password hashing using bcryptjs
- Modular Express architecture
- Clean REST API design

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (Authentication)
- bcryptjs (Security)

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/mdalamin0/DevPulse
cd devpulse
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run Project

```bash
npm run dev
```

---

## Database Schema

### users table

- id (serial)
- name (text)
- email (unique)
- password (text)
- role (contributor | maintainer)
- created_at (timestamp)
- updated_at (timestamp)

---

### issues table

- id (serial)
- title (varchar 150)
- description (text)
- type (bug | feature_request)
- status (open | in_progress | resolved)
- reporter_id (integer)
- created_at (timestamp)
- updated_at (timestamp)

---

## API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

---

### Issues

```http
POST /api/issues
GET /api/issues
GET /api/issues/:id
PATCH /api/issues/:id
DELETE /api/issues/:id
```

---

## Authentication Flow

- Login returns JWT token
- Token payload includes:
  - id
  - name
  - role

### Authorization Header

```http
Authorization: Bearer <JWT_TOKEN>
```
