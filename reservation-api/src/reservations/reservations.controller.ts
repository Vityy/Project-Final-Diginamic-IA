// src/reservations/reservations.controller.ts
import type { Request, Response } from 'express'
import { z } from 'zod'
import { reservationsService } from './reservations.service'

const reservationCreateSchema = z
  .object({
    roomId: z.string().min(1),
    resourceId: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  })
  .refine((v) => v.startTime < v.endTime, {
    path: ['endTime'],
    message: 'endTime must be greater than startTime',
  })

export async function listReservations(_req: Request, res: Response) {
  const reservations = await reservationsService.list()
  res.json(reservations)
}

export async function createReservation(req: Request, res: Response) {
  const parsed = reservationCreateSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message || 'Invalid reservation payload' })
  }
  const userId = (req as any).user?.userId as string
  const reservation = await reservationsService.create({ ...parsed.data, userId })
  res.status(201).json(reservation)
}

export async function removeReservation(req: Request, res: Response) {
  const id = req.params.id
  await reservationsService.remove(id)
  res.status(204).end()
}
