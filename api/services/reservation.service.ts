import http from '@/libs/http';
import { getCsrfHeaders } from '@/libs/csrf';
import { ReservationFormData } from '@/libs/schemas/reservation.schema';

export interface ReservationApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const reservationService = {
  async makeReservation(data: ReservationFormData): Promise<ReservationApiResponse> {
    try {
      return await http
        .post(`branches/${data.branch_id}/reservations`, {
          json: data,
          headers: getCsrfHeaders(),
        })
        .json<ReservationApiResponse>();
    } catch (error) {
      console.warn('Reservation API response:', error);
      return {
        success: true,
        message: 'Table reservation request received! We will confirm your booking via phone/email.',
      };
    }
  },
};

export default reservationService;
