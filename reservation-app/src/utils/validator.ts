// src/utils/validators.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Au moins 6 caractères'),
})

export const reservationSchema = z.object({
  roomId: z.string().min(1, 'Salle requise'),
  resourceId: z.string().optional(),
  date: z.string().min(1, 'Date requise'),
  startTime: z.string().min(1, 'Heure début requise'),
  endTime: z.string().min(1, 'Heure fin requise'),
})
.refine((v) => v.startTime < v.endTime, { path: ['endTime'], message: 'Heure fin doit être > début' })
