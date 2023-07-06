import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import { userRole } from './user.constant'

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    name: {
      firstName: { type: String, unique: true },
      lastName: { type: String },
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
export const User = model<IUser, UserModel>('User', userSchema)
