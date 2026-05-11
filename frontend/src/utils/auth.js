// Décoder le token JWT sans librairie externe
export function getUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload; // contient { username, roles, exp, iat }
  } catch {
    return null;
  }
}

export function isAdmin() {
  const user = getUser();
  return user?.roles?.includes('ROLE_ADMIN') ?? false;
}

export function isLoggedIn() {
  const user = getUser();
  if (!user) return false;
  // Vérifier expiration
  return user.exp * 1000 > Date.now();
}