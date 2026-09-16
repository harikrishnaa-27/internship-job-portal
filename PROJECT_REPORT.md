# Internship & Job Listing Portal

## Introduction

The Internship & Job Listing Portal is a full-stack web application for publishing internship and entry-level job opportunities, accepting student applications, and managing listings and applications through an authenticated administrator area.

## Problem Statement

Students need a single place to discover relevant opportunities and submit applications, while administrators need a small, reliable workflow for maintaining listings and reviewing submissions.

## Objectives

- Present searchable and filterable opportunities.
- Provide detailed opportunity pages and an application form.
- Persist opportunities and applications in MongoDB Atlas.
- Protect administrative workflows with JWT authentication.
- Deploy the frontend and backend as independently hosted services.

## Scope

The implemented scope includes public opportunity browsing, search, domain filtering, opportunity details, application submission, administrator login, opportunity CRUD, and application review. Optional features such as file uploads, OAuth, notifications, and payments are outside the scope.

## Functional Requirements

- Public users can browse, search, filter, and inspect opportunities.
- Public users can submit a validated application with contact and portfolio information.
- Administrators can authenticate, create, edit, and delete opportunities.
- Administrators can review submitted applications with opportunity and company details.
- Protected endpoints reject missing or invalid JWTs.

## Technology Stack

- Frontend: React 19, React Router, Vite
- Backend: Node.js, Express, Mongoose
- Database: MongoDB Atlas
- Authentication: JSON Web Tokens
- Hosting: Vercel frontend and Render backend

## System Architecture

The React SPA calls the Express REST API through `VITE_API_URL`. The API validates requests, enforces JWT protection for administrative operations, and uses Mongoose to persist data in MongoDB Atlas.

```text
Browser -> Vercel React SPA -> Render Express API -> MongoDB Atlas
                                      |
                                      -> JWT-protected admin routes
```

## User Workflow

1. Open the opportunities page.
2. Search by title, company, domain, or location.
3. Filter by domain and optionally combine it with search.
4. Open an opportunity detail page.
5. Complete and submit the application form.
6. View the confirmation page.

## Admin Workflow

1. Open `/admin/login`.
2. Authenticate with configured administrator credentials.
3. View the opportunity dashboard.
4. Add, edit, or delete opportunities.
5. Open the applications page to review submissions.
6. Log out to remove the local JWT token.

## Database Design

### Opportunity

Stores title, company, domain, location, experience, description, application link, and timestamps.

### Application

Stores student name, email, phone, resume or portfolio link, related opportunity reference, applied date, and timestamps. The opportunity reference is populated for administrator review.

## API Design

Public endpoints:

- `GET /`
- `GET /api/opportunities`
- `GET /api/opportunities/:id`
- `POST /api/applications`

JWT-protected endpoints:

- `POST /api/auth/login`
- `POST /api/opportunities`
- `PUT /api/opportunities/:id`
- `DELETE /api/opportunities/:id`
- `GET /api/applications`

## Authentication

The administrator login endpoint validates configured credentials and returns a JWT. The frontend stores the token in browser local storage and sends it as a Bearer token for protected requests. The backend verifies the token before allowing administrative operations.

## Frontend Implementation

The frontend uses React Router for public and protected routes. The opportunities page performs client-side search and domain filtering on API data. Forms provide required-field and browser URL/email validation, and the confirmation page displays the submitted application context.

## Backend Implementation

Express routes delegate to controllers for authentication, opportunity CRUD, and applications. Mongoose models define the Opportunity and Application collections. CORS allows the deployed Vercel origin and the configured client origin.

## Deployment

- Live frontend: https://internship-job-portal-green.vercel.app/
- Live backend: https://internship-job-portal-backend-o39r.onrender.com/
- Vercel root directory: `client`
- Render root directory: `server`
- Frontend production variable: `VITE_API_URL`
- Backend production variables are configured in the hosting provider and are never stored in documentation.
- `client/vercel.json` provides the SPA fallback for direct route navigation.

## Testing

The live deployment was verified for:

- Five production opportunities and valid MongoDB ObjectId values.
- Search, domain filtering, combined filtering, and reset.
- Opportunity details, application form validation, and successful submission.
- Production API authentication, protected endpoint rejection, and public endpoint access.
- Authenticated opportunity create, update, and delete, with the temporary QA opportunity removed.
- Frontend production build with `npm run build`.
- Live Vercel to Render API communication and CORS.

A QA application was submitted with an identifiable test student record to verify persistence. Because the current API has no application-delete operation, the record remains available for administrator review rather than being removed through an unsafe or unrelated mechanism.

## Results

The deployed public flow is functional, the five legitimate production opportunities remain present, and the backend persists application data in MongoDB Atlas. Direct SPA route navigation required the tracked Vercel rewrite configuration and should be rechecked after deployment propagation.

## Limitations

- Applications do not currently have an administrator delete or export workflow.
- Authentication uses a single configured administrator credential set.
- No automated test suite is included; verification is currently build, API, and browser smoke testing.
- Resume and portfolio values are links rather than uploaded files.

## Future Enhancements

- Add automated API and component tests.
- Add application moderation and safe deletion controls.
- Add pagination and richer administrator filtering as the dataset grows.
- Add role-based administration if multiple administrators are required.

## Conclusion

The portal is a deployed, database-backed application with public discovery and application workflows plus protected administration. Its current implementation is suitable for project submission, with the documented limitations kept explicit.
