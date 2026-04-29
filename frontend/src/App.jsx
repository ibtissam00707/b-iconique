import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register';
import Panier from './pages/Panier';
import Admin from './pages/Admin';
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

      {/* Barre livraison */}
      <div style={{
        background: 'var(--color-primary)',
        color: 'white',
        textAlign: 'center',
        padding: '8px',
        fontSize: '12px',
        letterSpacing: '1px',
        fontFamily: 'Georgia, serif'
      }}>
        Livraison gratuite en France dès 35€ — Europe dès 50€
      </div>

      {/* Header */}
      <header style={{
        background: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border)',
      }}>

        {/* Logo + icônes */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 40px',
        }}>
          {/* Logo */}
          <Link to="/" style={{
            textDecoration: 'none',
            color: 'var(--color-primary)',
            fontSize: '26px',
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            letterSpacing: '3px'
          }}>
            B-Icônique
          </Link>

          {/* Icônes droite */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>

            {/* Lien Admin — visible seulement si connecté */}
            {token && (
              <Link to="/admin" style={{
                textDecoration: 'none',
                color: 'var(--color-primary)',
                fontSize: '13px',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold',
                border: '1px solid var(--color-primary)',
                padding: '6px 14px',
                borderRadius: '4px'
              }}>
                ⚙️ Admin
              </Link>
            )}

            {token ? (
              <button onClick={handleLogout} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                color: 'var(--color-text-light)',
                fontFamily: 'Georgia, serif',
              }}>
                Se déconnecter
              </button>
            ) : (
              <>
                <Link to="/login" style={{
                  textDecoration: 'none',
                  color: 'var(--color-text-light)',
                  fontSize: '13px',
                  fontFamily: 'Georgia, serif'
                }}>
                  Se connecter
                </Link>
                <Link to="/register" style={{
                  textDecoration: 'none',
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '7px 16px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontFamily: 'Georgia, serif'
                }}>
                  S'inscrire
                </Link>
              </>
            )}

            {/* Panier */}
            <Link to="/panier" style={{
              textDecoration: 'none',
              color: 'var(--color-text)',
              fontSize: '13px',
              fontFamily: 'Georgia, serif',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              position: 'relative'
            }}>
              🛒
              {cartCount > 0 && (
                <span style={{
                  background: 'var(--color-primary)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px'
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Menu navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '36px',
          padding: '10px 40px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-background)'
        }}>
          {[
            { label: 'Accueil', to: '/' },
            { label: 'Catalogue', to: '/catalogue' },
            { label: 'Colliers', to: '/catalogue?categorie=colliers' },
            { label: 'Bagues', to: '/catalogue?categorie=bagues' },
            { label: 'Bracelets', to: '/catalogue?categorie=bracelets' },
            { label: "Boucles d'oreilles", to: '/catalogue?categorie=boucles-oreilles' },
          ].map(item => (
            <Link key={item.label} to={item.to} style={{
              textDecoration: 'none',
              color: 'var(--color-text)',
              fontSize: '13px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.5px',
            }}>
              {item.label}
            </Link>
          ))}
        </nav>

      </header>

      {/* Pages */}
      <Routes>
        <Route path="/"          element={<Accueil />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/panier"    element={<Panier />} />
        <Route path="/admin"     element={<Admin />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

