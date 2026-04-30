import { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // Panier persisté dans localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('biconique_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    localStorage.setItem('biconique_cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, quantity = 1) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    setNotification(`✓ "${product.name}" ajouté au panier !`);
    timerRef.current = setTimeout(() => setNotification(null), 3000);
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem('biconique_cart');
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Livraison Europe — 4.99€, gratuite dès 50€
  const fraisLivraison = total >= 50 ? 0 : 4.99;
const totalFinal = total + fraisLivraison;
  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity,
      clearCart, total, totalFinal, fraisLivraison, cartCount, notification
    }}>
      {children}
    </CartContext.Provider>
  );
}

