import React from 'react';
import { useRecoilState } from 'recoil';
import { bookingsState } from '@/states/booking';
import { IBooking } from '@/interfaces/booking';
import { useModal } from '@/hooks/useModal';
import { BookingForm } from '@/components/BookingForm';

export const useBooking = () => {
  const { openModal } = useModal();
  const [bookings, setBookings] = useRecoilState<IBooking[]>(bookingsState);

  const deleteBooking = (bookingToDelete: IBooking) => {
    setBookings(bookings.filter(booking => booking.id !== bookingToDelete.id));
  };

  const editBooking = (editingBooking: IBooking) => {
    openModal({
        body:
          <BookingForm 
            defaultValues={{ checkIn: editingBooking?.checkIn, checkOut: editingBooking?.checkOut, id: editingBooking?.id }}
          />
    })
  };

  return { bookings, deleteBooking, editBooking };
};
