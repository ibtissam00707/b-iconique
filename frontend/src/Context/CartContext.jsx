import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getUserKey } from '../utils/auth';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function getCartKey() {
  const k = getUserKey();
  return k ? `cart_${k}` : 'cart_guest';
}

export function CartProvider({ children }) {
  const [cartKey, setCartKey] = useState(getCartKey);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(getCartKey())) || [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleFocus = () => {
      const newKey = getCartKey();
      if (newKey !== cartKey) {
        setCartKey(newKey);
        try {
          setCart(JSON.parse(localStorage.getItem(newKey)) || []);
        } catch { setCart([]); }
      }
    };
    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleFocus);
    };
  }, [cartKey]);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

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
    localStorage.removeItem(cartKey);
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

