import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import useLocalStorage from '../hooks/useLocalStorage';

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Conception de l'ontologie",
    description: "Rédiger les axiomes de base du domaine.",
    statut: "A faire",
  },
  {
    id: 2,
    title: "Extraction de connaissances",
    description: "Utiliser des techniques de text mining pour extraire des faits.",
    statut: "En cours",
  },
  {
    id: 3,
    title: "Validation de l'ontologie",
    description: "Vérifier la cohérence et la complétude de l'ontologie.",
    statut: "Terminé",
  }
];

function Dashboard() {
  const [tasks, setTasks] = useLocalStorage('tasks', INITIAL_TASKS);

  const handleAddTask = (newTask) => {
    setTasks((prev) => {
      const nextId = prev.length > 0 ? prev.reduce((max, t) => Math.max(max, t.id), 0) + 1 : 1;
      return [...prev, { ...newTask, id: nextId, createdAt: Date.now() }];
    });
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      setTasks((prev) => prev.filter(t => t.id !== id));
    }
  };

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: 'var(--accent-wood)', marginBottom: '1.5rem' }}>Tableau de bord de création des ontologies</h1>
      
      <TaskForm onAddTask={handleAddTask} />
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        margin: '2rem 0' 
      }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>{tasks.length} tâche(s)</p>
    </main>
  );
}

export default Dashboard;
      