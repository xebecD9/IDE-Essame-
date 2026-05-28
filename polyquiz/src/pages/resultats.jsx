import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

function Resultats() {
  const location = useLocation()
  const navigate = useNavigate()
  const { pseudo, meilleureScore } = useUser()

  const { score = 0, total = 10 } = location.state || {}

  const [themeClair, setThemeClair] = useState(true)

  const ratioReussite = useMemo(() => {
    console.log('Calcul du ratio (ne doit s\'afficher qu\'une fois)')
    if (total === 0) return 0
    return Math.round((score / total) * 100)
  }, [score, total])

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
        <p style={{ fontSize: '5rem', fontWeight: 900, color: scoreColor, margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{score}/{total}</p>
        <p style={{ color: ratioColor, fontSize: '1.1rem', fontWeight: 'bold' }}>Taux de réussite : {ratioReussite}%</p>
        <p style={{ color: bestScoreColor, fontSize: '1.1rem' }}>Meilleur score : {meilleureScore}</p>
      </div>

      <button
        onClick={() => setThemeClair(t => !t)}
        style={{ margin: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: `2px solid ${borderColor}`, background: 'transparent', color: fg, cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
      >
        Passer au thème ({themeClair ? 'Forêt de nuit' : 'Journée boisée'})
      </button>

      <button
        onClick={() => navigate('/')}
        style={{ padding: '1rem 2.5rem', background: btnBg, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', transition: 'background 0.2s' }}
      >
        Rejouer une partie
      </button>
    </main>
  )
}

export default Resultats
