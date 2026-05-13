import { getUser, isAdmin, isLoggedIn, getUserKey } from '../utils/auth';

describe('auth.js — utilitaire JWT', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('T01 — getUser retourne null si pas de token', () => {
    expect(getUser()).toBeNull();
  });

  test('T02 — getUser décode correctement le payload JWT', () => {
    const payload = {
      username: 'test@biconique.com',
      roles: ['ROLE_USER'],
      exp: 9999999999
    };
    const token = 'h.' + btoa(JSON.stringify(payload)) + '.s';
    localStorage.setItem('token', token);
    const user = getUser();
    expect(user.username).toBe('test@biconique.com');
    expect(user.roles).toContain('ROLE_USER');
  });

  test('T03 — isAdmin retourne false pour ROLE_USER', () => {
    const payload = { username: 'user@test.com', roles: ['ROLE_USER'], exp: 9999999999 };
    localStorage.setItem('token', 'h.' + btoa(JSON.stringify(payload)) + '.s');
    expect(isAdmin()).toBe(false);
  });

  test('T04 — isAdmin retourne true pour ROLE_ADMIN', () => {
    const payload = { username: 'admin@test.com', roles: ['ROLE_ADMIN', 'ROLE_USER'], exp: 9999999999 };
    localStorage.setItem('token', 'h.' + btoa(JSON.stringify(payload)) + '.s');
    expect(isAdmin()).toBe(true);
  });

  test('T05 — isLoggedIn retourne false si token expiré', () => {
    const payload = { username: 'user@test.com', roles: ['ROLE_USER'], exp: 1 };
    localStorage.setItem('token', 'h.' + btoa(JSON.stringify(payload)) + '.s');
    expect(isLoggedIn()).toBe(false);
  });

  test('T06 — getUserKey retourne la clé correcte par email', () => {
    const payload = { username: 'marie@test.com', roles: ['ROLE_USER'], exp: 9999999999 };
    localStorage.setItem('token', 'h.' + btoa(JSON.stringify(payload)) + '.s');
    expect(getUserKey('cart')).toBe('cart_marie@test.com');
    expect(getUserKey('favoris')).toBe('favoris_marie@test.com');
  });

});