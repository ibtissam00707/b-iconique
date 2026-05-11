import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register';
import Panier from './pages/Panier';
import Commande from './pages/Commande';
import Admin from './pages/Admin';
import Favoris from './pages/Favoris';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import PolitiqueRetour from './pages/PolitiqueRetour';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import CGU from './pages/CGU';
import Contact from './pages/Contact';

import { useCart, CartProvider } from './context/CartContext';
import { FavorisProvider } from './context/FavorisContext';

import { isAdmin, isLoggedIn } from './utils/auth';

function Navigation() {
  const navigate = useNavigate();
  const { cartCount, notification } = useCart();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#8B2635',
            color: 'white',
            padding: '14px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 9999
          }}
        >
          {notification}
        </div>
      )}

      <div
        style={{
          background: '#8B2635',
          color: 'white',
          textAlign: 'center',
          padding: '8px',
          fontSize: '12px',
          letterSpacing: '1px',
          fontFamily: 'Georgia, serif'
        }}
      >
        Livraison gratuite dès 50€ — 4.99€ en dessous — Europe uniquement
      </div>

      <header
        style={{
          background: 'white',
          borderBottom: '1px solid #E0D8D0'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 40px'
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#8B2635',
              fontSize: '26px',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
              letterSpacing: '3px'
            }}
          >
            B-Icônique
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            {isLoggedIn() ? (
              <>
                {isAdmin() ? (
                  <Link
                    to="/admin"
                    style={{
                      textDecoration: 'none',
                      color: '#8B2635',
                      fontSize: '13px',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 'bold',
                      border: '1px solid #8B2635',
                      padding: '6px 14px',
                      borderRadius: '4px'
                    }}
                  >
                    ⚙️ Dashboard Admin
                  </Link>
                ) : (
                  <Link
                    to="/favoris"
                    style={{
                      textDecoration: 'none',
                      color: '#8B2635',
                      fontSize: '13px',
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    ❤️ Mes Favoris
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#666',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: '#666',
                    fontSize: '13px',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  Se connecter
                </Link>

                <Link
                  to="/register"
                  style={{
                    textDecoration: 'none',
                    background: '#8B2635',
                    color: 'white',
                    padding: '7px 16px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  S'inscrire
                </Link>
              </>
            )}

            <Link
              to="/panier"
              style={{
                textDecoration: 'none',
                color: '#333',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🛒

              {cartCount > 0 && (
                <span
                  style={{
                    background: '#8B2635',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '36px',
            padding: '10px 40px',
            borderTop: '1px solid #E0D8D0',
            background: '#F5F0EB'
          }}
        >
          {[
            { label: 'Accueil', to: '/' },
            { label: 'Catalogue', to: '/catalogue' },
            { label: 'Colliers', to: '/catalogue?categorie=colliers' },
            { label: 'Bagues', to: '/catalogue?categorie=bagues' },
            { label: 'Bracelets', to: '/catalogue?categorie=bracelets' },
            { label: "Boucles d'oreilles", to: '/catalogue?categorie=boucles-d-oreilles' },
          ].map(item => (
            <Link
              key={item.label}
              to={item.to}
              style={{
                textDecoration: 'none',
                color: '#333',
                fontSize: '13px',
                fontFamily: 'Georgia, serif'
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavorisProvider>

          <Navigation />

          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/commande" element={<Commande />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/politique-retour" element={<PolitiqueRetour />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </FavorisProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;