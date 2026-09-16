import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

function ApplicationForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [opportunity, setOpportunity] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [resumeLink, setResumeLink] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [loadingOpportunity, setLoadingOpportunity] = useState(true)

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoadingOpportunity(true)
        const response = await fetch(`${API_BASE_URL}/api/opportunities/${id}`)

        if (!response.ok) {
          throw new Error('Opportunity not found.')
        }

        const data = await response.json()
        setOpportunity(data)
      } catch (fetchError) {
        console.error('Error loading opportunity for application form:', fetchError)
        setError(fetchError.message || 'Unable to load opportunity.')
      } finally {
        setLoadingOpportunity(false)
      }
    }

    fetchOpportunity()
  }, [id])

  const validateForm = () => {
    if (!studentName.trim()) {
      return 'Student Name is required.'
    }

    if (!email.trim()) {
      return 'Email is required.'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email.trim())) {
      return 'Please enter a valid email address.'
    }

    if (!phone.trim()) {
      return 'Phone number is required.'
    }

    if (!resumeLink.trim()) {
      return 'Resume / Portfolio link is required.'
    }

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    if (!opportunity) {
      setError('Opportunity data is unavailable. Please try again.')
      return
    }

    try {
      setSubmitting(true)
      setError('')

      const payload = {
        studentName: studentName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        resumeLink: resumeLink.trim(),
        opportunityId: opportunity._id,
      }

      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit application.')
      }

      navigate('/application-confirmation', {
        state: {
          studentName: data.studentName,
          opportunityTitle: opportunity.title,
          companyName: opportunity.company,
          appliedDate: data.appliedDate,
        },
      })
    } catch (submitError) {
      console.error('Application submit error:', submitError)
      setError(submitError.message || 'Unable to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingOpportunity) {
    return (
      <main className="page-shell">
        <div className="page-container">
          <div className="loading-state">Loading application form...</div>
        </div>
      </main>
    )
  }

  if (!opportunity) {
    return (
      <main className="page-shell">
        <div className="page-container">
          <div className="error-state" role="alert">
            {error || 'Opportunity not found.'}
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
            <Link to={`/opportunities/${opportunity._id}`} className="secondary-link">
              ← Back to Opportunity
            </Link>
          </div>

          <article className="form-card">
          <div className="form-header">
            <p className="eyebrow">Application Form</p>
            <h1>Apply for {opportunity.title}</h1>
            <p className="company-name">{opportunity.company}</p>
          </div>

          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="studentName">Student Name</label>
              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resumeLink">Resume / Portfolio Link</label>
              <input
                id="resumeLink"
                type="url"
                value={resumeLink}
                onChange={(event) => setResumeLink(event.target.value)}
                placeholder="https://your-portfolio.com"
              />
            </div>

            {error && (
              <div className="error-state" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </article>
        </div>
      </main>
    </>
  )
}

export default ApplicationForm
