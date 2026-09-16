import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken')

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function AdminApplications() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_BASE_URL}/api/applications`, {
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Unable to load applications.')
        }

        const data = await response.json()
        setApplications(data)
      } catch (fetchError) {
        console.error('Failed to load applications:', fetchError)
        setError(fetchError.message || 'Unable to load applications.')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login', { replace: true })
  }

  return (
    <main className="page-shell admin-shell">
      <div className="page-container admin-container">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Applications</h1>
          </div>

          <div className="admin-header-actions">
            <Link to="/admin" className="secondary-button">
              Dashboard
            </Link>
            <Link to="/admin/applications" className="secondary-button">
              Applications
            </Link>
            <button type="button" className="secondary-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="error-state" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="no-results" role="status">
            No applications received yet.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table admin-applications-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Opportunity</th>
                  <th>Company</th>
                  <th>Resume</th>
                  <th>Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td>{application.studentName}</td>
                    <td>{application.email}</td>
                    <td>{application.phone}</td>
                    <td>{application.opportunityId?.title || 'N/A'}</td>
                    <td>{application.opportunityId?.company || 'N/A'}</td>
                    <td>
                      {application.resumeLink ? (
                        <a href={application.resumeLink} target="_blank" rel="noreferrer">
                          View Resume
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>{new Date(application.appliedDate).toLocaleString()}</td>
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

export default AdminApplications
