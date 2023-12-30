import z from "zod"
export const courseValidationSchema = z.object({
  body:z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number(),
    tags: z.array(
      z.object({
        name: z.string().optional(),
        isDeleted: z.boolean(),
      })
    ),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    createdBy: z.string().optional(),
    details: z.object({
      level: z.string().optional(),
      description: z.string().optional(),
    }),
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