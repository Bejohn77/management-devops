# Simple Management System

A small management system with two roles: `admin` and `user`.

## Features
- React frontend with clean UI
- Node.js + Express backend
- MongoDB user storage
- JWT auth with role-based pages
- User signup and login
- Admin dashboard and user dashboard

## Setup

1. Install dependencies:
   - `cd backend && npm install`
   - `cd ../frontend && npm install`
2. Create a `.env` file in `backend/` using `backend/.env.example`
3. Start backend:
   - `cd backend && npm run dev`
4. Start frontend:
   - `cd frontend && npm run dev`

## Seed accounts
The backend creates default accounts on first run if they do not exist:

- Admin: `admin@management.com` / `Admin123!`
- User: `user@management.com` / `User123!`
