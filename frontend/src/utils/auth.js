export function getUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }
    console.log('[auth] JWT payload:', payload);
    return payload;
  } catch {
    return null;
  }
}

export function isAdmin() {
  const user = getUser();
  return user?.roles?.includes('ROLE_ADMIN') ?? false;
}

export function isLoggedIn() {
  return getUser() !== null;
}

export function getUserKey() {
  const user = getUser();
  if (!user) return null;
  // LexikJWT peut utiliser username, email ou sub selon la version
  const identifier = user.username || user.email || user.sub;
  return identifier ? `user_${identifier}` : null;
}
