import { z } from 'zod';
import { isValidEmail, isValidPassword, isValidPhoneNumber } from '../utils/validators';

export const LoginSchema = z.object({
  username: z.string()
    .refine(usr => isValidEmail(usr) || isValidPhoneNumber(usr), 'invalid username'),
  password: z.string().refine(isValidPassword),
});
