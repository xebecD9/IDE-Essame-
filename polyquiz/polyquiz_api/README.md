# PolyQuiz API

Backend Node.js / Express pour l'application PolyQuiz.

## Fonctionnalités

- Authentification JWT par pseudo
- Enregistrement automatique des utilisateurs
- Récupération des questions depuis MongoDB
- Enregistrement du meilleur score utilisateur
- Classement TOP 10 publique

## Installation

1. Ouvrir un terminal dans `polyquiz_api`
2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` 


4. Démarrer le serveur en mode développement :

```bash
npm run dev
```

5. Remplir la base de données :

```bash
npm run seed
```

## Scripts

- `npm start` : démarre le serveur en production
- `npm run dev` : démarre le serveur avec `nodemon`
- `npm run seed` : exécute le script d'insertion des questions

## Endpoints

- `POST /api/auth/login`
  - Corps : `{ "pseudo": "tonPseudo" }`
  - Retourne un token JWT et l'utilisateur

- `GET /api/questions`
  - Renvoie la liste de questions

- `POST /api/users/score`
  - Protégé par JWT
  - Corps : `{ "score": 80 }`
  - Met à jour le meilleur score si nécessaire

- `GET /api/leaderboard`
  - Renvoie le top 10 des meilleurs scores

## Notes

- La base `polyquiz` est créée automatiquement à la première insertion.
- Assure-toi que l'adresse du frontend (`FRONTEND_URL`) correspond à l'URL Vite.
