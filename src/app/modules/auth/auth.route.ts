import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/user.validation'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.createUser
)

export const AuthRoutes = router
