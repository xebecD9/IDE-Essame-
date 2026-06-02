# PolyQuiz Frontend

Application React / Vite pour jouer au quiz PolyQuiz.

## Fonctionnalités

- Page de login avec pseudo
- Authentification via token JWT
- Chargement des questions depuis l'API
- Envoi du score à l'API à la fin du quiz
- Page publique de leaderboard
- Navigation protégée pour le quiz et les résultats

## Installation

1. Ouvrir un terminal dans `polyquiz_frontend`
2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` avec :

```env
VITE_API_URL=http://localhost:5001
```

4. Démarrer l'application React :

```bash
npm run dev
```

## Scripts

- `npm run dev` : démarre l'application en développement
- `npm run build` : génère la version de production
- `npm run preview` : prévisualise la build de production

## Notes

- Le frontend se connecte à l'API via `VITE_API_URL`.
- Le token JWT est stocké dans `localStorage` et envoyé automatiquement dans les requêtes.
- Le leaderboard est public et consultable sans être connecté.

