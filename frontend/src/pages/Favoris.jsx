import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoris } from '../context/FavorisContext';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

export default function Favoris() {
  const { favoris, toggleFavori } = useFavoris();
  const { addToCart } = useCart();
  const [hoveredId, setHoveredId] = useState(null);
  const [addedId, setAddedId] = useState(null);

  function handleAddToCart(product) {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  if (favoris.length === 0) {
    return (
      <div style={{ fontFamily: 'Georgia, serif' }}>
        <div style={{
          textAlign: 'center',
          padding: '100px 40px',
          background: 'var(--color-white)'
        }}>
          <div style={{ fontSize: '56px', marginBottom: '24px' }}>🤍</div>
          <h2 style={{
            fontWeight: 'normal',
            fontSize: '26px',
            color: 'var(--color-text)',
            marginBottom: '12px'
          }}>
            Aucun favori pour le moment
          </h2>
          <p style={{
            color: 'var(--color-text-light)',
            fontSize: '14px',
            marginBottom: '32px',
            lineHeight: '1.8'
          }}>
            Parcourez notre catalogue et cliquez sur ❤️ pour sauvegarder vos bijoux préférés.
          </p>
          <Link to="/catalogue" style={{
            background: 'var(--color-primary)',
            color: 'white',
            padding: '12px 36px',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Découvrir le catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{
        padding: '40px 40px 24px',
        background: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <h1 style={{
          fontWeight: 'normal',
          fontSize: '28px',
          color: 'var(--color-text)',
          marginBottom: '6px'
        }}>
          Mes Favoris
        </h1>
        <p style={{ color: 'var(--color-text-light)', fontSize: '14px' }}>
          {favoris.length} bijou{favoris.length > 1 ? 'x' : ''} sauvegardé{favoris.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille produits */}
      <div style={{
        padding: '40px',
        background: 'var(--color-background)',
        minHeight: '400px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {favoris.map(product => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                overflow: 'hidden',
                background: 'var(--color-white)',
                boxShadow: hoveredId === product.id
                  ? '0 8px 24px rgba(0,0,0,0.12)'
                  : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s',
                transform: hoveredId === product.id ? 'translateY(-4px)' : 'translateY(0)'
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden', background: 'var(--color-background)' }}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.4s',
                      transform: hoveredId === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
                    💍
                  </div>
                )}

                {/* Bouton retirer */}
                <button
                  onClick={() => toggleFavori(product)}
                  title="Retirer des favoris"
                  style={{
                    position: 'absolute', top: '10px', right: '10px',
                    width: '34px', height: '34px', borderRadius: '50%',
                    border: 'none', background: 'white',
                    color: '#8B2635', fontSize: '18px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  ❤️
                </button>
              </div>

              {/* Infos */}
              <div style={{ padding: '16px 18px 20px' }}>
                <h3 style={{
                  margin: '0 0 4px', fontSize: '15px',
                  fontWeight: 'normal', color: 'var(--color-text)'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: '16px', fontWeight: 'bold',
                  color: 'var(--color-primary)', margin: '0 0 14px'
                }}>
                  {product.price} €
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      flex: 1, padding: '9px 0',
                      background: addedId === product.id ? 'var(--color-primary)' : 'transparent',
                      color: addedId === product.id ? 'white' : 'var(--color-primary)',
                      border: '1px solid var(--color-primary)',
                      borderRadius: '4px', cursor: 'pointer',
                      fontFamily: 'Georgia, serif', fontSize: '12px',
                      letterSpacing: '0.5px', transition: 'all 0.2s'
                    }}
                  >
                    {addedId === product.id ? '✓ Ajouté' : 'Ajouter au panier'}
                  </button>
                  <button
                    onClick={() => toggleFavori(product)}
                    title="Retirer des favoris"
                    style={{
                      padding: '9px 12px',
                      background: 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px', cursor: 'pointer',
                      fontSize: '14px', color: '#999',
                      transition: 'all 0.2s'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
