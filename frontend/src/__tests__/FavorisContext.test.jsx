import { render, act } from '@testing-library/react';
import { FavorisProvider, useFavoris } from '../context/FavorisContext';

// Produits de test
const p1 = { id: 1, name: 'Collier Test', price: 25.99, image: '' };
const p2 = { id: 2, name: 'Bague Test', price: 18.50, image: '' };

// Composant helper pour accéder au contexte
function Helper({ onRender }) {
  const ctx = useFavoris();
  onRender(ctx);
  return null;
}

function renderWithProvider(onRender) {
  return render(
    <FavorisProvider>
      <Helper onRender={onRender} />
    </FavorisProvider>
  );
}

describe('FavorisContext', () => {

  beforeEach(() => {
    localStorage.clear();
    // Simuler un utilisateur connecté
    const payload = { username: 'test@test.com', roles: ['ROLE_USER'], exp: 9999999999 };
    localStorage.setItem('token', 'h.' + btoa(JSON.stringify(payload)) + '.s');
  });

  test('T07 — favoris vide au démarrage', () => {
    let ctx;
    renderWithProvider(c => ctx = c);
    expect(ctx.favoris).toHaveLength(0);
  });

  test('T08 — toggleFavori ajoute un produit', () => {
    let ctx;
    renderWithProvider(c => ctx = c);
    act(() => ctx.toggleFavori(p1));
    expect(ctx.favoris).toHaveLength(1);
    expect(ctx.favoris[0].id).toBe(1);
  });

  test('T09 — toggleFavori retire un produit existant', () => {
    let ctx;
    renderWithProvider(c => ctx = c);
    act(() => ctx.toggleFavori(p1));
    act(() => ctx.toggleFavori(p1));
    expect(ctx.favoris).toHaveLength(0);
  });

  test('T10 — isFavori retourne true/false correctement', () => {
    let ctx;
    renderWithProvider(c => ctx = c);
    act(() => ctx.toggleFavori(p1));
    expect(ctx.isFavori(1)).toBe(true);
    expect(ctx.isFavori(2)).toBe(false);
  });

  test('T11 — favoris isolés par utilisateur', () => {
    // User 1 a des favoris
    localStorage.setItem('favoris_user1@test.com', JSON.stringify([p1]));
    // User 2 connecté → ne voit pas les favoris de User 1
    const payload = { username: 'user2@test.com', roles: ['ROLE_USER'], exp: 9999999999 };
    localStorage.setItem('token', 'h.' + btoa(JSON.stringify(payload)) + '.s');
    let ctx;
    renderWithProvider(c => ctx = c);
    expect(ctx.favoris).toHaveLength(0);
  });

});