import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrderValidation } from './orders.validation'
import { OrderController } from './orders.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
)

router.get(
  '/',  OrderController.getAllOrders
)

export const OrdersRoutes = router
