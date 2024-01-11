import { useBooking } from "@/hooks/useBooking";
import { useToast } from "@/hooks/useToast";
import { IBooking } from "@/interfaces/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const bookingSchema = z
  .object({
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
  })
  .refine(
    (data) => {
      const { checkIn, checkOut } = data;
      if (checkIn && checkOut) {
        return (
          dayjs.isDayjs(checkIn) &&
          dayjs.isDayjs(checkOut) &&
          dayjs(checkOut).isAfter(dayjs(checkIn))
        );
      }
      return true;
    },
    {
      message: "Check-out date must be after check-in.",
      path: ["checkOut"],
    },
  );

export type BookingFormInput = z.infer<typeof bookingSchema>;

interface UseBookingFormProps {
  defaultValues?: IBooking;
  onSuccess?: () => void;
}

export const useBookingForm = (options?: UseBookingFormProps) => {
  const { defaultValues, onSuccess } = options ?? {};
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
      addToast("Booking with these dates already exists!", { type: "error" });
    } else {
      if (data.id) {
        editBooking(data);
      } else {
        addBooking(data);
      }
      onSuccess?.();
    }
  };

  return { onSubmit, control, handleSubmit, errors, watch };
};
