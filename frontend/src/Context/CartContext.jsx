import { createContext, useContext, useState } from 'react';

// Création du contexte
const CartContext = createContext();

// Hook personnalisé pour utiliser le panier facilement
export function useCart() {
  return useContext(CartContext);
}

// Provider — enveloppe toute l'application
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Ajouter un produit au panier
  function addToCart(product) {
    setCart(prev => {
      // Si le produit existe déjà, on augmente la quantité
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Sinon on l'ajoute avec quantité 1
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Supprimer un produit du panier
  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.id !== productId));
  }

  // Vider le panier
  function clearCart() {
    setCart([]);
  }

  // Calculer le total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Nombre total d'articles
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}