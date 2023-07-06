import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import catchAsync from '../../../shared/catchAsync'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body
  const result = await AuthService.createUser(user)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    data: result,
  })
})

export const AuthController = {
  createUser,
}
