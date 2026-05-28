function App() {
  return (
    <main style={{
      minHeight: '100vh', background: '#F4ECD8', color: '#3E2723',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ color: '#2E7D32', fontSize: '2.5rem', fontFamily: 'serif' }}>🌿 Mes Projets Front-End</h1>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer"
           style={{ padding: '1.5rem 2.5rem', background: '#FFF8E7', color: '#8B5A2B', border: '2px solid #8B5A2B', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
           onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          📝 TaskFlow
        </a>
        <a href="http://localhost:5175" target="_blank" rel="noopener noreferrer"
           style={{ padding: '1.5rem 2.5rem', background: '#2E7D32', color: '#FFF', border: '2px solid #2E7D32', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
           onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
           onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          🍂 PolyQuiz
        </a>
      </div>
      <p style={{ marginTop: '2rem', color: '#5D4037', fontStyle: 'italic' }}>Cliquez sur l'un des projets pour l'ouvrir dans un nouvel onglet.</p>
    </main>
  )
}

export default App
