import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  // Vérifie si un token existe → utilisateur connecté
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <BrowserRouter>
      {/* Barre de navigation */}
      <nav style={{ padding: '16px 40px', borderBottom: '1px solid #ddd',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333',
          fontSize: '20px', fontWeight: 'bold' }}>
          B-Icônique 💍
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
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

      {/* Pages */}
      <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <Routes>
          <Route path="/"         element={<Catalogue />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;