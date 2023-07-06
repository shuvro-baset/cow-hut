import { z } from 'zod'
import { userRole } from './user.constant'

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
})

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
