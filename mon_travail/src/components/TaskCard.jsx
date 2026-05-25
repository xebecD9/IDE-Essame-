import { Link } from "react-router-dom";

function TaskCard({ task, onDelete }) {
    let statusBg, statusText;
    switch (task.statut) {
        case "A faire":
            statusBg = "var(--status-todo-bg)";
            statusText = "var(--status-todo-text)";
            break;
        case "En cours":
            statusBg = "var(--status-prog-bg)";
            statusText = "var(--status-prog-text)";
            break;
        case "Terminé":
            statusBg = "var(--status-done-bg)";
            statusText = "var(--status-done-text)";
            break;
        default:
            statusBg = "#eee";
            statusText = "#333";
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        if (onDelete) {
            onDelete(task.id);
        }
    };

    return (
        <Link to={`/task/${task.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
            <article className="card" style={{ height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <span className="status-badge" style={{ backgroundColor: statusBg, color: statusText, marginBottom: "0" }}>
                        {task.statut}
                    </span>
                    <button 
                        className="btn-danger" 
                        onClick={handleDeleteClick}
                        title="Supprimer la tâche"
                        style={{ padding: "0.2rem 0.5rem", borderRadius: "6px" }}
                    >
                        X
                    </button>
                </div>
                
                <h3 style={{ color: "var(--accent-wood)", margin: "0 0 0.5rem", fontSize: "1.2rem" }}>
                    {task.title}
                </h3>
                
                <p style={{ color: "var(--text-secondary)", margin: "0 0 1rem", fontSize: "0.95rem", flexGrow: 1 }}>
                    {task.description}
                </p>  

                <small style={{ color: "var(--text-secondary)", opacity: 0.7, fontSize: "0.8rem", marginTop: "auto" }}>
                    ID: {task.id}
                </small>
            </article>
        </Link> 
    );
}

export default TaskCard;
