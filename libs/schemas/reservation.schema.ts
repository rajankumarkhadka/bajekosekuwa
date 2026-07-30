import { z } from 'zod';

export const reservationSchema = z.object({
  branch_id: z.string().min(1, { message: 'Please select a dining location/outlet.' }),
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
      message: 'Please enter a valid phone number.',
    }),
  guests: z
    .number()
    .min(1, { message: 'At least 1 guest required.' })
    .max(30, { message: 'For groups larger than 30, please contact us directly.' }),
  date: z.string().min(1, { message: 'Please choose a reservation date.' }),
  time: z.string().min(1, { message: 'Please select a time slot.' }),
  special_requests: z.string().optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
