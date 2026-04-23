import { useState } from 'react';
import api from '../api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('/api/login', formData);

      // On stocke le token JWT dans le navigateur
      localStorage.setItem('token', response.data.token);

      // Redirection vers le catalogue
      window.location.href = '/';
    } catch (err) {
      setError('Email ou mot de passe incorrect.');
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px',
      border: '1px solid #ddd', borderRadius: '12px' }}>
      <h2>Se connecter</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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
          Se connecter
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        Pas encore de compte ? <a href="/register">S'inscrire</a>
      </p>
    </div>
  );
}

export default Login;