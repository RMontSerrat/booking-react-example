import { BookingCard } from "@/components/BookingCard";
import { BookingForm } from "@/components/BookingForm";
import { Header } from "@/components/Header";
import { useBooking } from "@/hooks/useBooking";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { IBooking } from "@/interfaces/booking";

export function Booking() {
  const { addToast } = useToast(); 
  const { deleteBooking, bookings } = useBooking();
  const { openModal, closeModal } = useModal();

  const handleSuccessCreate = () => {
    addToast('Booking created successfully', { type: 'success' });
    closeModal();
  }

  const handleSuccessEdit = () => {
    addToast('Booking edited successfully', { type: 'success' });
    closeModal();
  }

  const handleEdit = (editingBooking: IBooking) => {
    openModal({
      body: (
        <BookingForm
          defaultValues={{
            checkIn: editingBooking?.checkIn,
            checkOut: editingBooking?.checkOut,
            id: editingBooking?.id,
          }}
          onSuccess={handleSuccessEdit}
        />
      ),
    });
  };

  const handleDelete = (booking: IBooking) => {
    deleteBooking(booking)
    addToast('Booking deleted successfully', { type: 'success' });
  }

  return (
    <div>
      <Header>Booking List</Header>
      <BookingForm onSuccess={handleSuccessCreate} />
      <div>
        {bookings.map((booking: IBooking, index: number) => (
          <BookingCard key={index}>
            <BookingCard.CheckinLabel date={booking.checkIn} />
            <BookingCard.CheckoutLabel date={booking.checkOut} />
            <BookingCard.Actions>
              <BookingCard.Edit onEdit={() => handleEdit(booking)} />
              <BookingCard.Delete onDelete={() => handleDelete(booking)} />
            </BookingCard.Actions>
          </BookingCard>
        ))}
      </div>
    </div>
  );
}
