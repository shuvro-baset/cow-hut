import { z } from 'zod'

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'cow is required',
    }),
    buyer: z.string({
      required_error: 'buyer is required',
    }),
  }),
})

export const OrderValidation = {
  createOrderZodSchema,
}
