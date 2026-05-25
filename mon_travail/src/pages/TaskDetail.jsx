import { useParams, Link } from "react-router-dom";

function TaskDetail() {
    const { id } = useParams();
    let taskList = [];
    try {
        const saved = localStorage.getItem("tasks");
        if (saved) taskList = JSON.parse(saved);
    } catch (e) {
        console.error("Erreur de lecture des tâches", e);
    }
    
    const task = taskList.find((t) => t.id === parseInt(id, 10));

    if (!task) {
        return (
            <div style={{
                textAlign: "center",
                padding: "4rem",
                color: "var(--text-secondary)",
            }}>
                <h2>Tâche non trouvée</h2>
                <Link to="/" style={{ color: "var(--accent-green)", fontWeight: "600", textDecoration: "none" }}>
                    Retour à la liste des tâches
                </Link>
            </div>
        );
    }

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
    
    let dateCreation;
    if (task.createdAt) {
        dateCreation = new Date(task.createdAt).toLocaleString("fr-FR");
    } else if (task.id > 1000000000) {
        // Fallback for tasks created before this fix
        dateCreation = new Date(task.id).toLocaleString("fr-FR");
    } else {
        dateCreation = `tâche initiale #${task.id}`;
    }
        
    return (
        <main style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "3rem 1rem",
        }}>
            <Link to="/" style={{ color: "var(--accent-green)", textDecoration: "none", display: "inline-block", marginBottom: "2rem", fontWeight: "600" }}>
                ← Retour à la liste des tâches
            </Link>
            <div className="card" style={{ padding: "3rem", cursor: "default", transform: "none", boxShadow: "0 8px 30px rgba(139, 107, 80, 0.08)" }}>
                <div>
                    <span className="status-badge" style={{ backgroundColor: statusBg, color: statusText, marginBottom: "1.5rem" }}>
                        {task.statut}
                    </span>  
                </div>
                
                <h1 style={{
                    color: "var(--accent-wood)",
                    margin: "0 0 1.5rem",
                    fontSize: "2.2rem",
                    lineHeight: "1.2",
                }}>{task.title}</h1>
                
                <hr style={{  
                    border: "none",
                    borderTop: "1px solid var(--card-border)",
                    marginBottom: "2rem",
                }} />
                
                {[
                    { label: "Description", value: task.description || "--" },
                    { label: "Statut", value: task.statut },
                    { label: "Identifiant", value: task.id },
                    { label: "Date de création", value: dateCreation },
                ].map(({ label, value }) => (
                    <div key={label} style={{
                        marginBottom: "1.5rem",
                    }}>
                        <span style={{
                            display: "block",
                            color: "var(--text-secondary)",
                            fontSize: "0.8rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: "0.4rem",
                        }}>
                            {label}
                        </span>
                        <p style={{
                            color: "var(--text-primary)",
                            margin: "0",
                            fontSize: "1.05rem",
                            lineHeight: "1.5",
                        }}>
                            {value}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default TaskDetail;
