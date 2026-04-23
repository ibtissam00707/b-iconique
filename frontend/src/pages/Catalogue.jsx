import { useEffect, useState } from 'react';
import api from '../api';
import { useCart } from '../context/CartContext';

function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/api/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur :', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Nos bijoux</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            width: '220px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ marginBottom: '8px' }}>{product.name}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{product.description}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              {product.price} €
            </p>
            <p style={{ fontSize: '13px', color: '#999' }}>
              Stock : {product.stock}
            </p>
            <p style={{ fontSize: '13px', color: '#999' }}>
              {product.category}
            </p>
            <button
  onClick={() => addToCart(product)}
  style={{
    marginTop: '12px',
    width: '100%',
    padding: '10px',
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    letterSpacing: '0.5px'
  }}>
  🛒 Ajouter au panier
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;