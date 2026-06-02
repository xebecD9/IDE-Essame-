export const initialState = {
  questionIndex: 0,
  score: 0,
  reponsesSelectionnees: [],
  statut: 'en_attente',
  feedback: null,
  reponseSelectionnee: null
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
      const estCorrecte = reponse === bonneReponse
      
      return {
        ...state,
        feedback: {
          estCorrecte,
          reponse,
          bonneReponse
        },
        reponseSelectionnee: reponse
      }
    }

    case 'NEXT_QUESTION': {
      const { nombreQuestions } = action.payload
      const estCorrecte = state.feedback.estCorrecte
      const nouveauScore = estCorrecte ? state.score + 1 : state.score
      const prochainIndex = state.questionIndex + 1
      const estDerniereQuestion = prochainIndex >= nombreQuestions

      return {
        ...state,
        score: nouveauScore,
        reponsesSelectionnees: [...state.reponsesSelectionnees, state.reponseSelectionnee],
        questionIndex: prochainIndex,
        feedback: null,
        reponseSelectionnee: null,
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