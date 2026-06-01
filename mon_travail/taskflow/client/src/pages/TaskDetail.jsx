import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [isUpdating, setIsUpdating] = useState(false); 
    const [isEditing, setIsEditing] = useState(false); 
    const [editData, setEditData] = useState({ title: "", description: "", status: "" }); 
    useEffect(() => {
        fetch(`http://localhost:5000/api/tasks/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Tâche introuvable ou erreur réseau");
                return res.json(); 
            })
            .then(data => {
                setTask(data); 
                setEditData({ title: data.title, description: data.description || "", status: data.status });
                setLoading(false); 
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);
    const handleSave = async () => {
        if (!editData.title.trim()) {
            alert("Le titre est obligatoire.");
            return;
        }
        setIsUpdating(true); 
        try {
            const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            });
            if (!res.ok) throw new Error("Erreur lors de la mise à jour");
            const updatedTask = await res.json();
            setTask(updatedTask); 
            setIsEditing(false); 
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(false); 
        }
    };
    if (loading) return <div style={{ textAlign: "center", padding: "4rem" }}><h2>Chargement des détails...</h2></div>;
    if (error || !task) {
        return (
            <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)" }}>
                <h2>{error || "Tâche non trouvée"}</h2>
                <Link to="/" style={{ color: "var(--accent-green)", fontWeight: "600", textDecoration: "none" }}>
                    Retour à la liste des tâches
                </Link>
            </div>
        );
    }
    let statusBg, statusText;
    switch (task.status) {
        case "A faire": statusBg = "var(--status-todo-bg)"; statusText = "var(--status-todo-text)"; break;
        case "En cours": statusBg = "var(--status-prog-bg)"; statusText = "var(--status-prog-text)"; break;
        case "Terminé": statusBg = "var(--status-done-bg)"; statusText = "var(--status-done-text)"; break;
        default: statusBg = "#eee"; statusText = "#333";
    }
    const dateCreation = new Date(task.createdAt).toLocaleString("fr-FR");
    const dateMaj = new Date(task.updatedAt).toLocaleString("fr-FR");
    return (
        <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1rem" }}>
            {}
            <Link to="/" style={{ color: "var(--accent-green)", textDecoration: "none", display: "inline-block", marginBottom: "2rem", fontWeight: "600" }}>
                ← Retour à la liste des tâches
            </Link>
            <div className="card" style={{ padding: "3rem", cursor: "default", transform: "none", boxShadow: "0 8px 30px rgba(139, 107, 80, 0.08)" }}>
                {}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.5rem" }}>
                    <span className="status-badge" style={{ backgroundColor: statusBg, color: statusText, margin: 0 }}>
                        {task.status}
                    </span>
                    {}
                    {!isEditing ? (
                        <button 
                            onClick={() => setIsEditing(true)}
                            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#3498db', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                            ✏️ Modifier
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => {
                                    setIsEditing(false); 
                                    setEditData({ title: task.title, description: task.description || "", status: task.status });
                                }}
                                disabled={isUpdating} 
                                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: 'white', cursor: isUpdating ? 'wait' : 'pointer', fontWeight: 'bold' }}>
                                Annuler
                            </button>
                            <button 
                                onClick={handleSave} 
                                disabled={isUpdating}
                                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--accent-green)', color: 'white', cursor: isUpdating ? 'wait' : 'pointer', fontWeight: 'bold' }}>
                                {isUpdating ? 'Sauvegarde...' : '💾 Sauvegarder'}
                            </button>
                        </div>
                    )}
                </div>
                {}
                {isEditing ? (
                    <div style={{ marginBottom: '2rem', backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
                        {}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "0.4rem" }}>Titre de la tâche</label>
                            <input 
                                type="text" 
                                value={editData.title}
                                onChange={(e) => setEditData({...editData, title: e.target.value})}
                                style={{ width: '100%', padding: '10px', fontSize: '1.2rem', borderRadius: '8px', border: '1px solid var(--card-border)', boxSizing: 'border-box' }}
                            />
                        </div>
                        {}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "0.4rem" }}>Statut</label>
                            <select 
                                value={editData.status}
                                onChange={(e) => setEditData({...editData, status: e.target.value})}
                                style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', boxSizing: 'border-box', backgroundColor: 'white' }}
                            >
                                <option value="A faire">A faire</option>
                                <option value="En cours">En cours</option>
                                <option value="Terminé">Terminé</option>
                            </select>
                        </div>
                        {}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "0.4rem" }}>Description</label>
                            <textarea 
                                value={editData.description}
                                onChange={(e) => setEditData({...editData, description: e.target.value})}
                                rows={4}
                                style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' }}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 style={{ color: "var(--accent-wood)", margin: "0 0 1.5rem", fontSize: "2.2rem", lineHeight: "1.2" }}>
                            {task.title}
                        </h1>
                        <hr style={{ border: "none", borderTop: "1px solid var(--card-border)", marginBottom: "2rem" }} />
                        <div style={{ marginBottom: "1.5rem" }}>
                            <span style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                                Description
                            </span>
                            <p style={{ color: "var(--text-primary)", margin: "0", fontSize: "1.05rem", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
                                {task.description || "Aucune description fournie."}
                            </p>
                        </div>
                    </>
                )}
                <hr style={{ border: "none", borderTop: "1px solid var(--card-border)", marginBottom: "2rem" }} />
                {}
                {[
                    { label: "Identifiant de la tâche", value: task._id },
                    { label: "Créée le", value: dateCreation },
                    { label: "Dernière modification", value: dateMaj },
                ].map(({ label, value }) => (
                    <div key={label} style={{ marginBottom: "1.5rem" }}>
                        <span style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                            {label}
                        </span>
                        <p style={{ color: "var(--text-primary)", margin: "0", fontSize: "1.05rem", lineHeight: "1.5" }}>
                            {value}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
export default TaskDetail;
