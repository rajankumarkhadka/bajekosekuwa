import ky from 'ky';
import { ContactFormData } from '@/libs/schemas/contact.schema';

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ContactApiPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  branch_id?: string | null;
  ip_address?: string;
  user_agent?: string;
}

export const contactService = {
  async sendContactMessage(data: ContactFormData & { branch_id?: string }): Promise<ContactApiResponse> {
    try {
      const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';

      const payload: ContactApiPayload = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        branch_id: data.branch_id?.trim() || null,
        ip_address: '',
        user_agent: userAgent,
      };

      // POST directly to https://cms.bajekoshop.com/api/v1/contacts/ (without /public)
      const response = await ky
        .post('https://cms.bajekoshop.com/api/v1/contacts/', {
          json: payload,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 10000,
        })
        .json<any>();

      return {
        success: true,
        message: response?.message || 'Thank you! Your message has been received successfully.',
        data: response?.data || response,
      };
    } catch (error: any) {
      console.warn('CMS Contacts API error:', error);
      let errorMsg = 'Failed to send message. Please try again.';
      try {
        if (error?.response) {
          const errBody = await error.response.clone().json();
          if (errBody?.message) {
            errorMsg = errBody.message;
          } else if (errBody?.detail) {
            errorMsg = typeof errBody.detail === 'string' ? errBody.detail : JSON.stringify(errBody.detail);
          }
        }
      } catch (_) {}
      throw new Error(errorMsg);
    }
  },
};

export default contactService;
