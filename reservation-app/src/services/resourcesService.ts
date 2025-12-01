// src/services/resourcesService.ts
import type { Resource } from '../types/resource'
import { api } from './apiClient'

export const resourcesService = {
  list: () => api<Resource[]>('/resources'),
  create: (resource: Omit<Resource, 'id'>) =>
    api<Resource>('/resources', { method: 'POST', body: JSON.stringify(resource) }),
  update: (id: string, resource: Partial<Omit<Resource, 'id'>>) =>
    api<Resource>(`/resources/${id}`, { method: 'PUT', body: JSON.stringify(resource) }),
  remove: (id: string) => api<void>(`/resources/${id}`, { method: 'DELETE' }),
}
