const Question = require('../models/Question');

exports.getAllQuestions = async (req, res) => {
  try {
    const difficultyOrder = { 'facile': 1, 'moyen': 2, 'difficile': 3 };
    const questions = await Question.find({});
    
    // Trier par difficulté: facile -> moyen -> difficile
    const sorted = questions.sort((a, b) => {
      const orderA = difficultyOrder[a.difficulty] || 0;
      const orderB = difficultyOrder[b.difficulty] || 0;
      return orderA - orderB;
    });
    
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
