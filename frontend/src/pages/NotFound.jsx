import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      textAlign: 'center', padding: '100px 40px',
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '24px' }}>💍</div>
      <h1 style={{ fontWeight: 'normal', fontSize: '48px', color: 'var(--color-primary)', marginBottom: '16px' }}>
        404
      </h1>
      <p style={{ fontSize: '18px', color: 'var(--color-text-light)', marginBottom: '32px' }}>
        Cette page n'existe pas.
      </p>
      <Link to="/" style={{
        background: 'var(--color-primary)', color: 'white',
        padding: '12px 32px', textDecoration: 'none',
        borderRadius: '4px', fontSize: '14px', fontFamily: 'Georgia, serif'
      }}>
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;

