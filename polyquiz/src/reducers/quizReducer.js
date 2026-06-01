export const initialState = {
  questionIndex: 0,
  score: 0,
  reponsesSelectionnees: [],
  statut: 'en_attente',
}

export function quizReducer(state, action) {
  switch (action.type) {

    case 'START_QUIZ':
      return {
        ...initialState,
        statut: 'en_cours',
      }

    case 'ANSWER_QUESTION': {
      //verifier si la reponse est bonne 
      const { reponse, bonneReponse, nombreQuestions } = action.payload

      const estCorrecte = reponse === bonneReponse
      const nouveauScore = estCorrecte ? state.score + 1 : state.score
      const prochainIndex = state.questionIndex + 1
      const estDerniereQuestion = prochainIndex >= nombreQuestions

      return {
        ...state,
        score: nouveauScore,
        reponsesSelectionnees: [...state.reponsesSelectionnees, reponse],
        questionIndex: prochainIndex,
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