# Interior Designer Website (Full Stack)

A luxury Interior Architecture & Design Studio web application featuring a modern React frontend and a robust Node.js + Express + MySQL REST API backend with JWT authentication, role-based authorization, Zod validation, and Multer file upload capabilities.

---

## Technology Stack

- **Frontend**: React.js, TailwindCSS, Framer Motion, Axios, React Router v7, React Icons
- **Backend**: Node.js, Express.js, REST API, JWT Authentication, bcryptjs, Multer, CORS, dotenv, Zod Validation
- **Database**: MySQL (XAMPP / phpMyAdmin)

---

## Local Development & Setup Instructions

### 1. Database Setup (XAMPP MySQL)
1. Launch **XAMPP Control Panel**.
2. Start the **Apache** and **MySQL** services.
3. Open **phpMyAdmin** (`http://localhost/phpmyadmin`).
4. Create a new database named:
   ```sql
   interior_designer_db
   ```
5. Import the database schema from:
   ```bash
   database/schema.sql
   ```

---

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment settings:
   ```bash
   cp .env.example .env
   ```
4. Verify your `.env` configuration:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=interior_designer_db
   JWT_SECRET=your_secret_key
   FRONTEND_URL=http://localhost:5173
   ```
5. Seed the database with initial Admin user (`admin@example.com` / `Admin@123`) & sample data:
   ```bash
   npm run seed
   ```
6. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend REST API will run at `http://localhost:5000`. Test health status at `http://localhost:5000/api/health`.

---

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## Default Admin Credentials

- **Email**: `admin@example.com`
- **Password**: `Admin@123`
- **Role**: `admin`

---

## API Endpoints Overview

- `GET /api/health` - API Status Check
- `POST /api/auth/register` - Register User
- `POST /api/auth/login` - Login User / Admin
- `GET /api/auth/profile` - User Profile
- `GET /api/services` - Get Services
- `POST /api/services` - Create Service (Admin)
- `GET /api/projects` - Get Projects (Filterable by category)
- `POST /api/projects` - Create Project (Admin)
- `POST /api/projects/:id/images` - Upload Project Images (Admin)
- `GET /api/testimonials` - Get Testimonials (Approved only for public)
- `POST /api/inquiries` - Submit Client Inquiry
- `GET /api/inquiries` - List Inquiries (Admin)
- `GET /api/settings` - Website Settings
- `PUT /api/settings` - Update Settings (Admin)
