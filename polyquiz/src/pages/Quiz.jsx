import { useReducer, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import useFetch from '../hooks/useFetch'
import { quizReducer, initialState } from '../reducers/quizReducer'

function Quiz() {
  // JALON 1 : useFetch récupère les questions
  const { data: questions, loading, error } = useFetch('/questions.json')

  // JALON 4 : useReducer gère tout l'état complexe du quiz
  const [state, dispatch] = useReducer(quizReducer, initialState)

  // JALON 5 : useRef stocke l'ID de l'intervalle (sans provoquer de re-render)
  const intervalRef = useRef(null)
  const [tempsRestant, setTempsRestant] = useReducer(
    (t, action) => action === 'reset' ? 60 : t - 1,
    60
  )

  const { pseudo, setMeilleureScore, meilleureScore } = useUser()
  const navigate = useNavigate()

  // Démarrer le quiz quand les questions sont chargées
  useEffect(() => {
    if (questions && state.statut === 'en_attente') {
      dispatch({ type: 'START_QUIZ' })
    }
  }, [questions])

  // JALON 5 — Chronomètre avec useRef pour éviter les fuites mémoire
  useEffect(() => {
    if (state.statut !== 'en_cours') return

    // Stocker l'ID dans la ref, PAS dans le state → pas de re-render inutile
    intervalRef.current = setInterval(() => {
      setTempsRestant('tick')
    }, 1000)

    // CLEANUP OBLIGATOIRE : nettoyage à chaque re-déclenchement de l'effet
    return () => clearInterval(intervalRef.current)
  }, [state.statut])

  // Surveiller le temps restant : 0 → FINISH_QUIZ + clearInterval
  useEffect(() => {
    if (tempsRestant <= 0) {
      // Nettoyage de la ref avant dispatch
      clearInterval(intervalRef.current)
      dispatch({ type: 'FINISH_QUIZ' })
    }
  }, [tempsRestant])

  // Quand le quiz est terminé → sauvegarder le score et naviguer
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

  if (loading) return <div style={{ color: '#e8e8f0', textAlign: 'center', padding: '4rem' }}>Chargement des questions...</div>
  if (error)   return <div style={{ color: '#f87171', textAlign: 'center', padding: '4rem' }}>Erreur : {error}</div>
  if (!questions || state.statut === 'en_attente') return null

  const questionActuelle = questions[state.questionIndex]

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem', color: '#e8e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <span>Joueur : <strong>{pseudo}</strong></span>
        <span style={{ color: tempsRestant <= 10 ? '#f87171' : '#34d399' }}>
          ⏱️ {tempsRestant}s
        </span>
        <span>Question {state.questionIndex + 1}/{questions.length}</span>
      </div>

      <div style={{ background: '#16161e', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
        <span style={{ color: '#7c6af7', fontSize: '0.8rem', fontWeight: 700 }}>
          {questionActuelle.categorie}
        </span>
        <h2 style={{ marginTop: '0.5rem' }}>{questionActuelle.libelle}</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {questionActuelle.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleReponse(option)}
            style={{
              padding: '1rem',
              background: '#1e1e2a',
              color: '#e8e8f0',
              border: '1px solid #2a2a35',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'background 0.2s',
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </main>
  )
}