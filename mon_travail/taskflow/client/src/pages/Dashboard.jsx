import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:5000/api/tasks";
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur serveur lors de la récupération");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []); 
  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(newTask), 
      });
      if (response.ok) {
        const savedTask = await response.json(); 
        setTasks([savedTask, ...tasks]);
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout", err);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks(tasks.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };
  return (
    <main className="container">
      {}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent-wood)', marginBottom: '1rem' }}>Nouvelle Tâche</h2>
        {}
        <TaskForm onAdd={handleAddTask} />
      </div>
      <div>
        <h2 style={{ color: 'var(--accent-wood)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Mes Tâches
          {}
          <span style={{ fontSize: '0.9rem', backgroundColor: 'var(--card-bg)', padding: '4px 12px', borderRadius: '20px', color: 'var(--text-secondary)' }}>
            {tasks.length} tâche(s)
          </span>
        </h2>
        {}
        {}
        {loading && <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Chargement de vos tâches...</p>}
        {}
        {error && <p style={{ color: "red", textAlign: "center" }}>Erreur : {error}</p>}
        {}
        {!loading && !error && tasks.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "var(--card-bg)", borderRadius: "12px", border: "1px dashed var(--card-border)" }}>
            <p style={{ color: "var(--text-secondary)", margin: 0 }}>Aucune tâche pour le moment. Créez-en une !</p>
          </div>
        )}
        {}
        <div className="task-grid">
          {}
          {tasks.map((task) => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onDelete={handleDeleteTask} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}
export default Dashboard;