import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

function UserProvider({ children }) {
  const [pseudo, setPseudo] = useState(null)
  const [meilleureScore, setMeilleureScore] = useState(0)

  const [historique, setHistorique] = useState(() => {
    try {
      const saved = localStorage.getItem('polyquiz_historique')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const ajouterJoueur = (nom, score) => {
    const nouvelHistorique = [
      ...historique,
      { pseudo: nom, score, date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
    ]
    setHistorique(nouvelHistorique)
    localStorage.setItem('polyquiz_historique', JSON.stringify(nouvelHistorique))
  }

  const value = {
    pseudo,
    setPseudo,
    meilleureScore,
    setMeilleureScore,
    historique,
    ajouterJoueur,
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