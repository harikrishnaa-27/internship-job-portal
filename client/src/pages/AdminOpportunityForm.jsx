import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken')

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const emptyForm = {
  title: '',
  company: '',
  domain: '',
  location: '',
  experience: '',
  description: '',
  applicationLink: '',
}

function AdminOpportunityForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState(emptyForm)
  const [loading, setLoading] = useState(isEditMode)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditMode) {
      return
    }

    const fetchOpportunity = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/opportunities/${id}`, {
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Unable to load opportunity data.')
        }

        const data = await response.json()
        setFormData({
          title: data.title || '',
          company: data.company || '',
          domain: data.domain || '',
          location: data.location || '',
          experience: data.experience || '',
          description: data.description || '',
          applicationLink: data.applicationLink || '',
        })
      } catch (fetchError) {
        console.error('Opportunity fetch error:', fetchError)
        setError(fetchError.message || 'Unable to load opportunity data.')
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunity()
  }, [id, isEditMode])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    for (const value of Object.values(formData)) {
      if (!String(value).trim()) {
        return 'Please fill in all required fields.'
      }
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

    try {
      setSubmitting(true)
      setError('')

      const url = isEditMode ? `${API_BASE_URL}/api/opportunities/${id}` : `${API_BASE_URL}/api/opportunities`
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save opportunity.')
      }

      navigate('/admin', {
        state: {
          successMessage: isEditMode ? 'Opportunity updated successfully.' : 'Opportunity added successfully.',
        },
      })
    } catch (submitError) {
      console.error('Save opportunity error:', submitError)
      setError(submitError.message || 'Unable to save opportunity.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="page-shell">
        <div className="page-container">
          <div className="loading-state">Loading opportunity form...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <div className="page-container admin-form-container">
        <div className="page-actions">
          <Link to="/admin" className="secondary-link">
            ← Back to Admin Dashboard
          </Link>
        </div>

        <article className="form-card admin-form-card">
          <div className="form-header">
            <p className="eyebrow">Admin</p>
            <h1>{isEditMode ? 'Edit Opportunity' : 'Add Opportunity'}</h1>
          </div>

          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="title">Job / Internship Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Frontend Developer Intern"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="NexaWorks"
              />
            </div>

            <div className="form-group">
              <label htmlFor="domain">Domain</label>
              <input
                id="domain"
                name="domain"
                type="text"
                value={formData.domain}
                onChange={handleChange}
                placeholder="Full Stack Development"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bengaluru"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                id="experience"
                name="experience"
                type="text"
                value={formData.experience}
                onChange={handleChange}
                placeholder="0-1 Years"
              />
            </div>

            <div className="form-group">
              <label htmlFor="applicationLink">Application Link</label>
              <input
                id="applicationLink"
                name="applicationLink"
                type="url"
                value={formData.applicationLink}
                onChange={handleChange}
                placeholder="https://example.com/apply"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and requirements."
                rows="6"
              />
            </div>

            {error && (
              <div className="error-state" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? (isEditMode ? 'Updating Opportunity...' : 'Creating Opportunity...') : isEditMode ? 'Update Opportunity' : 'Create Opportunity'}
            </button>
          </form>
        </article>
      </div>
    </main>
  )
}

export default AdminOpportunityForm
