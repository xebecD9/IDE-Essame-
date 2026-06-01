//C'est ici que nous définissons le modèle de données pour les tâches. 
// Nous utilisons Mongoose pour créer un schéma de tâche qui inclut des champs tels que le titre, la description et le statut de la tâche. 
// Le champ _id est défini comme un nombre et est automatiquement incrémenté à chaque nouvelle tâche créée.
//  Le schéma inclut également des timestamps pour suivre la date de création et de mise à jour des tâches.
const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  _id: { type: Number },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'A faire' }
}, { 
  timestamps: true 
});
taskSchema.pre('save', async function () {
  if (this.isNew) {
    const lastTask = await this.constructor.findOne().sort({ _id: -1 });
    this._id = lastTask && lastTask._id ? lastTask._id + 1 : 1;
  }
});
module.exports = mongoose.model('Task', taskSchema);
