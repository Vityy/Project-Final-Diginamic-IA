// src/resources/resources.controller.ts
import type { Request, Response } from 'express'
import { z } from 'zod'
import { resourcesService } from './resources.service'

const resourceCreateSchema = z.object({
  type: z.string().min(1),
  description: z.string().min(1),
  available: z.boolean(),
})

export async function listResources(_req: Request, res: Response) {
  const resources = await resourcesService.list()
  res.json(resources)
}

export async function createResource(req: Request, res: Response) {
  const parsed = resourceCreateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid resource payload' })
  const resource = await resourcesService.create(parsed.data)
  res.status(201).json(resource)
}

export async function updateResource(req: Request, res: Response) {
  const id = req.params.id
  const data = req.body
  const resource = await resourcesService.update(id, data)
  res.json(resource)
}

export async function removeResource(req: Request, res: Response) {
  const id = req.params.id
  await resourcesService.remove(id)
  res.status(204).end()
}
