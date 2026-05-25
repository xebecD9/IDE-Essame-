import { useState } from 'react';

const EMPTY_FORM = {
    title: "",
    description: "",
    statut: "A faire",
};

function TaskForm({ onAddTask }) {
    const [formData, setFormData] = useState(EMPTY_FORM);
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.title.trim() === "") return;
       
        const newTask = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            statut: formData.statut,
        };

        onAddTask(newTask);
        setFormData(EMPTY_FORM);
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ gap: "1rem", maxWidth: "500px", marginBottom: "2rem" }}>
            <h2 style={{ margin: "0 0 0.5rem", color: "var(--accent-wood)", fontSize: "1.2rem" }}>Ajouter une nouvelle tâche</h2>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titre de la tâche"
                className="input"
            />

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description de la tâche"
                className="textarea"
            />

            <select
                name="statut"
                value={formData.statut} 
                onChange={handleChange}
                className="select"
            >
                <option value="A faire">A faire</option> 
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
            </select>  

            <button type="submit" className="btn" style={{ marginTop: "0.5rem" }}>
                Ajouter la tâche
            </button>
        </form>
    );
}

export default TaskForm;
