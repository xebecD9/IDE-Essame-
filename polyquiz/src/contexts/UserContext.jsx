import { createContext, useContext, useState } from 'react'

// 1. Instanciation du contexte (valeur par défaut = null)
const UserContext = createContext(null)

// 2. Le Provider : composant qui enveloppe l'app et fournit les données
function UserProvider({ children }) {
  // L'état global : pseudo null = pas encore connecté
  const [pseudo, setPseudo]         = useState(null)
  const [meilleureScore, setMeilleureScore] = useState(0)

  // On expose les données ET les fonctions pour les modifier
  const value = {
    pseudo,
    setPseudo,
    meilleureScore,
    setMeilleureScore,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// 3. Hook custom pour consommer le contexte proprement
// Évite d'importer useContext + UserContext dans chaque composant
function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'un UserProvider')
  }
  return context
}

export { UserProvider, useUser }