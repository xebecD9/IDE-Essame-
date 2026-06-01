//ce fichier définit les routes pour les opérations liées aux tâches. 
// Il utilise Express pour créer des routes qui correspondent aux différentes opérations CRUD (Create, Read, Update, Delete) pour les tâches. 
// Chaque route est associée à une fonction du contrôleur de tâches qui gère la logique métier pour cette opération spécifique.
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
module.exports = router;
