import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { IOrder } from './orders.interface'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { OrderService } from './orders.service'

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body
  const result = await OrderService.createOrder(cow, buyer)

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully!',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders()

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully !',
    data: result,
  })
})

export const OrderController = {
  createOrder,
  getAllOrders,
}
