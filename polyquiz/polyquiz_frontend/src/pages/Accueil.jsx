import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function Accueil() {
  const [inputPseudo, setInputPseudo] = useState('')
  const [localError, setLocalError] = useState(null)
  const { login, authLoading, authError, token } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)
    const pseudoTrim = inputPseudo.trim()
    if (!pseudoTrim) {
      setLocalError('Le pseudo est requis.')
      return
    }

    const result = await login(pseudoTrim)

    if (!result.success) {
      setLocalError(result.message || 'Impossible de se connecter.')
      return
    }

    navigate('/quiz')
  }

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#F4ECD8',
      padding: '2rem',
    }}>
      <h1 style={{ color: '#2E7D32', fontSize: '3rem', marginBottom: '0.5rem', fontFamily: 'serif' }}>
        🌿 PolyQuiz
      </h1>
      <p style={{ color: '#5D4037', marginBottom: '2rem', fontStyle: 'italic' }}>
        Une compétition au naturel
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input
          type="text"
          value={inputPseudo}
          onChange={e => setInputPseudo(e.target.value)}
          placeholder="Entre ton pseudo..."
          required
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '2px solid #8B5A2B',
            background: '#FFF8E7',
            color: '#3E2723',
            fontSize: '1rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={authLoading}
          style={{
            padding: '0.75rem',
            background: '#2E7D32',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: authLoading ? 'not-allowed' : 'pointer',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(46, 125, 50, 0.3)',
            opacity: authLoading ? 0.7 : 1,
          }}
        >
          {authLoading ? 'Connexion en cours...' : 'Commencer l\'Aventure →'}
        </button>
      </form>

      {(localError || authError) && (
        <div style={{ marginTop: '1rem', color: '#D32F2F', fontWeight: 700 }}>{localError || authError}</div>
      )}

      {!token && (
        <p style={{ marginTop: '1rem', color: '#5D4037', fontSize: '0.95rem' }}>
          Ton pseudo sera conservé pendant cette session pour accéder au quiz. Si tu fermes le navigateur, reconnecte-toi.
        </p>
      )}

      {token && (
        <p style={{ marginTop: '1rem', color: '#2E7D32', fontSize: '0.95rem' }}>
          Tu es connecté, prêt à jouer !
        </p>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <button
          onClick={() => navigate('/leaderboard')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #8B5A2B', background: '#FFF8E7', color: '#3E2723', cursor: 'pointer', fontWeight: 700 }}
        >
          Voir le leaderboard public
        </button>
      </div>
    </main>
  )
}

export default Accueil
