import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useBooking } from "@/hooks/useBooking";
import { IBooking } from "@/interfaces/booking";
import { useToast } from "../useToast/useToast";

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

interface UseBookingFormOptions {
  onSuccess?: () => void,
}

export const useBookingForm = (defaultValues?: IBooking, options?: UseBookingFormOptions) => {
  const { addToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IBooking>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });

  const { addBooking, editBooking, checkExistingBooking } = useBooking();

  const onSubmit = (data: BookingFormInput) => {
    const bookingExists = checkExistingBooking(data);
    
    if (bookingExists) {
      addToast("Booking with these dates already exists!", { type: 'error'});
    } else {
      if (data.id) {
        editBooking(data);
      } else {
        addBooking(data);
      }
      options?.onSuccess?.();
    }
  };

  return { onSubmit, control, handleSubmit, errors, watch };
};
