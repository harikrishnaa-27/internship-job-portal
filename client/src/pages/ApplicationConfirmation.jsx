import { Link, useLocation } from 'react-router-dom'

function ApplicationConfirmation() {
  const location = useLocation()
  const { studentName, opportunityTitle, companyName, appliedDate } = location.state || {}

  return (
    <>
      <header className="site-header">
        <div className="page-container site-header-inner">
          <Link to="/" className="brand-mark">
            Internship Portal
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <Link to="/">Opportunities</Link>
            <Link to="/admin/login">Admin Login</Link>
          </nav>
        </div>
      </header>

      <main className="page-shell">
        <div className="page-container">
          <article className="confirmation-card success-card">
            <p className="eyebrow">Application Submitted</p>
            <h1>Application Submitted Successfully!</h1>
            <p className="subtitle confirmation-message">
              Your application has been recorded. The recruiter or hiring team will review it soon.
            </p>

            <div className="confirmation-details">
              <p>
                <strong>Student Name:</strong> {studentName || 'N/A'}
              </p>
              <p>
                <strong>Opportunity:</strong> {opportunityTitle || 'N/A'}
              </p>
              <p>
                <strong>Company:</strong> {companyName || 'N/A'}
              </p>
              <p>
                <strong>Status:</strong> Submitted
              </p>
              <p>
                <strong>Applied Date:</strong> {appliedDate ? new Date(appliedDate).toLocaleString() : 'N/A'}
              </p>
            </div>

            <div className="page-actions">
              <Link to="/" className="details-button">
                Back to Opportunities
              </Link>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}

export default ApplicationConfirmation
