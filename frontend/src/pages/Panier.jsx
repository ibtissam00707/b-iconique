import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Panier() {
  const { cart, removeFromCart, updateQuantity, clearCart, total, fraisLivraison, totalFinal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'Georgia, serif' }}>
        <p style={{ fontSize: '18px', color: 'var(--color-text-light)' }}>
          Votre panier est vide 🛒
        </p>
        <Link to="/catalogue" style={{
          color: 'var(--color-primary)', marginTop: '16px',
          display: 'inline-block', fontFamily: 'Georgia, serif', fontSize: '14px'
        }}>
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ fontWeight: 'normal', fontSize: '28px', marginBottom: '32px', color: 'var(--color-text)' }}>
        Mon panier
      </h1>

      {/* Liste des produits */}
      {cart.map((item) => (
        <div key={item.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px', marginBottom: '12px',
          border: '1px solid var(--color-border)', borderRadius: '8px',
          background: 'var(--color-white)', boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {item.image && (
              <img src={item.image} alt={item.name}
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} />
            )}
            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 6px', color: 'var(--color-text)', fontSize: '15px' }}>
                {item.name}
              </p>
              <p style={{ color: 'var(--color-text-light)', margin: '0 0 10px', fontSize: '13px' }}>
                {item.price} € / unité
              </p>
              {/* Sélecteur quantité */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: '28px', height: '28px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', cursor: 'pointer', fontSize: '16px' }}>
                  −
                </button>
                <span style={{ fontSize: '15px', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: '28px', height: '28px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', cursor: 'pointer', fontSize: '16px' }}>
                  +
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <p style={{ fontWeight: 'bold', margin: 0, color: 'var(--color-primary)', fontSize: '16px' }}>
              {(item.price * item.quantity).toFixed(2)} €
            </p>
            <button onClick={() => removeFromCart(item.id)} style={{
              background: 'transparent', color: '#999', border: 'none',
              cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '12px', textDecoration: 'underline'
            }}>
              Supprimer
            </button>
          </div>
        </div>
      ))}

      {/* Récapitulatif */}
      <div style={{
        background: 'var(--color-white)', border: '1px solid var(--color-border)',
        borderRadius: '8px', padding: '20px', marginTop: '16px', marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>Sous-total</span>
          <span style={{ fontSize: '14px' }}>{total.toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>
            Livraison Europe
          </span>
          <span style={{ fontSize: '14px', color: fraisLivraison === 0 ? '#27ae60' : 'var(--color-text)' }}>
            {fraisLivraison === 0 ? 'Gratuite ✓' : `${fraisLivraison.toFixed(2)} €`}
          </span>
        </div>
        {fraisLivraison > 0 && (
          <p style={{ fontSize: '12px', color: 'var(--color-primary)', marginBottom: '8px', fontStyle: 'italic' }}>
            Plus que {(50 - total).toFixed(2)} € pour la livraison gratuite !
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginTop: '8px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-text)' }}>Total</span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            {totalFinal.toFixed(2)} €
          </span>
        </div>
      </div>

      {/* Boutons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={clearCart} style={{
          padding: '10px 20px', background: 'transparent',
          color: 'var(--color-text-light)', border: '1px solid var(--color-border)',
          borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '13px'
        }}>
          Vider le panier
        </button>
        <button onClick={() => navigate('/commande')} style={{
          padding: '12px 32px', background: 'var(--color-primary)',
          color: 'white', border: 'none', borderRadius: '4px',
          cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '14px', letterSpacing: '0.5px'
        }}>
          Commander →
        </button>
      </div>
    </div>
  );
}

export default Panier;

