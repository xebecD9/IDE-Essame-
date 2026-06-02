import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function ProtectedRoute({ children }) {
  const { pseudo, token, ready } = useUser()

  if (!ready) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Vérification de la session...</div>
  }

  if (!pseudo || !token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute