import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Resultats() {
  const location = useLocation()
  const navigate = useNavigate()
  const { pseudo, token, meilleureScore } = useUser()

  const { score = 0, total = 10 } = location.state || {}

  const [themeClair, setThemeClair] = useState(true)
  const [submitStatus, setSubmitStatus] = useState({ loading: false, message: null, error: null })

  useEffect(() => {
    if (!location.state || typeof location.state.score !== 'number') {
      navigate('/', { replace: true })
    }
  }, [location.state, navigate])

  const ratioReussite = useMemo(() => {
    if (total === 0) return 0
    return Math.round((score / total) * 100)
  }, [score, total])

  const getNotation = useMemo(() => {
    if (ratioReussite >= 90) return { lettre: 'A', emoji: '🌟', texte: 'Excellent!' }
    if (ratioReussite >= 75) return { lettre: 'B', emoji: '👏', texte: 'Très bien!' }
    if (ratioReussite >= 60) return { lettre: 'C', emoji: '👍', texte: 'Bien!' }
    if (ratioReussite >= 45) return { lettre: 'D', emoji: '📈', texte: 'À améliorer' }
    return { lettre: 'F', emoji: '💪', texte: 'Réessayer!' }
  }, [ratioReussite])

  useEffect(() => {
    if (!token) return
    if (!location.state) return

    const sendScore = async () => {
      setSubmitStatus({ loading: true, message: null, error: null })

      try {
        const response = await fetch(`${API_URL}/api/users/score`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ score })
        })

        const result = await response.json()

        if (!response.ok) {
          setSubmitStatus({ loading: false, message: null, error: result.message || 'Impossible d\'envoyer le score' })
          return
        }

        setSubmitStatus({ loading: false, message: result.message, error: null })
      } catch (error) {
        setSubmitStatus({ loading: false, message: null, error: error.message })
      }
    }

    sendScore()
  }, [token, score, location.state])

  const bg = themeClair ? '#F4ECD8' : '#1B3320'
  const fg = themeClair ? '#3E2723' : '#E8F5E9'
  
  const containerBg = themeClair ? '#FFF8E7' : '#2A4B31'
  const scoreColor = themeClair ? '#8B5A2B' : '#D4A373'
  const ratioColor = themeClair ? '#5D4037' : '#A5D6A7'
  const bestScoreColor = themeClair ? '#E65100' : '#FFB74D'
  
  const borderColor = themeClair ? '#A1887F' : '#81C784'
  const btnBg = themeClair ? '#2E7D32' : '#8B5A2B'

  return (
    <main style={{ minHeight: '100vh', background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: fg, transition: 'background 0.3s, color 0.3s' }}>
      <h1 style={{ fontFamily: 'serif' }}>🏆 Résultats</h1>
      <p style={{ fontSize: '1.2rem' }}>Bravo <strong style={{ color: scoreColor }}>{pseudo}</strong> !</p>

      <div style={{ background: containerBg, borderRadius: '16px', padding: '2rem 3rem', textAlign: 'center', margin: '1.5rem 0', border: `2px solid ${borderColor}`, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', transition: 'background 0.3s' }}>
        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: ratioColor, margin: '0 0 1rem 0' }}>{getNotation.emoji} {getNotation.texte}</p>
        <p style={{ fontSize: '5rem', fontWeight: 900, color: scoreColor, margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{score}/{total}</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: getNotation.lettre === 'A' || getNotation.lettre === 'B' ? '#4CAF50' : '#FF9800', margin: '0.5rem 0' }}>Note: {getNotation.lettre}</p>
        <p style={{ color: ratioColor, fontSize: '1.3rem', fontWeight: 'bold' }}>Taux de réussite : {ratioReussite}%</p>
        <p style={{ color: bestScoreColor, fontSize: '1.1rem', marginTop: '1rem' }}>🏆 Meilleur score : {meilleureScore}/{total}</p>
      </div>

      <button
        onClick={() => setThemeClair(t => !t)}
        style={{ margin: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: `2px solid ${borderColor}`, background: 'transparent', color: fg, cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
      >
        Passer au thème ({themeClair ? 'Forêt de nuit' : 'Journée boisée'})
      </button>

      {(submitStatus.loading || submitStatus.message || submitStatus.error) && (
        <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', borderRadius: '12px', background: themeClair ? '#F1F8E9' : '#2E7D32', color: themeClair ? '#33691E' : '#E8F5E9', border: `1px solid ${borderColor}`, width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          {submitStatus.loading && 'Envoi du score en cours...'}
          {submitStatus.message && submitStatus.message}
          {submitStatus.error && `Erreur : ${submitStatus.error}`}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.25rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '1rem 2.5rem', background: btnBg, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', transition: 'background 0.2s' }}
        >
          Rejouer une partie
        </button>
        <button
          onClick={() => navigate('/leaderboard')}
          style={{ padding: '1rem 2.5rem', background: 'transparent', color: fg, border: `2px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem' }}
        >
          Voir le leaderboard
        </button>
      </div>
    </main>
  )
}

export default Resultats
