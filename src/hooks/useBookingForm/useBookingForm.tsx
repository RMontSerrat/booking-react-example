import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useBooking } from "@/hooks/useBooking";
import { IBooking } from "@/interfaces/booking";

export const bookingSchema = z.object({
  id: z.string().optional(),
  checkIn: z
    .custom((val) => dayjs.isDayjs(val), {
      message: "Check-in must be a valid date.",
    })
    .nullable(),
  checkOut: z
    .custom((val) => dayjs.isDayjs(val), {
      message: "Check-out must be a valid date.",
    })
    .nullable(),
});

export type BookingFormInput = z.infer<typeof bookingSchema>;

export const useBookingForm = (defaultValues = {}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<IBooking>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });
  const { addBooking, editBooking, checkExistingBooking } = useBooking();

  const onSubmit = (data: BookingFormInput) => {
    const bookingExists = checkExistingBooking(data);
    if (bookingExists) {
      setError("checkIn", {
        type: "manual",
        message: "Booking with these dates already exists!",
      });
      setError("checkOut", {
        type: "manual",
        message: "Booking with these dates already exists!",
      });
    } else {
      if (data.id) {
        editBooking(data);
      } else {
        addBooking(data);
      }
    }
  };

  return { onSubmit, control, handleSubmit, errors, watch };
};
