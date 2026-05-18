import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import { useFavoris } from '../context/FavorisContext';
import { isLoggedIn } from '../utils/auth';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavori, isFavori } = useFavoris();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then(res => { setProduct(res.data); setLoading(false); })
      .catch(() => { setLoading(false); navigate('/catalogue'); });
  }, [id]);

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'Georgia, serif', color: 'var(--color-text-light)' }}>
      Chargement...
    </div>
  );

  if (!product) return null;

  return (
    <div style={{ padding: '40px', fontFamily: 'Georgia, serif', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Fil d'Ariane */}
      <nav style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '32px' }}>
        <a href="/" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Accueil</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <a href="/catalogue" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Catalogue</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>

        {/* Image */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%', paddingBottom: '100%', position: 'relative',
            borderRadius: '8px', overflow: 'hidden', background: 'var(--color-background)',
            border: '1px solid var(--color-border)'
          }}>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px'
              }}>
                💍
              </div>
            )}
          </div>

          {isLoggedIn() && (
            <button
              onClick={() => toggleFavori(product)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '44px', height: '44px', borderRadius: '50%',
                border: 'none', background: 'white',
                color: isFavori(product.id) ? '#8B2635' : '#ccc',
                fontSize: '22px', cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {isFavori(product.id) ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        {/* Infos produit */}
        <div>
          {product.category && (
            <span style={{
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--color-text-light)', display: 'block', marginBottom: '12px'
            }}>
              {product.category}
            </span>
          )}

          <h1 style={{ fontWeight: 'normal', fontSize: '32px', color: 'var(--color-text)', margin: '0 0 16px', lineHeight: 1.3 }}>
            {product.name}
          </h1>

          <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-primary)', margin: '0 0 24px' }}>
            {parseFloat(product.price).toFixed(2)} €
          </p>

          {product.description && (
            <p style={{ color: 'var(--color-text-light)', fontSize: '14px', lineHeight: '1.8', margin: '0 0 28px' }}>
              {product.description}
            </p>
          )}

          {/* Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{
              display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
              background: product.stock > 5 ? '#27ae60' : product.stock > 0 ? '#e67e22' : '#e74c3c'
            }} />
            <span style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>
              {product.stock > 5 ? 'En stock' : product.stock > 0 ? `Plus que ${product.stock} en stock` : 'Rupture de stock'}
            </span>
          </div>

          {/* Quantité */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>Quantité :</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: '36px', height: '36px', border: 'none', background: 'var(--color-background)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >−</button>
              <span style={{ width: '40px', textAlign: 'center', fontSize: '15px' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                style={{ width: '36px', height: '36px', border: 'none', background: 'var(--color-background)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >+</button>
            </div>
          </div>

          {/* Bouton panier */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              width: '100%', padding: '16px',
              background: added ? '#27ae60' : 'var(--color-primary)',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif', fontSize: '15px',
              letterSpacing: '1px', transition: 'background 0.3s',
              marginBottom: '12px'
            }}
          >
            {added ? '✓ Ajouté au panier !' : '🛒 Ajouter au panier'}
          </button>

          <button
            onClick={() => navigate('/catalogue')}
            style={{
              width: '100%', padding: '12px', background: 'transparent',
              color: 'var(--color-text-light)', border: '1px solid var(--color-border)',
              borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '13px'
            }}
          >
            ← Retour au catalogue
          </button>

          {/* Garanties */}
          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: '🚚', text: 'Livraison Europe — gratuite dès 50 €' },
              { icon: '↩️', text: 'Retours acceptés sous 14 jours' },
              { icon: '🔒', text: 'Acier inoxydable 316L hypoallergénique' },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-text-light)' }}>
                <span>{g.icon}</span>
                <span>{g.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
