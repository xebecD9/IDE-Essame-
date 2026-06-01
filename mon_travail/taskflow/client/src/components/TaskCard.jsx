import { Link } from 'react-router-dom';
function TaskCard({ task, onDelete }) {
  let statusBg, statusText;
  switch (task.status) {
    case 'A faire':
      statusBg = 'var(--status-todo-bg)';
      statusText = 'var(--status-todo-text)';
      break;
    case 'En cours':
      statusBg = 'var(--status-prog-bg)';
      statusText = 'var(--status-prog-text)';
      break;
    case 'Terminé':
      statusBg = 'var(--status-done-bg)';
      statusText = 'var(--status-done-text)';
      break;
    default:
      statusBg = '#eee';
      statusText = '#333';
  }
  return (
    <Link to={`/task/${task._id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
      {}
      <div className="card-header">
        {}
        <h3 className="card-title">{task.title}</h3>
        {}
        <button 
          className="delete-btn" 
          onClick={(e) => {
            e.preventDefault(); 
            onDelete(task._id);
          }}
          title="Supprimer la tâche"
        >
          🗑️
        </button>
      </div>
      {}
      <div className="card-footer">
        {}
        <span 
          className="status-badge" 
          style={{ backgroundColor: statusBg, color: statusText }}
        >
          {task.status}
        </span>
        {}
        <span className="task-id">ID: {task._id}</span>
      </div>
    </Link>
  );
}
export default TaskCard;
