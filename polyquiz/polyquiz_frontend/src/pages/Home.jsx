import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useUser} from '../contexts/UserContext';  

function Home() {
    const [pseudoInput, setPseudoInput] = useState('');
    const {login, authLoading, authError} = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedPseudo = pseudoInput.trim();
        if (trimmedPseudo) {
            const result = await login(trimmedPseudo);
            if (result.success) {
                navigate('/quiz');
            }
        }
    }

    return (
        <main Style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#0f0f11',
            padding: '20px',
        }}>
            <h1 Style={{
                color: '#e8e8f0',
                fontSize: '3rem',
                marginBottom: '0.5rem',
            }}>
                PolyQuiz
            </h1>
            <p Style={{
                color: '#888',
                marginBottom: '2rem',
            }}>
                Bienvenue sur la plateforme PolyQuiz !
            </p>
            <form onSubmit={handleSubmit} Style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '300px',
            }}>
                <input 
                    type="text"
                    placeholder="Entrez votre pseudo"
                    value={pseudoInput}
                    onChange={(e) => setPseudoInput(e.target.value)}
                    disabled={authLoading}
                    required 
                    style={{
                        padding: '0.75rem',
                        borderRadius:'8px',
                        border: '1px solid #2a2a35',
                        backgroundColor: '#16161e',
                        color: '#e8e8f0',
                        fontSize: '1rem',
                    }}/>
                {authError && (
                    <p style={{color: '#ff6b6b', fontSize: '0.9rem', margin: 0}}>
                        ❌ {authError}
                    </p>
                )}
                <button type="submit" disabled={authLoading} style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: authLoading ? '#5a4fb8' : '#7c6af7',
                    color: '#fff',
                    fontSize: '1rem',
                    cursor: authLoading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                }}>
                    {authLoading ? 'Connexion...' : 'Commencer le quiz'}
                </button>
            </form>
        </main>)
}

export default Home;