# Internship & Job Listing Portal

A full-stack internship project built with React, Node.js, Express, and MongoDB for browsing opportunities, applying for roles, and managing the portal through a secure admin login.

## 1. Project Overview

This portal allows students to browse internship and job opportunities, filter and search listings, view details, and submit applications. Administrators can securely log in, manage opportunities, and review student applications from a protected dashboard.

## 2. Features

- Public opportunity listing with search and domain filtering
- Opportunity detail pages with real database data
- Student application form with validation
- Application confirmation page
- Admin login with JWT-based authentication
- Protected admin routes and API endpoints
- Admin opportunity add, edit, and delete actions
- Admin applications listing with populated opportunity data
- Responsive design for desktop, tablet, and mobile layouts

## 3. Technology Stack

- Frontend: React.js + Vite
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT (jsonwebtoken)
- API: REST API

## 4. Public User Flow

Public user flow:

React UI → Express API → MongoDB

- Browse opportunities
- Search and filter results
- View opportunity details
- Submit student application
- Receive confirmation after successful submission

## 5. Admin Flow

Admin flow:

React Login → JWT → Protected Express APIs → MongoDB

- Login at `/admin/login`
- Access admin dashboard
- Add, edit, and delete opportunities
- Review submitted applications
- Logout to remove session token

## 6. Authentication

Authentication verifies who the user is. The admin login API checks the configured credentials against environment variables and issues a JWT if they match.

## 7. Authorization

Authorization verifies what the user is allowed to do. Protected admin endpoints require a valid Bearer token before they can create, update, delete opportunities or view applications.

## 8. Architecture

Public:

React → Express → MongoDB

Admin:

React Login → JWT → Protected Express APIs → MongoDB

Application:

Student → Application Form → POST /api/applications → MongoDB → Admin Applications

## 9. API Endpoints

### Public endpoints
- GET `/` — health check
- GET `/api/opportunities` — fetch all opportunities
- GET `/api/opportunities/:id` — fetch one opportunity
- POST `/api/applications` — create an application

### Admin endpoints
- POST `/api/auth/login` — admin login and JWT issuance
- POST `/api/opportunities` — create an opportunity
- PUT `/api/opportunities/:id` — update an opportunity
- DELETE `/api/opportunities/:id` — delete an opportunity
- GET `/api/applications` — fetch all applications

## 10. MongoDB Collections

The app uses MongoDB collections for:

- `opportunities`
- `applications`

Applications reference related opportunities using `opportunityId`.

## 11. Environment Variables

The backend uses environment variables in `server/.env` locally and in the hosting provider's environment settings in production. Keep `server/.env` private and never commit it:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_long_random_jwt_secret
CLIENT_URL=http://localhost:5173
```

`server/.env.example` and `client/.env.example` contain placeholder values only. The frontend uses `VITE_API_URL` for the backend base URL.

## 12. How to Run

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Production environment variables

Backend:

- `PORT`
- `MONGO_URI`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- `CLIENT_URL`

Frontend:

- `VITE_API_URL`

## 13. Deployment preparation

### Render backend

- Root Directory: `server`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables: `PORT`, `MONGO_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, and `CLIENT_URL`

Set `CLIENT_URL` to the deployed Vercel URL. Render supplies the `PORT` value automatically; keeping `PORT` in the environment is also supported.

### Vercel frontend

- Root Directory: `client`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variable: `VITE_API_URL` set to the deployed Render API URL

The frontend is a Vite single-page application. Enable Vercel's SPA fallback or add a rewrite from all non-file paths to `/index.html` so direct admin and opportunity URLs can refresh correctly.

Deployment is not complete until the Render service and Vercel project have been created and verified with their live URLs.

## 14. Testing

- Verify MongoDB is running locally
- Start the backend on port 5000
- Start the frontend on the Vite dev server
- Test public browsing and application flow
- Test admin login, dashboard, CRUD actions, and application review
- Confirm protected endpoints reject missing or invalid tokens
- Run the frontend production build with `npm run build`

## 15. Day 8 status

Day 8 status: Complete

Implemented:
- admin login API
- JWT issuance and verification
- protected admin routes and APIs
- admin login page
- token storage in localStorage
- redirect to login when no token exists
- admin logout

## 16. Day 9 status

Day 9 status: Complete

Improved:
- navigation and admin layout
- card and table styling
- form spacing and validation feedback
- loading, success, and error states
- responsive behavior and accessibility basics

## 17. Current project status

The portal is prepared for local production-readiness verification. Atlas connectivity, API authentication, CRUD cleanup, and the frontend production build have been verified locally. Live Render and Vercel deployment remain manual steps.
