import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidation } from './cow.validation'
import { CowController } from './cow.controller'

const router = express.Router()

router.post(
  '/create-cow',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
)

router.get('/:id', CowController.getSingleCow)

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
)

router.delete('/:id', CowController.deleteCow)

router.get('/', CowController.getAllCows)
export const CowRoutes = router
