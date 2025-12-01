// src/auth/auth.routes.ts
import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { login } from './auth.controller'

const router = Router()
router.post('/login', asyncHandler(login))
export default router
