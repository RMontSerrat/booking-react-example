import { useBookingForm } from "@/hooks/useBookingForm";
import { IBooking } from "@/interfaces/booking";
import { Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

interface BookingFormProps {
  defaultValues?: IBooking;
  onSuccess?: () => void,
}

export function BookingForm({ defaultValues, onSuccess }: BookingFormProps) {
  const { control, handleSubmit, errors, watch, onSubmit } =
    useBookingForm(defaultValues, { onSuccess });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="checkIn"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker minDate={dayjs()} label="Check-in" {...field} />
          )}
        />
        {errors.checkIn && (
          <Typography color="red">{errors.checkIn.message}</Typography>
        )}

        <Controller
          name="checkOut"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              label="Check-out"
              minDate={watch("checkIn")}
              {...field}
            />
          )}
        />
        {errors.checkOut && (
          <Typography color="red">{errors.checkOut.message}</Typography>
        )}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </LocalizationProvider>
    </form>
  );
}
