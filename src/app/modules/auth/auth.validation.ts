import { z } from 'zod';


export const loginUserValidationSchema = z.object({
    body:z.object({
        username: z.string(),
        password: z.string(),
      })
});
  
  export const changePasswordValidationSchema = z.object({
    body:z.object({
        currentPassword: z.string(),
        newPassword: z.string(),
      })
  });