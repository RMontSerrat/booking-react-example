import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { bookingsState } from '@/states/booking';
import dayjs, { Dayjs } from 'dayjs';
import { generateUniqueId } from '@/utils';
import { IBooking } from '@/interfaces/booking';

export const bookingSchema = z.object({
  id: z.string().optional(),
  checkIn: z.custom((val) => dayjs.isDayjs(val), {
      message: "Check-in must be a valid date.",
  }).nullable(),
  checkOut: z.custom((val) => dayjs.isDayjs(val), {
      message: "Check-out must be a valid date.",
  }).nullable(),
})

export type BookingFormInput = z.infer<typeof bookingSchema>;

export const useBookingForm = (defaultValues = {}) => {
  const { control, handleSubmit, formState: { errors }, watch, setError } = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });

  const [bookings, setBookings] = useRecoilState<IBooking[]>(bookingsState);

  const onSubmit = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn) ? data.checkIn as Dayjs : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut) ? data.checkOut as Dayjs : null;

    const bookingExists = bookings.some(booking =>
        booking.id !== data.id &&
        booking.checkIn?.isSame(checkInDate, 'day') && 
        booking.checkOut?.isSame(checkOutDate, 'day')
    );

    if (bookingExists) {
        setError('checkIn', { type: 'manual', message: 'Booking with these dates already exists!' });
        setError('checkOut', { type: 'manual', message: 'Booking with these dates already exists!' });
    } else {
        if (data.id) {
            setBookings(bookings.map(booking => booking.id === data.id ? { ...booking, checkIn: checkInDate, checkOut: checkOutDate } : booking));
        } else {
            const newBooking = { id: generateUniqueId(), checkIn: checkInDate, checkOut: checkOutDate };
            setBookings([...bookings, newBooking]);
        }
    }
  }

  return { control, handleSubmit, errors, watch, onSubmit, setError };
};
