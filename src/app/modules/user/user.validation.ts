import z from "zod"
export const userValidationSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['user', 'admin']).default('user'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  
});
export const courseUpdateValidationSchema = z.object({
  body:z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(
      z.object({
        name: z.string().optional(),
        isDeleted: z.boolean().optional(),
      })
    ).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: z.object({
      level: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
  })
});