# Submission Screenshot Checklist

Capture only safe UI and public deployment evidence. Never include passwords, JWTs, MongoDB connection strings, private environment variables, or API tokens.

- [ ] 1. Home page showing the five production opportunity cards.
- [ ] 2. Search and domain filter showing a narrowed result.
- [ ] 3. Opportunity details page with title, company, description, and Apply Now.
- [ ] 4. Application form with labels and validation state, without personal secrets.
- [ ] 5. Application confirmation page using a QA-safe test identity if needed.
- [ ] 6. Admin login page with empty or masked fields only.
- [ ] 7. Admin dashboard showing opportunity management controls.
- [ ] 8. Add or edit opportunity form with non-sensitive QA data.
- [ ] 9. Applications page with appropriate redaction of personal information.
- [ ] 10. MongoDB Atlas collection view with credentials and connection details hidden.
- [ ] 11. GitHub repository page showing project files and README.
- [ ] 12. Render service overview or healthy deployment status with environment values hidden.
- [ ] 13. Vercel deployment overview and live frontend URL with environment values hidden.
- [ ] 14. Mobile and tablet responsive views showing readable cards, filters, and navigation.

## Capture Notes

- Prefer browser screenshots at 1280x900, 768x900, and 390x844.
- Redact student email, phone, and resume links in admin screenshots.
- Use the live URLs documented in `README.md`.
- The browser smoke tests are complete; the checklist items above are presentation captures to collect manually.
