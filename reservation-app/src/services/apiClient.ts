// src/services/apiClient.ts
const baseUrl = import.meta.env.VITE_API_BASE_URL

export const api = {
  async login(email: string, password: string) {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json(); // { token }
  },

  async getReservations(token: string) {
    const res = await fetch(`${baseUrl}/reservations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch reservations');
    return res.json();
  },

  async createReservation(token: string, reservation: {
    roomId: string;
    resourceId?: string;
    date: string;
    startTime: string;
    endTime: string;
    description?: string;
  }) {
    const res = await fetch(`${baseUrl}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservation),
    });
    if (!res.ok) throw new Error('Failed to create reservation');
    return res.json();
  },
};
