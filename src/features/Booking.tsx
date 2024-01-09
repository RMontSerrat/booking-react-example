import React from 'react';
import { IBooking } from '@/interfaces/booking';
import { BookingCard } from '@/components/BookingCard';
import { BookingForm } from '@/components/BookingForm';
import { Header } from '@/components/Header';
import { useBooking } from '@/hooks/useBooking';

export function Booking() {
  const { deleteBooking, editBooking, bookings } = useBooking();

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
                            <BookingCard.Edit onEdit={editBooking} />
                            <BookingCard.Delete onDelete={deleteBooking} />
                        </BookingCard.Actions>
                    </BookingCard>
                ))}
            </div>
        </div>
    );
};
