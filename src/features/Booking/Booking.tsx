import React from 'react';
import { IBooking } from '@/interfaces/booking';
import { BookingCard } from '@/components/BookingCard';
import { BookingForm } from '@/components/BookingForm';
import { Header } from '@/components/Header';
import { useBooking } from '@/hooks/useBooking/useBooking';
import { useModal } from '@/hooks/useModal/useModal';

export function Booking() {
  const { deleteBooking, bookings } = useBooking();
  const { openModal } = useModal();

  const handleEdit = (editingBooking: IBooking) => {
    openModal({
        body:
          <BookingForm 
            defaultValues={{ checkIn: editingBooking?.checkIn, checkOut: editingBooking?.checkOut, id: editingBooking?.id }}
          />
    })
  }
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
                            <BookingCard.Edit onEdit={() => handleEdit(booking)} />
                            <BookingCard.Delete onDelete={() => deleteBooking(booking)} />
                        </BookingCard.Actions>
                    </BookingCard>
                ))}
            </div>
        </div>
    );
};
