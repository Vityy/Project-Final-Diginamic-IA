// src/resources/resources.routes.ts
import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/authMiddleware'
import { listResources, createResource, updateResource, removeResource } from './resources.controller'

const router = Router()
router.get('/', requireAuth, asyncHandler(listResources))
router.post('/', requireAuth, asyncHandler(createResource))
router.put('/:id', requireAuth, asyncHandler(updateResource))
router.delete('/:id', requireAuth, asyncHandler(removeResource))
export default router
