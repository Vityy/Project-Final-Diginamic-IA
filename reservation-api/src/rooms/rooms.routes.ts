// src/rooms/rooms.routes.ts
import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/authMiddleware'
import { listRooms, createRoom, updateRoom, removeRoom } from './rooms.controller'

const router = Router()
router.get('/', requireAuth, asyncHandler(listRooms))
router.post('/', requireAuth, asyncHandler(createRoom))
router.put('/:id', requireAuth, asyncHandler(updateRoom))
router.delete('/:id', requireAuth, asyncHandler(removeRoom))
export default router
