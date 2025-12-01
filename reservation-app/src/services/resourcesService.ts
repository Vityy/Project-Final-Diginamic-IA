// src/services/resourcesService.ts
import type { Resource } from '../types/resource'
import { api } from './apiClient'

export const resourcesService = {
  /**
   * Liste toutes les ressources
   */
  async list(token: string): Promise<Resource[]> {
    return api.getResources(token)
  },

  /**
   * Crée une nouvelle ressource
   */
  async create(token: string, resource: Omit<Resource, 'id'>): Promise<Resource> {
    return api.createResource(token, resource)
  },

  /**
   * Met à jour une ressource existante
   */
  async update(token: string, id: string, resource: Partial<Omit<Resource, 'id'>>): Promise<Resource> {
    return api.updateResource(token, id, resource)
  },

  /**
   * Supprime une ressource
   */
  async remove(token: string, id: string): Promise<{ message: string }> {
    return api.deleteResource(token, id)
  },
}
