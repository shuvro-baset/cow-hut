import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  if (user.role === 'buyer') {
    user.income = 0
  }
  if (user.role === 'seller') {
    user.income = 0
    user.budget = 0
  }
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create')
  }
  return createdUser
}

export const AuthService = {
  createUser,
}
