import { IOrder } from './orders.interface'
import { Order } from './orders.model'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../user/user.interface'
import { Cow } from '../cow/cow.model'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import mongoose from 'mongoose'

const createOrder = async (cow: ICow, buyer: IUser): Promise<IOrder | null> => {
  const data = {
    cow: cow,
    buyer: buyer,
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const cowData = await Cow.findById(cow).exec()
    const buyerData = await User.findById(buyer).exec()
    if (!cowData || !buyerData) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid cow or buyer')
    }
    if (cowData.price > buyerData.budget) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Buyer does not have enough budget to buy this cow'
      )
    }

    if (cowData.label === 'sold out') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'This cow is already sold out')
    }

    const sellerData = await User.findById(cowData?.seller).exec()
    if (!sellerData) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid seller')
    }

    sellerData.income += cowData.price
    buyerData.budget -= cowData.price

    await Cow.findOneAndUpdate(
      { _id: cowData.id },
      { label: 'sold out' },
      {
        new: true,
      }
    )

    await sellerData.save()
    await buyerData.save()

    await session.commitTransaction()
    await session.endSession()
    const result = await Order.create(data)

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const getAllOrders = async (): Promise<IOrder[]> => {
  const result = await Order.find().populate('cow').populate('buyer')
  return result
}

export const OrderService = {
  createOrder,
  getAllOrders,
}
