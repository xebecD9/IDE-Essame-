# 🚀 Guide du Débutant : Projet TaskFlow


Ce projey est compose de trois grands elements a savoir  :
- **Le Frontend (Dossier `client/`) :**  C'est la partie visible, jolie, sur laquelle l'utilisateur clique. Il est fabriqué avec **React**.
- **Le Backend (Dossier `server/`) :**  Le backend vérifie si c'est possible et prépare les données. Il est fabriqué avec **Node.js**.
- **La Base de Données (MongoDB Atlas) :** c'est la base de donnees ou sont stockes les donnees 

---

## 📁 Comprendre les dossiers et les fichiers

Voici l'explication de chaque fichier important :

### 1️⃣ (Frontend / React) - Dossier `client/`

* **`index.html`** : La page principale qui charge l'application dans le navigateur.
* **`package.json`** : La liste de tous les outils et bibliothèques (comme React) dont le projet a besoin.
* **`vite.config.js` / `eslint.config.js`** : Les fichiers de configuration pour construire le projet et vérifier la propreté du code.
* **`src/index.css`** : Le fichier qui contient tous les styles globaux (les couleurs, les polices, etc.).
* **`src/main.jsx`** : Le point de départ. Il prend toute ton application et l'affiche sur l'écran.
* **`src/App.jsx`** : Le chef d'orchestre ou le GPS. Il décide quelle page afficher selon l'URL.
* **`src/pages/Dashboard.jsx`** : La page d'accueil. C'est elle qui appelle l'API pour récupérer toutes les tâches.
* **`src/pages/TaskDetail.jsx`** : La page qui s'ouvre quand tu veux voir les détails d'une seule tâche ou la modifier.
* **`src/components/TaskCard.jsx`** : Le modèle d'une "petite carte" de tâche affichée sur l'accueil.
* **`src/components/TaskForm.jsx`** : Le formulaire pour créer une nouvelle tâche.
* **`src/components/Button.jsx` / `Input.jsx` / `StudentCard.jsx`** : Des petits composants réutilisables pour l'interface.
* **`src/layouts/Navbar.jsx`** : La barre de navigation affichée en haut du site.
* **`src/hooks/useLocalStorage.js`** : Un outil personnalisé (hook) pour sauvegarder des informations dans le navigateur de l'utilisateur.

### 2️⃣  (Backend / Node.js) - Dossier `server/`

* **`server.js`** : Le point d'entrée du serveur. Il écoute les requêtes, configure la sécurité et se connecte à la base de données MongoDB.
* **`package.json`** : Les dépendances du serveur (Express, Mongoose, etc.).
* **`models/Task.js`** : C'est le "moule" ou le "plan" d'une tâche. Il définit la structure des données (titre, description, statut) dans MongoDB.
* **`controllers/taskController.js`** : Contient la logique de l'application (les fonctions pour Créer, Lire, Mettre à jour et Supprimer des tâches).
* **`routes/taskRoutes.js`** : Le standardiste téléphonique. Il redirige les requêtes web vers la bonne fonction du contrôleur selon l'URL (ex: `/api/tasks`).
* **`.env`** : Le fichier contenant les variables secrètes, comme les mots de passe de la base de données. Ne doit jamais être partagé publiquement !

---

## 🛠 Comment allumer le projet ?

Puisque  (client) et (serveur) sont deux dossiers separes, il faut allumer les deux séparément pour que ça marche !

1. Ouvre un terminaldans ton éditeur.
2. Tape ces commandes   :
   ```bash
   cd mon_travail/taskflow/server
   npm run dev
   ```
   *Un message te dira que le serveur écoute sur le port 5000 et qu'il est connecté à MongoDB.*

3. Ouvre un DEUXIÈME terminal (pour ne pas fermer le premier).
4. Tape ces commandes  :
   ```bash
   cd mon_travail/taskflow/client
   npm run dev
   ```

5. C'est fini ! Le terminal te donnera un lien (généralement `http://localhost:5174/`). Clique dessus, et profite de ton application !
