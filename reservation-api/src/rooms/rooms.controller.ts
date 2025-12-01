// src/rooms/rooms.controller.ts
import type { Request, Response } from 'express'
import { z } from 'zod'
import { roomsService } from './rooms.service'

const roomCreateSchema = z.object({
  name: z.string().min(1),
  capacity: z.number().int().nonnegative(),
  location: z.string().min(1),
})

export async function listRooms(_req: Request, res: Response) {
  const rooms = await roomsService.list()
  res.json(rooms)
}

export async function createRoom(req: Request, res: Response) {
  const parsed = roomCreateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid room payload' })
  const room = await roomsService.create(parsed.data)
  res.status(201).json(room)
}

export async function updateRoom(req: Request, res: Response) {
  const id = req.params.id
  const data = req.body
  const room = await roomsService.update(id, data)
  res.json(room)
}

export async function removeRoom(req: Request, res: Response) {
  const id = req.params.id
  await roomsService.remove(id)
  res.status(204).end()
}
