import { createContext, useContext, useState, useEffect } from 'react';
import { getUserKey } from '../utils/auth';

const FavorisContext = createContext();

export function useFavoris() {
  return useContext(FavorisContext);
}

function getKey() {
  return getUserKey() || 'favoris_guest';
}

export function FavorisProvider({ children }) {
  const [userKey, setUserKey] = useState(getKey);
  const [favoris, setFavoris] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(getKey())) || [];
    } catch { return []; }
  });

  useEffect(() => {
    const handleStorage = () => {
      const newKey = getKey();
      if (newKey !== userKey) {
        setUserKey(newKey);
        try {
          setFavoris(JSON.parse(localStorage.getItem(newKey)) || []);
        } catch { setFavoris([]); }
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleStorage);
    };
  }, [userKey]);

  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(favoris));
  }, [favoris, userKey]);

  function toggleFavori(product) {
    setFavoris(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  }

  function isFavori(id) {
    return favoris.some(p => p.id === id);
  }

  return (
    <FavorisContext.Provider value={{ favoris, toggleFavori, isFavori }}>
      {children}
    </FavorisContext.Provider>
  );
}