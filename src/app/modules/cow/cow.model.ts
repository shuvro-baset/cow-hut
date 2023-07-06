import { Schema, model } from 'mongoose'
import { ICow, CowModel } from './cow.interface'
import { cowBreed, cowCategory, cowLabel, cowLocations } from './cow.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const CowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cowLocations,
    },
    breed: {
      type: String,
      required: true,
      enum: cowBreed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: cowLabel,
    },
    category: {
      type: String,
      enum: cowCategory,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

CowSchema.pre('save', async function (next) {
  const isExist = await Cow.findOne({
    name: this.name,
  })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Cow is already exist !')
  }
  next()
})

export const Cow = model<ICow, CowModel>('Cow', CowSchema)