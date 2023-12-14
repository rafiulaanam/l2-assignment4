import { z } from 'zod';

export const reviewValidationSchema = z.object({
//   courseId: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
//     message: 'Invalid ObjectId format for courseId',
//   }),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(1),
});