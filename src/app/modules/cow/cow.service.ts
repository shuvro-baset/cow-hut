import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { cowSearchableFields } from './cow.constant'
import { ICow, ICowFilters } from './cow.interface'
import { Cow } from './cow.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createCow = async (payload: ICow): Promise<ICow> => {
  payload.label = 'for sale'

  const result = (await Cow.create(payload)).populate('seller')
  return result
}

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (filtersData.minPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: filtersData.minPrice,
      },
    })
  }

  if (filtersData.maxPrice !== undefined) {
    andConditions.push({
      price: {
        $lte: filtersData.maxPrice,
      },
    })
  }

  if (Object.keys(filtersData).length > 0) {
    const andFilter = Object.entries(filtersData)
      .filter(([field]) => field !== 'maxPrice' && field !== 'minPrice')
      .map(([field, value]) => ({ [field]: value }))

    if (andFilter.length > 0) {
      andConditions.push({ $and: andFilter })
    }
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Cow.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const isCowExist = await Cow.findById(id)
  if (!isCowExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This Cow does not exist')
  }
  const result = await Cow.findById(id).populate('seller')
  return result
}

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isCowExist = await Cow.findById(id)
  if (!isCowExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This Cow does not exist')
  }
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteCow = async (id: string): Promise<ICow | null> => {
  const isCowExist = await Cow.findById(id)
  if (!isCowExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This Cow does not exist')
  }
  const result = await Cow.findByIdAndDelete(id)
  return result
}

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
