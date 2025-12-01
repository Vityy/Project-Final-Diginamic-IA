// src/middleware/authMiddleware.ts
import type { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from '../config/env'

export interface AuthPayload extends JwtPayload {
  userId: string
  email: string
}

// On étend Request pour typer correctement req.user
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing Bearer token' })
  }

  const token = header.substring(7) // retire "Bearer "

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload
    req.user = payload
    next()
  } catch (err) {
    console.error('JWT verification failed:', err)
    return res.status(403).json({ error: 'Forbidden: invalid or expired token' })
  }
}
