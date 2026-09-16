import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken')

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function AdminDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || '')

  const fetchOpportunities = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_BASE_URL}/api/opportunities`, {
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Unable to load opportunities.')
      }

      const data = await response.json()
      setOpportunities(data)
    } catch (fetchError) {
      console.error('Failed to load admin opportunities:', fetchError)
      setError(fetchError.message || 'Unable to load opportunities.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOpportunities()
  }, [])

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleDelete = async (opportunityId) => {
    const confirmed = window.confirm('Are you sure you want to delete this opportunity?')

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/opportunities/${opportunityId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete opportunity.')
      }

      setSuccessMessage('Opportunity deleted successfully.')
      setOpportunities((currentOpportunities) =>
        currentOpportunities.filter((opportunity) => opportunity._id !== opportunityId),
      )
    } catch (deleteError) {
      console.error('Delete opportunity error:', deleteError)
      setError(deleteError.message || 'Unable to delete opportunity.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login', { replace: true })
  }

  return (
    <main className="page-shell admin-shell">
      <div className="page-container admin-container">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1>Opportunity Management</h1>
          </div>

          <div className="admin-header-actions">
            <Link to="/admin" className="secondary-button">
              Dashboard
            </Link>
            <Link to="/admin/applications" className="secondary-button">
              Applications
            </Link>
            <Link to="/admin/opportunities/new" className="details-button">
              Add Opportunity
            </Link>
            <button type="button" className="secondary-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {successMessage && (
          <div className="success-banner" role="status">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="error-state" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading opportunities...</div>
        ) : opportunities.length === 0 ? (
          <div className="no-results" role="status">
            No opportunities available.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Opportunity</th>
                  <th>Company</th>
                  <th>Domain</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opportunity) => (
                  <tr key={opportunity._id}>
                    <td>{opportunity.title}</td>
                    <td>{opportunity.company}</td>
                    <td>{opportunity.domain}</td>
                    <td>{opportunity.location}</td>
                    <td>
                      <div className="table-actions">
                        <Link
                          to={`/admin/opportunities/${opportunity._id}/edit`}
                          className="secondary-button table-button"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="danger-button table-button"
                          onClick={() => handleDelete(opportunity._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

export default AdminDashboard
