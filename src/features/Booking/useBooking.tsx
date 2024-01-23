import { BookingForm } from "@/components/BookingForm";
import { DeleteReservation } from "@/components/DeleteReservation";
import { useBookingManagement } from "@/hooks/useBookingManagement";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { IBooking } from "@/interfaces/booking";
import dayjs from "dayjs";
import { useCallback } from "react";

export function useBooking() {
  const { addToast } = useToast();
  const { deleteBooking } = useBookingManagement();
  const { openModal: openModalEdit, closeModal: closeModalEdit } = useModal();
  const { openModal: openModalDelete, closeModal: closeModalDelete } =
    useModal();

  const handleSuccessCreate = useCallback(() => {
    addToast("Booking created successfully", { type: "success" });
  }, [addToast]);

  const handleSuccessEdit = useCallback(() => {
    addToast("Booking edited successfully", { type: "success" });
    closeModalEdit();
  }, [addToast, closeModalEdit]);

  const handleEdit = useCallback(
    (editingBooking: IBooking) => {
      openModalEdit({
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
    [handleSuccessEdit, openModalEdit],
  );

  const confirmDelete = useCallback(
    (booking: IBooking) => {
      if (booking.id) {
        deleteBooking(booking.id);
        addToast("Booking deleted successfully", { type: "success" });
        closeModalDelete();
      }
    },
    [addToast, closeModalDelete, deleteBooking],
  );

  const handleDelete = useCallback(
    (booking: IBooking) => {
      openModalDelete({
        body: (
          <DeleteReservation
            onCancel={closeModalDelete}
            onConfirm={() => confirmDelete(booking)}
          />
        ),
      });
    },
    [confirmDelete, closeModalDelete, openModalDelete],
  );

  return {
    handleSuccessCreate,
    handleEdit,
    handleDelete,
  };
}
