import { api } from '../services/apiClient';

export async function login(email: string, password: string) {
  return api.login(email, password);
}

export function logout() {
  // Supprime le token stocké
  localStorage.removeItem('token');
}