// src/app.ts
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import { logger } from './utils/logger'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './auth/auth.routes'
import roomsRoutes from './rooms/rooms.routes'
import resourcesRoutes from './resources/resources.routes'
import reservationsRoutes from './reservations/reservations.routes'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.corsOrigin }))
app.use(express.json())
app.use(logger)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomsRoutes)
app.use('/api/resources', resourcesRoutes)
app.use('/api/reservations', reservationsRoutes)

app.use(errorHandler)
