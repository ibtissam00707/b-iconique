import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/login', formData);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (err) {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '6px',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    fontFamily: 'Georgia, serif',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none'
  };

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
      <h2 style={{
        color: 'var(--color-primary)',
        fontFamily: 'Georgia, serif',
        fontWeight: 'normal',
        fontSize: '24px',
        marginBottom: '8px'
      }}>
        Se connecter
      </h2>
      <p style={{
        color: 'var(--color-text-light)',
        fontSize: '13px',
        marginBottom: '28px'
      }}>
        Accédez à votre compte B-Icônique
      </p>

      {error && (
        <div style={{
          background: '#FDF2F4',
          border: '1px solid #E8B4BC',
          color: '#8B2635',
          padding: '10px 14px',
          borderRadius: '4px',
          fontSize: '13px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'var(--color-text)', fontSize: '14px' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="votre@email.com"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ color: 'var(--color-text)', fontSize: '14px' }}>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#C4738A' : 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Georgia, serif',
            fontSize: '15px',
            letterSpacing: '0.5px',
            transition: 'background 0.2s'
          }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <p style={{
        textAlign: 'center',
        marginTop: '24px',
        fontSize: '13px',
        color: 'var(--color-text-light)'
      }}>
        Pas encore de compte ?{' '}
        <Link to="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
          S'inscrire
        </Link>
      </p>
    </div>
  );
}

export default Login;
