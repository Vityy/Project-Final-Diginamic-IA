// src/reservations/reservations.routes.ts
import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/authMiddleware'
import { listReservations, createReservation, removeReservation } from './reservations.controller'

const router = Router()
router.get('/', requireAuth, asyncHandler(listReservations))
router.post('/', requireAuth, asyncHandler(createReservation))
router.delete('/:id', requireAuth, asyncHandler(removeReservation))
export default router
