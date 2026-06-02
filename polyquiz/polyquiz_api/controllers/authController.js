const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { pseudo } = req.body;

    if (!pseudo) {
      return res.status(400).json({ message: 'Le pseudo est requis' });
    }

    const lowerPseudo = pseudo.toLowerCase();
    let user = await User.findOne({ pseudo: lowerPseudo });

    if (!user) {
      user = await User.create({ pseudo: lowerPseudo });
      console.log(`Nouvel utilisateur créé : ${user.pseudo}`);
    }

    const token = jwt.sign(
      { _id: user._id, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { pseudo: user.pseudo, bestScore: user.bestScore }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
