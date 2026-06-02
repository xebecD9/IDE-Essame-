const User = require('../models/User');

exports.updateScore = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user._id;

    if (score === undefined) {
      return res.status(400).json({ message: 'Score requis' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (score > user.bestScore) {
      user.bestScore = score;
      await user.save();
      return res.status(200).json({
        message: 'Nouveau record enregistré !',
        bestScore: user.bestScore
      });
    }

    res.status(200).json({
      message: 'Score inférieur au record, aucune mise à jour',
      bestScore: user.bestScore
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .sort({ bestScore: -1 })
      .limit(10)
      .select('pseudo bestScore -_id');

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
