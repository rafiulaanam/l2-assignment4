import { z } from 'zod';

export const categoryValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1).max(255) })
})
