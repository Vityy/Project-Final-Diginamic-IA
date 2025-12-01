// src/config/env.ts
import 'dotenv/config'

export const env = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: String(process.env.JWT_SECRET),
  corsOrigin: String(process.env.CORS_ORIGIN || 'http://localhost:5173'),
}
