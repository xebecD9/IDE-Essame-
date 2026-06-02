import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

function Leaderboard() {
  const { data, loading, error } = useFetch('/api/leaderboard')
  const navigate = useNavigate()

  return (
    <main style={{ minHeight: '100vh', background: '#F4ECD8', padding: '2rem', color: '#3E2723' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', margin: 0, fontFamily: 'serif' }}>🏆 Leaderboard</h1>
            <p style={{ color: '#5D4037', marginTop: '0.75rem' }}>Découvrez les meilleurs scores de PolyQuiz.</p>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '0.85rem 1.5rem', background: '#2E7D32', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
          >
            Retour à l'accueil
          </button>
        </div>

        {loading && <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement du classement...</div>}
        {error && <div style={{ padding: '2rem', color: '#D32F2F', textAlign: 'center' }}>Erreur : {error}</div>}

        {!loading && !error && (
          <div style={{ background: '#FFF8E7', borderRadius: '18px', padding: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#EAE0CC' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#5D4037', fontWeight: 700 }}>#</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#5D4037', fontWeight: 700 }}>Pseudo</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#5D4037', fontWeight: 700 }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? data.map((item, index) => (
                  <tr key={item.pseudo || index} style={{ borderTop: '1px solid #D7CCC8' }}>
                    <td style={{ padding: '1rem', fontSize: '1rem' }}>{index + 1}</td>
                    <td style={{ padding: '1rem', color: '#3E2723', fontWeight: index === 0 ? 700 : 500 }}>{item.pseudo}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}><strong>{item.bestScore}</strong></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" style={{ padding: '1.5rem', textAlign: 'center', color: '#8B5A2B' }}>Aucun score disponible pour le moment.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

export default Leaderboard
