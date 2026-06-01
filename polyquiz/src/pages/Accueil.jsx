import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function Accueil() {
  const [inputPseudo, setInputPseudo] = useState('')
  const { setPseudo, historique } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const pseudoTrim = inputPseudo.trim()
    if (!pseudoTrim) return
    setPseudo(pseudoTrim)
    navigate('/quiz')
  }

  const classement = [...historique].sort((a, b) => b.score - a.score)

  const medailles = ['🥇', '🥈', '🥉']

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
          style={{
            padding: '0.75rem',
            background: '#2E7D32',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(46, 125, 50, 0.3)',
          }}
        >
          Commencer l'Aventure →
        </button>
      </form>

      {classement.length > 0 && (
        <div style={{
          marginTop: '3rem',
          width: '100%',
          maxWidth: '420px',
          background: '#FFF8E7',
          borderRadius: '16px',
          border: '2px solid #8B5A2B',
          boxShadow: '0 6px 16px rgba(139, 90, 43, 0.15)',
          overflow: 'hidden',
        }}>
          <div style={{
            background: '#2E7D32',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '1.2rem' }}>🏆</span>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontFamily: 'serif', fontWeight: 700 }}>
              Classement des joueurs
            </h2>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#EAE0CC' }}>
                <th style={{ padding: '0.6rem 1rem', textAlign: 'left', color: '#5D4037', fontWeight: 700, fontSize: '0.85rem' }}>#</th>
                <th style={{ padding: '0.6rem 1rem', textAlign: 'left', color: '#5D4037', fontWeight: 700, fontSize: '0.85rem' }}>Joueur</th>
                <th style={{ padding: '0.6rem 1rem', textAlign: 'center', color: '#5D4037', fontWeight: 700, fontSize: '0.85rem' }}>Score</th>
                <th style={{ padding: '0.6rem 1rem', textAlign: 'right', color: '#5D4037', fontWeight: 700, fontSize: '0.85rem' }}>Heure</th>
              </tr>
            </thead>
            <tbody>
              {classement.map((joueur, index) => (
                <tr
                  key={index}
                  style={{
                    borderTop: '1px solid #D7CCC8',
                    background: index === 0 ? 'rgba(46,125,50,0.07)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <td style={{ padding: '0.7rem 1rem', fontSize: '1.1rem' }}>
                    {medailles[index] || `${index + 1}`}
                  </td>
                  <td style={{ padding: '0.7rem 1rem', color: '#3E2723', fontWeight: index === 0 ? 700 : 400 }}>
                    {joueur.pseudo}
                  </td>
                  <td style={{ padding: '0.7rem 1rem', textAlign: 'center' }}>
                    <span style={{
                      background: '#2E7D32',
                      color: '#fff',
                      borderRadius: '20px',
                      padding: '0.2rem 0.75rem',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}>
                      {joueur.score}/10
                    </span>
                  </td>
                  <td style={{ padding: '0.7rem 1rem', textAlign: 'right', color: '#A1887F', fontSize: '0.85rem' }}>
                    {joueur.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {classement.length === 0 && (
        <p style={{ marginTop: '3rem', color: '#A1887F', fontStyle: 'italic', fontSize: '0.95rem' }}>
          Aucune partie jouée pour l'instant. Sois le premier ! 🌱
        </p>
      )}
    </main>
  )
}

export default Accueil
