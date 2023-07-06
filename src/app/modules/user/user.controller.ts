import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { IUser } from './user.interface'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers()

  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully !',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.getSingleUser(id)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully !',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await UserService.updateUser(id, updatedData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  })
})

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
