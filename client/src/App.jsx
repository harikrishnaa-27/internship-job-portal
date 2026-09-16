import { Navigate, Route, Routes } from 'react-router-dom'
import AdminApplications from './pages/AdminApplications'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminOpportunityForm from './pages/AdminOpportunityForm'
import ApplicationConfirmation from './pages/ApplicationConfirmation'
import ApplicationForm from './pages/ApplicationForm'
import OpportunityDetails from './pages/OpportunityDetails'
import Opportunities from './pages/Opportunities'

const isAuthenticated = () => Boolean(localStorage.getItem('adminToken'))

const ProtectedAdminRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Opportunities />} />
      <Route path="/opportunities/:id" element={<OpportunityDetails />} />
      <Route path="/opportunities/:id/apply" element={<ApplicationForm />} />
      <Route path="/application-confirmation" element={<ApplicationConfirmation />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/applications"
        element={
          <ProtectedAdminRoute>
            <AdminApplications />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/opportunities/new"
        element={
          <ProtectedAdminRoute>
            <AdminOpportunityForm />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/opportunities/:id/edit"
        element={
          <ProtectedAdminRoute>
            <AdminOpportunityForm />
          </ProtectedAdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
