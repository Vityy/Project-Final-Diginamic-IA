import type { Reservation } from '../types/reservation'
import { api } from './apiClient'

export const reservationsService = {
  /**
   * Liste les réservations de l’utilisateur connecté
   */
  async list(token: string): Promise<Reservation[]> {
    return api.getReservations(token)
  },

  /**
   * Crée une nouvelle réservation
   */
  async create(
    token: string,
    reservation: Omit<Reservation, 'id' | 'status'>
  ): Promise<Reservation> {
    return api.createReservation(token, reservation)
  },

  /**
   * Supprime une réservation
   */
  async remove(token: string, id: string): Promise<{ message: string }> {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reservations/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      throw new Error('Failed to delete reservation')
    }
    // Le backend renvoie { message: 'Réservation supprimée' }
    return res.json() as Promise<{ message: string }>
  },
}
