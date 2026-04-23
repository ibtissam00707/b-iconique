import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register';
import Panier from './pages/Panier';
import { useCart } from './context/CartContext';

function App() {
  const token = localStorage.getItem('token');
  const { cartCount } = useCart();

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <BrowserRouter>
      <nav style={{
  padding: '16px 40px',
  borderBottom: '1px solid var(--color-border)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'var(--color-white)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
}}>
  <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-primary)',
    fontSize: '22px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
    B-Icônique 💍
  </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/panier" style={{ textDecoration: 'none', color: '#333' }}>
            🛒 Panier {cartCount > 0 && (
              <span style={{
                background: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 7px',
                fontSize: '12px',
                marginLeft: '4px'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          {token ? (
            <button onClick={handleLogout}
              style={{ background: 'none', border: '1px solid #333',
                padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/login">Se connecter</Link>
              <Link to="/register">S'inscrire</Link>
            </>
          )}
        </div>
      </nav>

      <div style={{ 
  padding: '40px', 
  fontFamily: 'Georgia, serif',
  background: 'var(--color-background)',
  minHeight: '100vh'
}}>
        <Routes>
          <Route path="/"        element={<Catalogue />} />
          <Route path="/login"   element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panier"  element={<Panier />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;