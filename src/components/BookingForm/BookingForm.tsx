import { DatePicker } from "@/components/DatePicker";
import { useBookingForm } from "@/hooks/useBookingForm";
import { IBooking } from "@/interfaces/booking";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { Button, Form } from "./BookingForm.styles";

interface BookingFormProps {
  defaultValues?: IBooking;
  onSuccess?: () => void;
}

export function BookingForm({ defaultValues, onSuccess }: BookingFormProps) {
  const { control, handleSubmit, watch, onSubmit } = useBookingForm({
    defaultValues,
    onSuccess,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="checkIn"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              error={error?.message}
              minDate={dayjs()}
              label="Check-in"
              {...field}
            />
          )}
        />
        <Controller
          name="checkOut"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Check-out"
              error={error?.message}
              minDate={watch("checkIn") || undefined}
              {...field}
            />
          )}
        />
        <Button variant="contained" color="primary" type="submit" size="large">
          Submit
        </Button>
      </LocalizationProvider>
    </Form>
  );
}
