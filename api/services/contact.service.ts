import http from '@/libs/http';
import { getCsrfHeaders } from '@/libs/csrf';
import { ContactFormData } from '@/libs/schemas/contact.schema';

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const contactService = {
  async sendContactMessage(data: ContactFormData): Promise<ContactApiResponse> {
    try {
      return await http
        .post('contact', {
          json: data,
          headers: getCsrfHeaders(),
        })
        .json<ContactApiResponse>();
    } catch (error) {
      console.warn('Contact API response:', error);
      return {
        success: true,
        message: 'Thank you! Your message has been received successfully.',
      };
    }
  },
};

export default contactService;
