import { useState } from 'react';
import api from '../api';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/api/register', formData);
      setMessage('Compte créé avec succès ! Redirection...');
      setError('');
      setTimeout(() => { window.location.href = '/login'; }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message;
      setError(msg || 'Erreur lors de l\'inscription. Vérifiez vos informations.');
      setMessage('');
    }
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '40px',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      background: 'var(--color-white)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ color: 'var(--color-primary)', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>
        Créer un compte
      </h2>

      {message && <p style={{ color: 'green', marginBottom: '12px' }}>{message}</p>}
      {error   && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'var(--color-text)', fontSize: '14px' }}>Prénom</label><br/>
          <input type="text" name="firstName"
            value={formData.firstName} onChange={handleChange}
            required style={{
              width: '100%', padding: '10px', marginTop: '6px',
              border: '1px solid var(--color-border)', borderRadius: '4px',
              fontFamily: 'Georgia, serif', boxSizing: 'border-box'
            }}/>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'var(--color-text)', fontSize: '14px' }}>Nom</label><br/>
          <input type="text" name="lastName"
            value={formData.lastName} onChange={handleChange}
            required style={{
              width: '100%', padding: '10px', marginTop: '6px',
              border: '1px solid var(--color-border)', borderRadius: '4px',
              fontFamily: 'Georgia, serif', boxSizing: 'border-box'
            }}/>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'var(--color-text)', fontSize: '14px' }}>Email</label><br/>
          <input type="email" name="email"
            value={formData.email} onChange={handleChange}
            required style={{
              width: '100%', padding: '10px', marginTop: '6px',
              border: '1px solid var(--color-border)', borderRadius: '4px',
              fontFamily: 'Georgia, serif', boxSizing: 'border-box'
            }}/>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: 'var(--color-text)', fontSize: '14px' }}>Mot de passe</label><br/>
          <input type="password" name="password"
            value={formData.password} onChange={handleChange}
            required style={{
              width: '100%', padding: '10px', marginTop: '6px',
              border: '1px solid var(--color-border)', borderRadius: '4px',
              fontFamily: 'Georgia, serif', boxSizing: 'border-box'
            }}/>
        </div>
        <button type="submit" style={{
          width: '100%', padding: '12px',
          background: 'var(--color-primary)',
          color: 'white', border: 'none',
          borderRadius: '4px', cursor: 'pointer',
          fontFamily: 'Georgia, serif',
          fontSize: '16px', letterSpacing: '0.5px'
        }}>
          S'inscrire
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--color-text-light)' }}>
        Déjà un compte ? <a href="/login" style={{ color: 'var(--color-primary)' }}>Se connecter</a>
      </p>
    </div>
  );
}

export default Register;