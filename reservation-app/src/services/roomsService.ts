// src/services/roomsService.ts
import type { Room } from '../types/room'
import { api } from './apiClient'

export const roomsService = {
  /**
   * Liste toutes les salles
   */
  async list(token: string): Promise<Room[]> {
    return api.getRooms(token)
  },

  /**
   * Crée une nouvelle salle
   */
  async create(token: string, room: Omit<Room, 'id'>): Promise<Room> {
    return api.createRoom(token, room)
  },

  /**
   * Met à jour une salle existante
   */
  async update(token: string, id: string, room: Partial<Omit<Room, 'id'>>): Promise<Room> {
    return api.updateRoom(token, id, room)
  },

  /**
   * Supprime une salle
   */
  async remove(token: string, id: string): Promise<{ message: string }> {
    return api.deleteRoom(token, id)
  },
}
