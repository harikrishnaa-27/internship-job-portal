import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

function OpportunityDetails() {
  const { id } = useParams()
  const [opportunity, setOpportunity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_BASE_URL}/api/opportunities/${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Opportunity not found.')
          }

          throw new Error('Unable to load opportunity.')
        }

        const data = await response.json()
        setOpportunity(data)
      } catch (fetchError) {
        console.error('Failed to load opportunity details:', fetchError)
        setError(fetchError.message || 'Unable to load opportunity.')
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunity()
  }, [id])

  if (loading) {
    return (
      <main className="page-shell">
        <div className="page-container">
          <div className="loading-state">Loading opportunity...</div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page-shell">
        <div className="page-container">
          <div className="error-state" role="alert">
            {error}
          </div>
          <div className="page-actions">
            <Link to="/" className="secondary-link">
              Back to Opportunities
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (!opportunity) {
    return (
      <main className="page-shell">
        <div className="page-container">
          <div className="no-results" role="status">
            Opportunity not found.
          </div>
          <div className="page-actions">
            <Link to="/" className="secondary-link">
              Back to Opportunities
            </Link>
          </div>
        </div>
      </main>
    )
  }

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
          <div className="page-actions">
            <Link to="/" className="secondary-link">
              ← Back to Opportunities
            </Link>
          </div>

          <article className="detail-card">
          <div className="detail-header">
            <span className="domain-badge">{opportunity.domain}</span>
          </div>

          <h1>{opportunity.title}</h1>

          <p className="company-name detail-company">{opportunity.company}</p>

          <div className="detail-grid">
            <div>
              <strong>Location:</strong> {opportunity.location}
            </div>
            <div>
              <strong>Experience:</strong> {opportunity.experience}
            </div>
          </div>

          <div className="detail-description-section">
            <h2>About this opportunity</h2>
            <p>{opportunity.description}</p>
          </div>

          {opportunity.applicationLink && (
            <div className="detail-link-block">
              <a href={opportunity.applicationLink} target="_blank" rel="noreferrer">
                Original Posting
              </a>
            </div>
          )}

          <div className="detail-actions">
            <Link to={`/opportunities/${opportunity._id}/apply`} className="details-button">
              Apply Now
            </Link>
          </div>
        </article>
        </div>
      </main>
    </>
  )
}

export default OpportunityDetails
