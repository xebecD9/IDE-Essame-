export const initialState = {
  questionIndex: 0,       // Index de la question actuelle
  score: 0,               // Score temporaire de la partie
  reponsesSelectionnees: [], // Historique des réponses
  statut: 'en_attente',   // 'en_attente' | 'en_cours' | 'termine'
}

export function quizReducer(state, action) {
  switch (action.type) {

    case 'START_QUIZ':
      return {
        ...initialState,
        statut: 'en_cours',
      }

    case 'ANSWER_QUESTION': {
      const { reponse, bonneReponse, nombreQuestions } = action.payload

      // Calcul automatique si la réponse est correcte
      const estCorrecte = reponse === bonneReponse
      const nouveauScore = estCorrecte ? state.score + 1 : state.score
      const prochainIndex = state.questionIndex + 1
      const estDerniereQuestion = prochainIndex >= nombreQuestions

      return {
        ...state,
        score: nouveauScore,
        reponsesSelectionnees: [...state.reponsesSelectionnees, reponse],
        questionIndex: prochainIndex,
        // Si c'était la dernière question, on termine automatiquement
        statut: estDerniereQuestion ? 'termine' : 'en_cours',
      }
    }

    case 'FINISH_QUIZ':
      return {
        ...state,
        statut: 'termine',
      }

    default:
      return state
  }
}