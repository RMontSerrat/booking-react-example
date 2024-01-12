import { BookingCard } from "@/components/BookingCard";
import { BookingForm } from "@/components/BookingForm";
import { BookingList } from "@/components/BookingList";
import { Header } from "@/components/Header";
import { useBooking } from "@/hooks/useBooking";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { IBooking } from "@/interfaces/booking";
import dayjs from "dayjs";
import { useCallback } from "react";

export function Booking() {
  const { addToast } = useToast();
  const { deleteBooking, bookings } = useBooking();
  const { openModal, closeModal } = useModal();

  const handleSuccessCreate = useCallback(() => {
    addToast("Booking created successfully", { type: "success" });
    closeModal();
  }, [addToast, closeModal]);

  const handleSuccessEdit = useCallback(() => {
    addToast("Booking edited successfully", { type: "success" });
    closeModal();
  }, [addToast, closeModal]);

  const handleEdit = useCallback(
    (editingBooking: IBooking) => {
      openModal({
        body: (
          <BookingForm
            defaultValues={{
              checkIn: dayjs(editingBooking?.checkIn),
              checkOut: dayjs(editingBooking?.checkOut),
              id: editingBooking?.id,
            }}
            onSuccess={handleSuccessEdit}
          />
        ),
      });
    },
    [handleSuccessEdit, openModal],
  );

  const handleDelete = useCallback(
    (booking: IBooking) => {
      if (booking.id) {
        deleteBooking(booking.id);
        addToast("Booking deleted successfully", { type: "success" });
      }
    },
    [deleteBooking, addToast],
  );

  return (
    <div>
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
    </div>
  );
}
