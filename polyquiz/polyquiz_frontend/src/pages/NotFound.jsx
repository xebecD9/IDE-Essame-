import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <main style={{ minHeight: '100vh', background: '#F4ECD8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#3E2723' }}>
      <h1 style={{ fontSize: '4rem', color: '#2E7D32', marginBottom: '1rem', fontFamily: 'serif' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Oups ! Ce chemin mène hors de la forêt...</p>
      <button
        onClick={() => navigate('/')}
        style={{ padding: '0.75rem 2rem', background: '#8B5A2B', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
      >
        Retourner à l'accueil
      </button>
    </main>
  )
}

export default NotFound
