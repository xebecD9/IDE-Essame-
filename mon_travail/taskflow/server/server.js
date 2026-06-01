
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express'); 

const mongoose = require('mongoose'); 

const cors = require('cors'); 
require('dotenv').config(); 
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Connecté à MongoDB (La base de données est prête !)')) 
  .catch((err) => console.log(' Erreur de connexion MongoDB:', err)); 
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé et à l'écoute sur http://localhost:${PORT}`);
});
