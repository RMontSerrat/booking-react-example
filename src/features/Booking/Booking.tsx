import { BookingCard } from "@/components/BookingCard";
import { BookingForm } from "@/components/BookingForm";
import { BookingList } from "@/components/BookingList";
import { Header } from "@/components/Header";
import { useBookingManagement } from "@/hooks/useBookingManagement";
import { IBooking } from "@/interfaces/booking";
import dayjs from "dayjs";
import { useBooking } from "./useBooking";

export function Booking() {
  const { handleSuccessCreate, handleEdit, handleDelete } = useBooking();
  const { bookings } = useBookingManagement();

  return (
    <>
      <Header>Booking List</Header>
      <BookingForm onSuccess={handleSuccessCreate} />
      {!!bookings.length && (
        <BookingList>
          {bookings.map((booking: IBooking) => (
            <BookingCard key={booking.id}>
              <BookingCard.Content>
                <BookingCard.CheckinLabel date={dayjs(booking.checkIn)} />
                <BookingCard.CheckoutLabel date={dayjs(booking.checkOut)} />
              </BookingCard.Content>
              <BookingCard.Actions>
                <BookingCard.Edit onEdit={() => handleEdit(booking)} />
                <BookingCard.Delete onDelete={() => handleDelete(booking)} />
              </BookingCard.Actions>
            </BookingCard>
          ))}
        </BookingList>
      )}
    </>
  );
}
