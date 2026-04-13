# Login Page

A full-stack authentication system built using the **MERN stack** with secure login, signup, email verification, and password reset functionality.


## ✨ Features

* 🔐 User Signup & Login (JWT-based authentication)
* 📧 Email Verification (via Mailtrap)
* 🔑 Forgot & Reset Password
* 🍪 Secure Cookie-based Authentication
* 🛡️ Protected Routes (Frontend + Backend)
* ⚡ Concurrent frontend & backend execution
* 🎨 Modern UI with animations (Framer Motion)


## 🛠️ Tech Stack

**Frontend**

* React
* React Router
* Zustand (State Management)
* Tailwind CSS
* Framer Motion

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Mailtrap (Email service)


## 📂 Project Structure

```
LoginPage/
│
├── client/        # React frontend
├── server/        # Express backend
├── package.json   # Root scripts (concurrently)
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ishita-09-sahoo/LoginPage.git
cd LoginPage
```


### 2️⃣ Install dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```


### 3️⃣ Environment Variables

Create a `.env` file inside the **root** directory:

```env
CLIENT_URL=http://localhost:5173
MAILTRAP_TOKEN=your_mailtrap_token
NODE_ENV=development
JWT_SECRET=your_super_secret_key
PORT=5000
MONGO_URL=your_mongodb_connection_string
```


## 🧠 MongoDB Setup

1. Go to MongoDB Atlas
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or allow all for dev: `0.0.0.0/0`)
5. Copy the connection string

Example:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
```


## 📧 Mailtrap Setup (for Emails)

1. Go to Mailtrap
2. Create an account
3. Navigate to **Email Testing → Inboxes**
4. Copy your **API Token**

Add it to `.env`:

```env
MAILTRAP_TOKEN=your_token_here
```

👉 This is used for:

* Email verification
* Password reset emails

---

## ▶️ Running the App

From root folder:

```bash
npm run dev
```

This uses **concurrently** to run:

* Frontend → `http://localhost:5173`
* Backend → `http://localhost:5000`


## 🔐 Authentication Flow

1. User signs up
2. Verification email is sent
3. User verifies account
4. Login enabled only after verification
5. JWT stored in HTTP-only cookies


## 🧪 API Endpoints

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/verify-email
GET    /api/auth/check-auth
POST   /api/auth/forgot-password
POST   /api/auth/reset-password/:token
```

---
