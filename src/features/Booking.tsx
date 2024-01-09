import React from 'react';
import { bookingsState } from '@/states/booking';
import { useRecoilState } from 'recoil';
import { IBooking } from '@/interfaces/booking';
import { BookingCard } from '@/components/BookingCard';
import { BookingForm } from '@/components/BookingForm';
import { useModal } from '@/hooks/useModal';
import { Header } from '@/components/Header';

export function Booking() {
  const [bookings, setBookings] = useRecoilState<IBooking[]>(bookingsState);
  const { openModal } = useModal();

  const handleOpen = (editingBooking: IBooking) => {
    openModal({
        body:
          <BookingForm 
            defaultValues={{ checkIn: editingBooking?.checkIn, checkOut: editingBooking?.checkOut, id: editingBooking?.id }}
          />
    })
  };

  const handleDelete = (bookingToDelete: IBooking) => {
    setBookings(bookings.filter(booking => booking !== bookingToDelete));
  };

  return (
        <div>
            <Header>Booking List</Header>
            <BookingForm />
            <div>
                {bookings.map((booking: IBooking, index: number) => (
                    <BookingCard key={index}>
                        <BookingCard.CheckinLabel date={booking.checkIn} />
                        <BookingCard.CheckoutLabel date={booking.checkOut} />
                        <BookingCard.Actions>
                            <BookingCard.Edit onEdit={() => handleOpen(booking)} />
                            <BookingCard.Delete onDelete={() => handleDelete(booking)} />
                        </BookingCard.Actions>
                    </BookingCard>
                ))}
            </div>
        </div>
    );
};
