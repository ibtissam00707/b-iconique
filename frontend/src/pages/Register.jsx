import { useState } from 'react';
import api from '../api';

function Register() {
  // useState gère les valeurs du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Met à jour le champ modifié dans formData
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Envoi du formulaire à Symfony
  async function handleSubmit(e) {
    e.preventDefault(); // empêche le rechargement de la page
    try {
      await api.post('/api/register', formData);
      setMessage('Compte créé avec succès ! Vous pouvez vous connecter.');
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'inscription. Vérifiez vos informations.');
      setMessage('');
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px',
      border: '1px solid #ddd', borderRadius: '12px' }}>
      <h2>Créer un compte</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error   && <p style={{ color: 'red'   }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label>Prénom</label><br/>
          <input type="text" name="firstName"
            value={formData.firstName} onChange={handleChange}
            required style={{ width: '100%', padding: '8px', marginTop: '4px' }}/>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Nom</label><br/>
          <input type="text" name="lastName"
            value={formData.lastName} onChange={handleChange}
            required style={{ width: '100%', padding: '8px', marginTop: '4px' }}/>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Email</label><br/>
          <input type="email" name="email"
            value={formData.email} onChange={handleChange}
            required style={{ width: '100%', padding: '8px', marginTop: '4px' }}/>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Mot de passe</label><br/>
          <input type="password" name="password"
            value={formData.password} onChange={handleChange}
            required style={{ width: '100%', padding: '8px', marginTop: '4px' }}/>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px',
          background: '#333', color: 'white', border: 'none',
          borderRadius: '8px', cursor: 'pointer' }}>
          S'inscrire
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        Déjà un compte ? <a href="/login">Se connecter</a>
      </p>
    </div>
  );
}

export default Register;