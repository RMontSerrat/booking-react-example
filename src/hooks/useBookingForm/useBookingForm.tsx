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
      .custom(
        (val) =>
          dayjs.isDayjs(val) &&
          (dayjs(val).isAfter(dayjs()) || dayjs(val).isSame(dayjs()), "day"),
        {
          message: "Check-in must be a valid date and today or later.",
        },
      )
      .nullable(),
    checkOut: z
      .custom(
        (val) =>
          dayjs.isDayjs(val) &&
          (dayjs(val).isAfter(dayjs()) || dayjs(val).isSame(dayjs()), "day"),
        {
          message: "Check-out must be a valid date and today or later.",
        },
      )
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
  const { control, handleSubmit, watch } = useForm<IBooking>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });

  const { addBooking, editBooking, checkIsBookingOverlapping } = useBooking();

  const onSubmit = (data: BookingFormInput) => {
    const isBookingOverlapping = checkIsBookingOverlapping(data);

    if (isBookingOverlapping) {
      addToast(
        "Unable to create booking: the selected dates overlap with an existing reservation.",
        { type: "error" },
      );
    } else {
      if (data.id) {
        editBooking(data);
      } else {
        addBooking(data);
      }
      onSuccess?.();
    }
  };

  return { onSubmit, control, handleSubmit, watch };
};
