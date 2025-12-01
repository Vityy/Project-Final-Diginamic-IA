// src/services/roomsService.ts
import type { Room } from '../types/room'
import { api } from './apiClient'

export const roomsService = {
  list: () => api<Room[]>('/rooms'),
  create: (room: Omit<Room, 'id'>) => api<Room>('/rooms', { method: 'POST', body: JSON.stringify(room) }),
  update: (id: string, room: Partial<Omit<Room, 'id'>>) =>
    api<Room>(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(room) }),
  remove: (id: string) => api<void>(`/rooms/${id}`, { method: 'DELETE' }),
}
