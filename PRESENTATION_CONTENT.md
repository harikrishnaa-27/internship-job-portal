# Internship & Job Listing Portal Presentation

## Slide 1 - Project Title

**Internship & Job Listing Portal**

React, Express, MongoDB Atlas, JWT, Vercel, and Render.

## Slide 2 - Problem Statement

Students need a focused place to discover internships and entry-level opportunities. Administrators need a simple workflow to maintain listings and review applications.

## Slide 3 - Objectives

- Make opportunity discovery quick and searchable.
- Collect structured student applications.
- Protect administrator operations.
- Demonstrate a complete deployed full-stack workflow.

## Slide 4 - Key Features

- Opportunity cards and detail pages.
- Search by title, company, domain, or location.
- Domain filtering and reset.
- Application form with validation and confirmation.
- Admin opportunity CRUD.
- Admin application review.

## Slide 5 - Technology Stack

- React and React Router
- Vite
- Node.js and Express
- MongoDB Atlas and Mongoose
- JWT authentication
- Vercel and Render

## Slide 6 - System Architecture

The browser loads the React SPA from Vercel. The SPA calls the Express REST API on Render. The API uses Mongoose to read and write MongoDB Atlas, while JWT protects admin routes.

## Slide 7 - User Flow

Browse -> Search or filter -> View details -> Apply -> Submit -> Confirmation.

## Slide 8 - Admin Flow

Login -> Dashboard -> Create, edit, or delete opportunities -> Review applications -> Logout.

## Slide 9 - Database and API

Opportunity documents store listing details. Application documents store student details and a reference to the selected opportunity. REST endpoints cover public reads, public submissions, authentication, protected CRUD, and protected application review.

## Slide 10 - Authentication

The backend validates configured admin credentials and issues a JWT. The frontend sends the token as a Bearer authorization header. Missing and invalid tokens are rejected by protected endpoints.

## Slide 11 - Deployment

- Frontend: https://internship-job-portal-green.vercel.app/
- Backend: https://internship-job-portal-backend-o39r.onrender.com/
- Database: MongoDB Atlas
- Vercel SPA fallback: `client/vercel.json`

## Slide 12 - Testing

- Five production opportunities verified.
- Public search, filter, details, application, and confirmation tested.
- Admin authentication and protected API boundaries tested.
- CRUD lifecycle tested with temporary QA data cleaned up.
- CORS and production build verified.
- Responsive views checked at desktop, tablet, and mobile sizes.

## Slide 13 - Screenshots and Demo

Show the home page, search and filter state, detail page, application confirmation, admin dashboard, applications table, and deployed hosting dashboards without exposing secrets.

## Slide 14 - Future Enhancements

Automated test coverage, application moderation, pagination, export, and multi-admin roles are possible future improvements.

## Slide 15 - Conclusion

The project delivers a focused, deployed internship portal with a complete public workflow, protected administration, persistent data, and documented operational boundaries.

## 3-5 Minute Demo Sequence

1. Open the live frontend and point out the five listings.
2. Search for `Cloud` and show the single matching card.
3. Reset and select the `Data Science` domain.
4. Open an opportunity and show its details and application link.
5. Complete the application flow and show confirmation.
6. Open admin login and authenticate with credentials privately.
7. Show the dashboard and applications page.
8. Demonstrate add, edit, and delete using a temporary QA listing if a live CRUD demonstration is required.
9. Close with the architecture, deployment URLs, and testing summary.
