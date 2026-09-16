import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import OpportunityCard from '../components/OpportunityCard'
import { API_BASE_URL } from '../config/api'

function Opportunities() {
  const [opportunities, setOpportunities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('All Domains')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_BASE_URL}/api/opportunities`)

        if (!response.ok) {
          throw new Error('Unable to fetch opportunities')
        }

        const data = await response.json()
        setOpportunities(data)
        setSelectedDomain('All Domains')
      } catch (fetchError) {
        console.error('Failed to load opportunities:', fetchError)
        setError('Unable to load opportunities. Please try again.')
        setOpportunities([])
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  const domains = useMemo(() => {
    const uniqueDomains = [...new Set(opportunities.map((opportunity) => opportunity.domain))]
    return ['All Domains', ...uniqueDomains]
  }, [opportunities])

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const searchValue = searchTerm.trim().toLowerCase()
      const matchesSearch =
        searchValue === '' ||
        opportunity.title.toLowerCase().includes(searchValue) ||
        opportunity.company.toLowerCase().includes(searchValue) ||
        opportunity.domain.toLowerCase().includes(searchValue) ||
        opportunity.location.toLowerCase().includes(searchValue)

      const matchesDomain =
        selectedDomain === 'All Domains' || opportunity.domain === selectedDomain

      return matchesSearch && matchesDomain
    })
  }, [opportunities, searchTerm, selectedDomain])

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedDomain('All Domains')
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
          <header className="page-header">
            <p className="eyebrow">Career opportunities</p>
            <h1>Internship &amp; Job Listing Portal</h1>
            <p className="subtitle">
              Find internships and job opportunities that match your interests.
            </p>
          </header>

        <section className="filters-panel" aria-label="Opportunity filters">
          <div className="filter-field search-field">
            <label htmlFor="search-opportunities">Search</label>
            <input
              id="search-opportunities"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search opportunities..."
              aria-label="Search opportunities"
            />
          </div>

          <div className="filter-field">
            <label htmlFor="domain-filter">Domain</label>
            <select
              id="domain-filter"
              value={selectedDomain}
              onChange={(event) => setSelectedDomain(event.target.value)}
              aria-label="Filter by domain"
            >
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field filter-actions">
            <button type="button" className="reset-button" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </section>

        {loading && <div className="loading-state">Loading opportunities...</div>}

        {!loading && error && (
          <div className="error-state" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && opportunities.length === 0 && (
          <div className="no-results" role="status">
            No opportunities available.
          </div>
        )}

        {!loading && !error && filteredOpportunities.length === 0 && opportunities.length > 0 && (
          <div className="no-results" role="status">
            No opportunities found.
          </div>
        )}

        {!loading && !error && filteredOpportunities.length > 0 && (
          <section className="opportunity-list" aria-live="polite">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity._id || opportunity.id} opportunity={opportunity} />
            ))}
          </section>
        )}
        </div>
      </main>
    </>
  )
}

export default Opportunities
