import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function Accueil() {
  const [inputPseudo, setInputPseudo] = useState('')
  const { setPseudo } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const pseudoTrim = inputPseudo.trim()
    if (!pseudoTrim) return

    // Stocker le pseudo dans le Context global
    setPseudo(pseudoTrim)
    // Naviguer vers le quiz
    navigate('/quiz')
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F4ECD8' }}>
      <h1 style={{ color: '#2E7D32', fontSize: '3rem', marginBottom: '0.5rem', fontFamily: 'serif' }}>🌿 PolyQuiz</h1>
      <p style={{ color: '#5D4037', marginBottom: '2rem', fontStyle: 'italic' }}>Une compétition au naturel</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input
          type="text"
          value={inputPseudo}
          onChange={e => setInputPseudo(e.target.value)}
          placeholder="Entre ton pseudo..."
          required
          style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #8B5A2B', background: '#FFF8E7', color: '#3E2723', fontSize: '1rem', outline: 'none' }}
        />
        <button
          type="submit"
          style={{ padding: '0.75rem', background: '#2E7D32', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', boxShadow: '0 4px 6px rgba(46, 125, 50, 0.3)' }}
        >
          Commencer l'Aventure →
        </button>
      </form>
    </main>
  )
}

export default Accueil
