// src/services/reservationsService.ts
import type { Reservation } from '../types/reservation'
import { api } from './apiClient'

export const reservationsService = {
  list: () => api<Reservation[]>('/reservations'),
  create: (reservation: Omit<Reservation, 'id' | 'status'>) =>
    api<Reservation>('/reservations', { method: 'POST', body: JSON.stringify(reservation) }),
  remove: (id: string) => api<void>(`/reservations/${id}`, { method: 'DELETE' }),
}
