# PolyQuiz 🌿

Une application web de quiz interactif avec un système de score, des questions triées par difficulté et un leaderboard. Le projet est divisé en deux parties: une API backend (Node.js/Express) et une interface frontend (React/Vite).

---

## 📁 Structure du Projet

```
polyquiz/
├── polyquiz_api/       # Backend - API REST
└── polyquiz_frontend/  # Frontend - Interface utilisateur
```

---

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** (v16+)
- **MongoDB Atlas** (base de données cloud)
- **npm** ou **yarn**

### 1. Configuration Backend

```bash
cd polyquiz_api

# Installer les dépendances
npm install

# Créer un fichier .env avec:
PORT=5001
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/polyquiz?ssl=true...
JWT_SECRET=votre_secret_jwt
FRONTEND_URL=http://localhost:5175

# Charger les questions de départ (25 questions)
npm run seed

# Démarrer le serveur
npm run dev
```

Le serveur sera disponible sur: `http://localhost:5001`

### 2. Configuration Frontend

```bash
cd polyquiz_frontend

# Installer les dépendances
npm install

# Créer un fichier .env avec:
VITE_API_URL=http://localhost:5001

# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur: `http://localhost:5175`

---

## 📋 polyquiz_api (Backend)

### Description
API REST Node.js/Express qui gère:
- ✅ Authentification (JWT)
- ✅ Gestion des utilisateurs
- ✅ Récupération des questions
- ✅ Stockage des scores
- ✅ Leaderboard

### Structure

```
polyquiz_api/
├── controllers/
│   ├── authController.js          # Gestion login/register
│   ├── questionController.js      # Récupération des questions
│   └── userController.js          # Gestion des utilisateurs
├── models/
│   ├── Question.js                # Schéma Question MongoDB
│   └── User.js                    # Schéma User MongoDB
├── routes/
│   ├── authRoutes.js              # Routes d'authentification
│   ├── questionRoutes.js          # Routes des questions
│   └── userRoutes.js              # Routes utilisateur
├── middlewares/                    # Middleware (si besoin)
├── server.js                       # Point d'entrée
├── seed.js                         # Script de initialisation BD
└── package.json
```

### Endpoints API

#### Authentification
- **POST** `/api/auth/login`
  - Body: `{ pseudo: "username" }`
  - Response: `{ token, user: { pseudo, bestScore } }`
  - Description: Crée ou connecte un utilisateur

#### Questions
- **GET** `/api/questions`
  - Response: Array de 25 questions triées par difficulté
  - Structure question:
    ```json
    {
      "_id": "id",
      "category": "Général",
      "text": "Question?",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "option1",
      "difficulty": "facile" // ou "moyen", "difficile"
    }
    ```

#### Utilisateurs
- **POST** `/api/users/score`
  - Header: `Authorization: Bearer token`
  - Body: `{ score }`
  - Description: Enregistre le score de l'utilisateur

- **GET** `/api/leaderboard`
  - Response: Top 10 des meilleurs scores
  - Description: Récupère le classement global

### Modèles de Données

#### User Schema
```javascript
{
  pseudo: String (unique, lowercase),
  bestScore: Number (défaut: 0),
  createdAt: Date
}
```

#### Question Schema
```javascript
{
  category: String,
  text: String,
  options: [String],
  correctAnswer: String,
  difficulty: String ('facile', 'moyen', 'difficile')
}
```

### Dépendances Principales
- **express**: Framework web
- **mongoose**: ODM MongoDB
- **jsonwebtoken**: Gestion des tokens JWT
- **cors**: Gestion des requêtes cross-origin
- **dotenv**: Variables d'environnement
- **mongodb-memory-server**: BD en mémoire (fallback)

---

## 🎨 polyquiz_frontend (Frontend)

### Description
Interface React/Vite pour:
- 📝 Authentification utilisateur
- 🎯 Jouer au quiz
- 📊 Voir les résultats
- 🏆 Consulter le leaderboard

### Structure

```
polyquiz_frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Page d'accueil (login)
│   │   ├── QuizEngine.jsx        # Moteur du quiz
│   │   ├── resultats.jsx         # Affichage des résultats
│   │   ├── Leaderboard.jsx       # Classement global
│   │   └── NotFound.jsx          # Page 404
│   ├── components/               # Composants réutilisables
│   ├── contexts/
│   │   └── UserContext.jsx       # Gestion état utilisateur
│   ├── hooks/
│   │   └── useFetch.js           # Hook pour requêtes API
│   ├── reducers/
│   │   └── quizReducer.js        # Reducer du quiz
│   ├── App.jsx                   # Composant principal
│   └── main.jsx                  # Point d'entrée
├── vite.config.js
├── package.json
└── .env
```

### Flux de l'Application

```
Home.jsx (Login)
    ↓ (valide pseudo)
QuizEngine.jsx (Questions)
    ↓ (25 questions)
resultats.jsx (Score final)
    ↓ (choix)
    ├→ Rejouer → Home
    └→ Leaderboard → Leaderboard.jsx
```

### Composants Clés

#### Home.jsx
- Page d'accueil avec formulaire de login
- Appelle `useUser().login()` pour authentification
- Redirige vers `/quiz`

#### QuizEngine.jsx
- Affiche une question à la fois
- 25 questions triées par difficulté (facile → moyen → difficile)
- Badge de difficulté pour chaque question
- Timer de 60 secondes
- **Système de feedback immédiat**:
  - ✅ Affiche "Bonne réponse!" en vert
  - ❌ Affiche "Mauvaise réponse!" + la bonne réponse en rouge
  - Bouton "Question suivante" pour continuer
- Gestion avec `useReducer` (quizReducer)

#### resultats.jsx
- Affiche le score final sur 25
- Notation alphabétique: A (90%), B (75%), C (60%), D (45%), F (<45%)
- Taux de réussite en pourcentage
- Meilleur score enregistré
- Boutons: "Rejouer" ou "Voir le leaderboard"

#### Leaderboard.jsx
- Affiche top 10 global
- Récupère de l'API `/api/leaderboard`
- Affiche pseudo, score, date

### Contexte Utilisateur (UserContext.jsx)

Gère globalement:
- `pseudo`: Nom d'utilisateur
- `token`: JWT du serveur
- `login()`: Authentification
- `logout()`: Déconnexion
- `meilleureScore`: Meilleur score
- `authLoading`, `authError`: États d'authentification

### Hook Personnalisé (useFetch.js)

```javascript
const { data, loading, error } = useFetch('/api/questions')
```

- Récupère les données de l'API
- Ajoute automatiquement le token JWT si connecté
- Gère les états loading/error

### Reducer (quizReducer.js)

Actions:
- `START_QUIZ`: Initialise le quiz
- `ANSWER_QUESTION`: Enregistre la réponse + affiche feedback
- `NEXT_QUESTION`: Passe à la question suivante
- `FINISH_QUIZ`: Termine le quiz

États:
- `questionIndex`: Index actuel
- `score`: Score cumulé
- `feedback`: Info réponse (correcte/incorrecte)
- `statut`: 'en_attente', 'en_cours', 'termine'

### Dépendances Principales
- **react**: Framework UI
- **react-router-dom**: Navigation
- **vite**: Build tool
- **axios**: Requêtes HTTP (optionnel, utilise fetch)

---

## 🔧 Workflow Développement

### Ajouter une nouvelle question
1. Éditer `seed.js` (ajouter l'objet question)
2. Exécuter `npm run seed` dans `polyquiz_api`
3. Les questions sont automatiquement triées par difficulté

### Modifier le timer du quiz
1. Éditer `QuizEngine.jsx` (ligne 11): `const [tempsRestant, setTempsRestant] = useState(60)`
2. Changer 60 par le nombre de secondes désiré

### Ajouter une nouvelle page
1. Créer le composant dans `pages/`
2. Ajouter la route dans `App.jsx` (routing React Router)
3. Naviguer avec `useNavigate()`

---

## 🐛 Dépannage

### "Impossible de connecter à MongoDB Atlas"
- ✅ Vérifier que l'IP est whitelistée sur MongoDB Atlas
- ✅ Vérifier `MONGO_URI` dans `.env`
- ✅ Le fallback utilise une BD en mémoire (données perdues au redémarrage)

### "Erreur d'authentification"
- ✅ Vérifier que le serveur API démarre sur le port 5001
- ✅ Vérifier que `VITE_API_URL` pointe vers `http://localhost:5001`

### "Les questions ne s'affichent pas"
- ✅ Vérifier que `npm run seed` a été exécuté
- ✅ Vérifier que MongoDB a les 25 questions
- ✅ Vérifier la console du navigateur (F12) pour les erreurs API

---

## 📊 Progression du Quiz

```
Facile (10 questions)    ⭐
    ↓
Moyen (8 questions)      ⭐⭐
    ↓
Difficile (7 questions)  ⭐⭐⭐
    ↓
Résultats finaux
```

---

## 💡 Points Clés de l'Architecture

✅ **Séparation frontend/backend**: Permet évolutivité
✅ **JWT pour l'auth**: Stateless, scalable
✅ **Tri par difficulté**: Progression naturelle
✅ **Feedback immédiat**: UX améliorée
✅ **Leaderboard global**: Gamification
✅ **MongoDB Atlas**: Persistance données

---

## 📝 Licence

MIT

---

**Questions? Consultez les fichiers source ou les commentaires du code!** 🚀
