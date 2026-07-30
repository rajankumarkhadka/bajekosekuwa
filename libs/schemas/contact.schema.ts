import { z } from 'zod';

/**
 * Contact Form validation schema built using Zod.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' }),

  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address.' }),

  phone: z
    .string()
    .min(7, { message: 'Phone number must be at least 7 digits.' })
    .max(20, { message: 'Phone number cannot exceed 20 characters.' })
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, {
      message: 'Please enter a valid phone number format.',
    }),

  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(150, { message: 'Subject cannot exceed 150 characters.' }),

  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' }),

  branch_id: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
