require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const { getLeaderboard } = require('./controllers/userController');

const app = express();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.get('/api/leaderboard', getLeaderboard);

async function startServer() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI non défini');
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5001 });
    console.log('Connecté à MongoDB (polyquiz) via MONGO_URI');
  } catch (err) {
    console.error(' Erreur de connexion MongoDB :', err.message);
    console.log('Tentative de démarrage d\'une base MongoDB en mémoire (fallback)...');
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log(' Connecté à MongoDB en mémoire (mongodb-memory-server)');
    } catch (memErr) {
      console.error(' Impossible de démarrer la base en mémoire :', memErr.message);
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    console.log(` Serveur démarré sur http://localhost:${PORT}`);
  });
}

startServer();
