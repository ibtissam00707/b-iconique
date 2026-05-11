import { createContext, useContext, useState, useEffect } from 'react';

const FavorisContext = createContext();

export function useFavoris() {
  return useContext(FavorisContext);
}

export function FavorisProvider({ children }) {
  const [favoris, setFavoris] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('biconique_favoris')) || [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('biconique_favoris', JSON.stringify(favoris));
  }, [favoris]);

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