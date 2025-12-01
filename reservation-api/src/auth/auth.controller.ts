// src/auth/auth.controller.ts
import type { Request, Response } from 'express'
import { z } from 'zod'
import { authenticate } from './auth.service'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
})

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message || 'Invalid payload' })
  }
  const { email, password } = parsed.data
  const result = await authenticate(email, password)
  res.json(result)
}
