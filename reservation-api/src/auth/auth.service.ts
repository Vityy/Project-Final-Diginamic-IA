// src/auth/auth.service.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

const prisma = new PrismaClient()

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 })
  const token = jwt.sign({ userId: user.id, email: user.email }, env.jwtSecret, { expiresIn: '7d' })
  return { token, user: { id: user.id, email: user.email } }
}
