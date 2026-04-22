import { useEffect, useState } from 'react';
import api from '../api';

function Catalogue() {
  // useState = une variable qui se met à jour automatiquement à l'écran
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect = se lance une fois quand la page s'affiche
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
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '200px'
          }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>{product.price} €</strong></p>
            <p>Stock : {product.stock}</p>
            <p>Catégorie : {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;