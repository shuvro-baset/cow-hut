import { z } from 'zod'
import { cowBreed, cowLocations } from './cow.constant'

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    location: z.enum([...cowLocations] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: 'breed is required',
    }),
    seller: z.string({
      required_error: 'seller is required',
    }),
  }),
})

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...cowLocations] as [string, ...string[]]).optional(),
    breed: z.enum([...cowBreed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.string().optional(),
    category: z.string().optional(),
    seller: z.string().optional(),
  }),
})

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
}
