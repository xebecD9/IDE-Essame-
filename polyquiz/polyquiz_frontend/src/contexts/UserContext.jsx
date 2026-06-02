import { createContext, useContext, useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const UserContext = createContext(null)

function UserProvider({ children }) {
  const [pseudo, setPseudo] = useState(null)
  const [token, setToken] = useState(null)
  const [meilleureScore, setMeilleureScore] = useState(0)
  const [ready, setReady] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  const [historique, setHistorique] = useState(() => {
    try {
      const saved = localStorage.getItem('polyquiz_historique')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const savedToken = localStorage.getItem('polyquiz_token')
    const savedPseudo = localStorage.getItem('polyquiz_pseudo')
    const savedBestScore = localStorage.getItem('polyquiz_bestScore')

    if (savedToken && savedPseudo) {
      setToken(savedToken)
      setPseudo(savedPseudo)
      setMeilleureScore(Number(savedBestScore) || 0)
    }

    setReady(true)
  }, [])

  const saveSession = (session) => {
    localStorage.setItem('polyquiz_token', session.token)
    localStorage.setItem('polyquiz_pseudo', session.pseudo)
    localStorage.setItem('polyquiz_bestScore', session.bestScore)
  }

  const clearSession = () => {
    localStorage.removeItem('polyquiz_token')
    localStorage.removeItem('polyquiz_pseudo')
    localStorage.removeItem('polyquiz_bestScore')
  }

  const login = async (rawPseudo) => {
    const pseudoTrim = rawPseudo.trim()
    if (!pseudoTrim) {
      return { success: false, message: 'Le pseudo est requis' }
    }

    setAuthLoading(true)
    setAuthError(null)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo: pseudoTrim })
      })

      const body = await response.json()

      if (!response.ok) {
        setAuthError(body.message || 'Impossible de se connecter')
        return { success: false, message: body.message || 'Impossible de se connecter' }
      }

      setPseudo(body.user.pseudo)
      setToken(body.token)
      setMeilleureScore(body.user.bestScore)
      saveSession({ token: body.token, pseudo: body.user.pseudo, bestScore: body.user.bestScore })
      return { success: true }
    } catch (error) {
      setAuthError(error.message)
      return { success: false, message: error.message }
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = () => {
    setPseudo(null)
    setToken(null)
    setMeilleureScore(0)
    clearSession()
  }

  const ajouterJoueur = (nom, score) => {
    const nouvelHistorique = [
      ...historique,
      {
        pseudo: nom,
        score,
        date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }
    ]
    setHistorique(nouvelHistorique)
    localStorage.setItem('polyquiz_historique', JSON.stringify(nouvelHistorique))
  }

  const updateBestScore = (score) => {
    if (score > meilleureScore) {
      setMeilleureScore(score)
      localStorage.setItem('polyquiz_bestScore', score)
    }
  }

  const value = {
    pseudo,
    setPseudo,
    token,
    meilleureScore,
    setMeilleureScore,
    historique,
    ajouterJoueur,
    login,
    logout,
    authLoading,
    authError,
    updateBestScore,
    ready,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'un UserProvider')
  }
  return context
}

export { UserProvider, useUser }