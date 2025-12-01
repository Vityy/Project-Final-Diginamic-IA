// src/hooks/useAuth.ts
import { useEffect, useState, useCallback } from 'react';
import { login, logout } from '../services/authService';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialisation: lit le token au montage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(Boolean(token));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await login(email, password); // { token }
    localStorage.setItem('token', res.token);
    setIsAuthenticated(true);
    return res;
  }, []);

  const signOut = useCallback(() => {
    logout();
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, signIn, signOut };
}
