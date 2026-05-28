import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function ProtectedRoute({ children }) {
  const { pseudo } = useUser()

  // Si pas de pseudo → redirection immédiate vers l'accueil
  // <Navigate replace> remplace l'entrée dans l'historique (pas de "retour arrière")
  if (!pseudo) {
    return <Navigate to="/" replace />
  }

  // Si pseudo existe → on rend normalement la page demandée
  return children
}

export default ProtectedRoute