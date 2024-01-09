import { useRecoilState } from 'recoil';
import dayjs, { Dayjs } from 'dayjs';
import { bookingsState } from '@/states/booking';
import { IBooking } from '@/interfaces/booking';
import { generateUniqueId } from '@/utils';
import { BookingFormInput } from '@/hooks/useBookingForm/useBookingForm';

export const useBooking = () => {
  const [bookings, setBookings] = useRecoilState<IBooking[]>(bookingsState);

  const deleteBooking = (bookingToDelete: IBooking) => {
    setBookings(bookings.filter(booking => booking.id !== bookingToDelete.id));
  };

  const checkExistingBooking = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn) ? data.checkIn as Dayjs : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut) ? data.checkOut as Dayjs : null;

    return bookings.some(booking =>
      booking.id !== data.id &&
      booking.checkIn?.isSame(checkInDate, 'day') && 
      booking.checkOut?.isSame(checkOutDate, 'day')
    );
  }

  const addBooking = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn) ? data.checkIn as Dayjs : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut) ? data.checkOut as Dayjs : null;

    const newBooking = { id: generateUniqueId(), checkIn: checkInDate, checkOut: checkOutDate };
    setBookings([...bookings, newBooking]);
  }

  const editBooking = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn) ? data.checkIn as Dayjs : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut) ? data.checkOut as Dayjs : null;

    setBookings(bookings.map(booking => booking.id === data.id ? { ...booking, checkIn: checkInDate, checkOut: checkOutDate } : booking));
  };

  return { bookings, deleteBooking, editBooking, addBooking, checkExistingBooking };
};
