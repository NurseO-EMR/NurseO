import { z } from "zod"

export const medicationLocationSchema = z.object({
  id: z.number(),
  drawer: z.string(),
  slot: z.string(),
  barcode: z.string(),
  dose: z.string(),
  type: z.string()
})

export const medicationSchema = z.object({
  id: z.number(),
  brandName: z.string().optional(),
  genericName: z.string().optional(),
  narcoticCountNeeded: z.boolean(),
  locations: z.array(medicationLocationSchema)
})
