import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Panier() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '18px', color: 'var(--color-text-light)', fontFamily: 'Georgia, serif' }}>
          Votre panier est vide 🛒
        </p>
        <Link to="/" style={{ 
          color: 'var(--color-primary)', 
          marginTop: '16px', 
          display: 'block',
          fontFamily: 'Georgia, serif'
        }}>
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ color: 'var(--color-text)', marginBottom: '32px' }}>Mon panier</h1>

      {cart.map((item) => (
        <div key={item.id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          marginBottom: '12px',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          background: 'var(--color-white)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}>
          <div>
            <p style={{ fontWeight: 'bold', margin: 0, color: 'var(--color-text)' }}>
              {item.name}
            </p>
            <p style={{ color: 'var(--color-text-light)', margin: '6px 0', fontSize: '14px' }}>
              {item.price} € × {item.quantity}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <p style={{ fontWeight: 'bold', margin: 0, color: 'var(--color-text)' }}>
              {(item.price * item.quantity).toFixed(2)} €
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 14px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                fontSize: '13px'
              }}>
              Supprimer
            </button>
          </div>
        </div>
      ))}

      <div style={{
        borderTop: '2px solid var(--color-primary)',
        paddingTop: '20px',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-text)', margin: 0 }}>
          Total : {total.toFixed(2)} €
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={clearCart}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              fontSize: '14px'
            }}>
            Vider le panier
          </button>
          <button style={{
            padding: '10px 24px',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            fontSize: '14px',
            letterSpacing: '0.5px'
          }}>
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}

export default Panier;