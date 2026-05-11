import { useFavoris } from '../context/FavorisContext';
import { useCart } from '../context/CartContext';

export default function Favoris() {
  const { favoris, toggleFavori } = useFavoris();
  const { addToCart } = useCart();

  if (favoris.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <h2>Aucun favori pour le moment</h2>
      <p>Ajoutez des bijoux à vos favoris depuis le catalogue ❤️</p>
      <Link to="/catalogue">Voir le catalogue</Link>
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Mes Favoris ({favoris.length})</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {favoris.map(product => (
          <div key={product.id} style={{ border: '1px solid #E0D8D0', borderRadius: '8px', padding: '16px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p style={{ color: '#8B2635', fontWeight: 'bold' }}>{product.price}€</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => addToCart(product, 1)}>Ajouter au panier</button>
              <button onClick={() => toggleFavori(product)} style={{ color: '#8B2635' }}>❌ Retirer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}