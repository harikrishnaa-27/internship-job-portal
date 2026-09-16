import { Link } from 'react-router-dom'

function OpportunityCard({ opportunity }) {
  return (
    <article className="opportunity-card">
      <div className="card-header">
        <span className="domain-badge">{opportunity.domain}</span>
      </div>

      <h3>{opportunity.title}</h3>

      <p className="company-name">{opportunity.company}</p>

      <ul className="opportunity-meta">
        <li>
          <strong>Location:</strong> {opportunity.location}
        </li>
        <li>
          <strong>Experience:</strong> {opportunity.experience}
        </li>
      </ul>

      <p className="description">{opportunity.description}</p>

      <div className="card-actions">
        <Link to={`/opportunities/${opportunity._id}`} className="details-button">
          View Details
        </Link>

        {opportunity.applicationLink ? (
          <a
            href={opportunity.applicationLink}
            target="_blank"
            rel="noreferrer"
            className="secondary-button"
          >
            External Link
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default OpportunityCard
