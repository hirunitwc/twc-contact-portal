import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;