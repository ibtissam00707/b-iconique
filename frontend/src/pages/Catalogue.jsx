import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import { useFavoris } from '../context/FavorisContext';
import { isLoggedIn } from '../utils/auth';

function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart, notification } = useCart();
  const { toggleFavori, isFavori } = useFavoris();
  const [searchParams] = useSearchParams();
  const categorieFiltre = searchParams.get('categorie');

  useEffect(() => {
    api.get('/api/products')
      .then((response) => {
        setProducts(response.data);
        const initialQty = {};
        response.data.forEach(p => { initialQty[p.id] = 1; });
        setQuantities(initialQty);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur :', error);
        setLoading(false);
      });
  }, []);

  const produitsFiltres = categorieFiltre
    ? products.filter(p =>
        p.category?.toLowerCase().normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/['\s]/g, "-") === categorieFiltre.toLowerCase()
      )
    : products;

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'Georgia, serif', color: 'var(--color-text-light)' }}>
      Chargement...
    </div>
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'Georgia, serif' }}>

      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--color-primary)',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'Georgia, serif',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          ✓ {notification}
        </div>
      )}

      <h1 style={{
        color: 'var(--color-text)',
        fontWeight: 'normal',
        fontSize: '32px',
        marginBottom: '4px',
        textAlign: 'center'
      }}>
        {categorieFiltre
          ? categorieFiltre.charAt(0).toUpperCase() + categorieFiltre.slice(1).replace(/-/g, ' ')
          : 'Tous nos bijoux'}
      </h1>

      <p style={{
        color: 'var(--color-text-light)',
        fontSize: '14px',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        {produitsFiltres.length} article{produitsFiltres.length > 1 ? 's' : ''}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {[
          { label: 'Tous', slug: null },
          { label: 'Colliers', slug: 'colliers' },
          { label: 'Bagues', slug: 'bagues' },
          { label: 'Bracelets', slug: 'bracelets' },
          { label: "Boucles d'oreilles", slug: 'boucles-oreilles' },
        ].map(cat => {
          const isActive = cat.slug === categorieFiltre || (!cat.slug && !categorieFiltre);
          return (
            <a
              key={cat.label}
              href={cat.slug ? `/catalogue?categorie=${cat.slug}` : '/catalogue'}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: 'Georgia, serif',
                background: isActive ? 'var(--color-primary)' : 'transparent',
                color: isActive ? 'white' : 'var(--color-text)',
                border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
              }}
            >
              {cat.label}
            </a>
          );
        })}
      </div>

      {produitsFiltres.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-light)' }}>
          <p style={{ fontSize: '18px', marginBottom: '16px' }}>Aucun produit dans cette catégorie.</p>
          <a href="/catalogue" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
            Voir tous les produits
          </a>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '28px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {produitsFiltres.map((product) => (
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

              <div style={{ width: '100%', height: '260px', overflow: 'hidden', position: 'relative', background: 'var(--color-background)' }}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s',
                      transform: hoveredId === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
                    💍
                  </div>
                )}

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'white',
                  color: 'var(--color-text-light)',
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '20px',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.5px'
                }}>
                  {product.category}
                </div>

                {isLoggedIn() && (
                  <button
                    onClick={() => toggleFavori(product)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'white',
                      color: isFavori(product.id) ? '#8B2635' : '#ccc',
                      fontSize: '20px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    {isFavori(product.id) ? '❤️' : '🤍'}
                  </button>
                )}
              </div>

              <div style={{ padding: '16px 18px 20px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 'normal', color: 'var(--color-text)' }}>
                  {product.name}
                </h3>

                <p style={{ color: 'var(--color-text-light)', fontSize: '12px', marginBottom: '12px', lineHeight: '1.5' }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    {product.price} €
                  </span>
                  <span style={{ fontSize: '11px', color: product.stock > 5 ? '#27ae60' : '#e74c3c' }}>
                    {product.stock > 5 ? '✓ En stock' : `Plus que ${product.stock} !`}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>Quantité :</span>

                  <button
                    onClick={() => setQuantities(prev => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] || 1) - 1) }))}
                    style={{
                      width: '26px',
                      height: '26px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    −
                  </button>

                  <span style={{ fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>
                    {quantities[product.id] || 1}
                  </span>

                  <button
                    onClick={() => setQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] || 1) + 1 }))}
                    style={{
                      width: '26px',
                      height: '26px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantities[product.id] || 1)}
                  style={{
                    width: '100%',
                    padding: '11px',
                    background: hoveredId === product.id ? 'var(--color-primary)' : 'transparent',
                    color: hoveredId === product.id ? 'white' : 'var(--color-primary)',
                    border: '1px solid var(--color-primary)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    fontSize: '13px',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s'
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogue;