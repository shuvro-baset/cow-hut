import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This User does not exist')
  }
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isUserExist = await User.findById(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This User does not exist')
  }
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const isUserExist = await User.findById(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This User does not exist')
  }
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
