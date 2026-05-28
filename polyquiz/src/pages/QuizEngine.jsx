import { useReducer, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import useFetch from '../hooks/useFetch'
import { quizReducer, initialState } from '../reducers/quizReducer'

function QuizEngine() {
  const { data: questions, loading, error } = useFetch('/questions.json')
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const intervalRef = useRef(null)
  const [tempsRestant, setTempsRestant] = useReducer(
    (t, action) => action === 'reset' ? 60 : t - 1,
    60
  )

  const { pseudo, setMeilleureScore, meilleureScore } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (questions && state.statut === 'en_attente') {
      dispatch({ type: 'START_QUIZ' })
    }
  }, [questions])

  useEffect(() => {
    if (state.statut !== 'en_cours') return

    intervalRef.current = setInterval(() => {
      setTempsRestant('tick')
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [state.statut])

  useEffect(() => {
    if (tempsRestant <= 0) {
      clearInterval(intervalRef.current)
      dispatch({ type: 'FINISH_QUIZ' })
    }
  }, [tempsRestant])

  useEffect(() => {
    if (state.statut === 'termine') {
      clearInterval(intervalRef.current)
      if (state.score > meilleureScore) {
        setMeilleureScore(state.score)
      }
      navigate('/resultats', { state: { score: state.score, total: questions?.length } })
    }
  }, [state.statut])

  const handleReponse = (reponse) => {
    if (!questions) return
    const questionActuelle = questions[state.questionIndex]
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        reponse,
        bonneReponse: questionActuelle.bonne_reponse,
        nombreQuestions: questions.length,
      }
    })
  }

  if (loading) return <div style={{ color: '#3E2723', textAlign: 'center', padding: '4rem' }}>Chargement des questions...</div>
  if (error)   return <div style={{ color: '#D32F2F', textAlign: 'center', padding: '4rem' }}>Erreur : {error}</div>
  if (!questions || state.statut === 'en_attente' || state.statut === 'termine') return null

  const questionActuelle = questions[state.questionIndex]

  // Sécurité additionnelle au cas où
  if (!questionActuelle) return null

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem', color: '#3E2723', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem', background: '#FFF8E7', borderRadius: '12px', border: '1px solid #D7CCC8' }}>
        <span>Joueur : <strong style={{ color: '#8B5A2B' }}>{pseudo}</strong></span>
        <span style={{ color: tempsRestant <= 10 ? '#D32F2F' : '#2E7D32', fontWeight: 'bold' }}>
          ⏱ {tempsRestant}s
        </span>
        <span style={{ color: '#5D4037' }}>Question {state.questionIndex + 1}/{questions.length}</span>
        <button
          onClick={() => {
            if (window.confirm("Voulez-vous vraiment quitter l'aventure en cours ?")) {
               navigate('/')
            }
          }}
          style={{ padding: '0.4rem 0.8rem', background: '#D32F2F', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
        >
          Quitter
        </button>
      </div>

      <div style={{ background: '#EAE0CC', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem', border: '2px solid #8B5A2B', boxShadow: '0 4px 10px rgba(139, 90, 43, 0.1)' }}>
        <span style={{ color: '#8B5A2B', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {questionActuelle.categorie}
        </span>
        <h2 style={{ marginTop: '0.5rem', fontFamily: 'serif', fontSize: '1.8rem' }}>{questionActuelle.libelle}</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {questionActuelle.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleReponse(option)}
            style={{
              padding: '1.2rem',
              background: '#FFF8E7',
              color: '#3E2723',
              border: '2px solid #A1887F',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#8B5A2B'; e.currentTarget.style.color = '#FFF'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#FFF8E7'; e.currentTarget.style.color = '#3E2723'; }}
          >
            {option}
          </button>
        ))}
      </div>
    </main>
  )
}

export default QuizEngine
