require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');
const { MongoMemoryServer } = require('mongodb-memory-server');

const questions = [
  {
    category: 'Général',
    text: 'Quelle est la capitale de la France ?',
    options: ['Paris', 'Lyon', 'Marseille', 'Nice'],
    correctAnswer: 'Paris',
    difficulty: 'facile'
  },
  {
    category: 'Maths',
    text: 'Combien font 8 × 7 ?',
    options: ['54', '56', '58', '60'],
    correctAnswer: '56',
    difficulty: 'facile'
  },
  {
    category: 'Histoire',
    text: 'Qui a découvert l\'Amérique en 1492 ?',
    options: ['Christophe Colomb', 'Marco Polo', 'Vasco de Gama', 'Léif Erikson'],
    correctAnswer: 'Christophe Colomb',
    difficulty: 'facile'
  },
  {
    category: 'Sciences',
    text: 'Quel est l\'état de l\'eau à 100°C au niveau de la mer ?',
    options: ['Solide', 'Liquide', 'Gazeux', 'Plasma'],
    correctAnswer: 'Gazeux',
    difficulty: 'moyen'
  },
  {
    category: 'Culture',
    text: 'Quel est l\'instrument principal du groupe Coldplay ?',
    options: ['Piano', 'Guitare', 'Batterie', 'Saxophone'],
    correctAnswer: 'Piano',
    difficulty: 'moyen'
  },
  {
    category: 'Géographie',
    text: 'Quel est le plus grand océan du monde ?',
    options: ['Océan Atlantique', 'Océan Pacifique', 'Océan Indien', 'Océan Arctique'],
    correctAnswer: 'Océan Pacifique',
    difficulty: 'facile'
  },
  {
    category: 'Biologie',
    text: 'Combien de chromosomes possède un humain ?',
    options: ['23', '46', '64', '32'],
    correctAnswer: '46',
    difficulty: 'moyen'
  },
  {
    category: 'Littérature',
    text: 'Qui a écrit "Les Misérables" ?',
    options: ['Victor Hugo', 'Alexandre Dumas', 'Gustave Flaubert', 'Honoré de Balzac'],
    correctAnswer: 'Victor Hugo',
    difficulty: 'facile'
  },
  {
    category: 'Physique',
    text: 'Quelle est la vitesse de la lumière ?',
    options: ['200,000 km/s', '300,000 km/s', '400,000 km/s', '100,000 km/s'],
    correctAnswer: '300,000 km/s',
    difficulty: 'moyen'
  },
  {
    category: 'Sports',
    text: 'Combien de joueurs y a-t-il dans une équipe de football ?',
    options: ['9', '10', '11', '12'],
    correctAnswer: '11',
    difficulty: 'facile'
  },
  {
    category: 'Chimie',
    text: 'Quel est le symbole chimique de l\'or ?',
    options: ['Go', 'Au', 'Or', 'Ao'],
    correctAnswer: 'Au',
    difficulty: 'difficile'
  },
  {
    category: 'Art',
    text: 'Qui a peint "La Nuit Étoilée" ?',
    options: ['Pablo Picasso', 'Vincent van Gogh', 'Claude Monet', 'Salvador Dalí'],
    correctAnswer: 'Vincent van Gogh',
    difficulty: 'moyen'
  },
  {
    category: 'Informatique',
    text: 'Quel langage de programmation est le plus populaire pour le web ?',
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    correctAnswer: 'JavaScript',
    difficulty: 'moyen'
  },
  {
    category: 'Politique',
    text: 'Quel pays a le plus grand nombre d\'habitants ?',
    options: ['Inde', 'Chine', 'États-Unis', 'Russie'],
    correctAnswer: 'Inde',
    difficulty: 'difficile'
  },
  {
    category: 'Mythologie',
    text: 'Qui est le roi des dieux dans la mythologie grecque ?',
    options: ['Poséidon', 'Arès', 'Zeus', 'Hadès'],
    correctAnswer: 'Zeus',
    difficulty: 'facile'
  },
  {
    category: 'Économie',
    text: 'Quelle devise est utilisée dans l\'Union Européenne ?',
    options: ['Franc', 'Pound', 'Euro', 'Couronne'],
    correctAnswer: 'Euro',
    difficulty: 'facile'
  },
  {
    category: 'Astronomie',
    text: 'Quel est le plus grand satellite de Jupiter ?',
    options: ['Europe', 'Ganymède', 'Io', 'Callisto'],
    correctAnswer: 'Ganymède',
    difficulty: 'difficile'
  },
  {
    category: 'Musique',
    text: 'Combien de cordes a une guitare classique ?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '6',
    difficulty: 'moyen'
  },
  {
    category: 'Médecine',
    text: 'Quel est le plus grand organe du corps humain ?',
    options: ['Cœur', 'Foie', 'Peau', 'Cerveau'],
    correctAnswer: 'Peau',
    difficulty: 'difficile'
  },
  {
    category: 'Géologie',
    text: 'Quel est le minéral le plus dur du monde ?',
    options: ['Quartz', 'Diamant', 'Rubis', 'Saphir'],
    correctAnswer: 'Diamant',
    difficulty: 'moyen'
  },
  {
    category: 'Histoire',
    text: 'En quelle année l\'homme a marché sur la Lune pour la première fois ?',
    options: ['1967', '1969', '1971', '1973'],
    correctAnswer: '1969',
    difficulty: 'moyen'
  },
  {
    category: 'Psychologie',
    text: 'Combien de lobes a le cerveau humain ?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    difficulty: 'difficile'
  },
  {
    category: 'Gastronomie',
    text: 'Quel pays est célèbre pour la production de champagne ?',
    options: ['Italie', 'Espagne', 'France', 'Allemagne'],
    correctAnswer: 'France',
    difficulty: 'facile'
  },
  {
    category: 'Technologie',
    text: 'Qui a inventé l\'ampoule électrique ?',
    options: ['Nikola Tesla', 'Alexander Graham Bell', 'Thomas Edison', 'Albert Einstein'],
    correctAnswer: 'Thomas Edison',
    difficulty: 'moyen'
  },
  {
    category: 'Botanique',
    text: 'Quel est l\'arbre le plus grand du monde ?',
    options: ['Séquoia géant', 'Épicéa de Sitka', 'Pin Bristlecone', 'Eucalyptus'],
    correctAnswer: 'Séquoia géant',
    difficulty: 'difficile'
  }
];

const seedDB = async () => {
  let connectedViaMemory = false
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI non défini')
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    console.log('✅ Connecté à MongoDB (MONGO_URI)');
  } catch (err) {
    console.warn('⚠️  Impossible de se connecter à Atlas :', err.message)
    console.log('🔁 Démarrage d\'une base MongoDB en mémoire pour le seeding...')
    try {
      const mongod = await MongoMemoryServer.create()
      const uri = mongod.getUri()
      await mongoose.connect(uri)
      connectedViaMemory = true
      console.log('✅ Connecté à MongoDB en mémoire (mongodb-memory-server)');
    } catch (memErr) {
      console.error('❌ Impossible de démarrer la base en mémoire :', memErr.message)
      process.exit(1)
    }
  }

  try {
    await Question.deleteMany({});
    console.log('🗑️  Collection Questions purgée');

    await Question.insertMany(questions);
    console.log(`✅ ${questions.length} questions insérées avec succès`);

    if (connectedViaMemory) {
      console.log('ℹ️  Seeding effectué sur la DB en mémoire (données volatiles).')
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding :', error.message || error);
    process.exit(1);
  }
}

seedDB();
