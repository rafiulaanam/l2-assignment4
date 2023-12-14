import z from "zod"
export const courseValidationSchema = z.object({
  body:z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(
      z.object({
        name: z.string(),
        isDeleted: z.boolean(),
      })
    ),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number(),
    details: z.object({
      level: z.string(),
      description: z.string(),
    }),
  })
});