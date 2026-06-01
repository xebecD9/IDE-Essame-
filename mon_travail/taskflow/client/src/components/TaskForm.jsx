import { useState } from 'react';
function TaskForm({ onAdd }) {
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [status, setStatus] = useState('A faire'); 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Le titre est obligatoire");
      return;
    }
    onAdd({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('A faire');
  };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {}
      <div className="form-group">
        <label>Titre de la tâche *</label>
        <input 
          type="text" 
          placeholder="Ex: Faire les courses..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      {}
      <div className="form-group">
        <label>Statut</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
        >
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
      </div>
      {}
      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label>Description (optionnelle)</label>
        <textarea 
          placeholder="Détails de la tâche..."
          rows="3"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      {}
      <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
        <button type="submit" className="btn btn-primary">
          + Ajouter la tâche
        </button>
      </div>
    </form>
  );
}
export default TaskForm;
