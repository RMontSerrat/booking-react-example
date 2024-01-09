import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState } from 'recoil';
import { generateUniqueId } from '@/utils';
import { IBooking } from '@/interfaces/booking';
import { bookingsState } from '@/states/booking';

export const bookingSchema = z.object({
  id: z.string().optional(),
  checkIn: z.custom((val) => dayjs.isDayjs(val), {
      message: "Check-in must be a valid date.",
  }).nullable(),
  checkOut: z.custom((val) => dayjs.isDayjs(val), {
      message: "Check-out must be a valid date.",
  }).nullable(),
})

export type BookingFormInput = z.infer<typeof bookingSchema>;

export function BookingForm({ defaultValues = {} }) {
  const { control, handleSubmit, formState: { errors }, watch, setError } = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });
  const [bookings, setBookings] = useRecoilState<IBooking[]>(bookingsState);

  const onSubmit = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn) ? data.checkIn as Dayjs : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut) ? data.checkOut as Dayjs : null;

    const bookingExists = bookings.some(booking =>
        booking.id !== data.id &&
        booking.checkIn?.isSame(checkInDate, 'day') && 
        booking.checkOut?.isSame(checkOutDate, 'day')
    );

    if (bookingExists) {
        setError('checkIn', { type: 'manual', message: 'Booking with these dates already exists!' });
        setError('checkOut', { type: 'manual', message: 'Booking with these dates already exists!' });
    } else {
        if (data.id) {
            setBookings(bookings.map(booking => booking.id === data.id ? { ...booking, checkIn: checkInDate, checkOut: checkOutDate } : booking));
        } else {
            const newBooking = { id: generateUniqueId(), checkIn: checkInDate, checkOut: checkOutDate };
            setBookings([...bookings, newBooking]);
        }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
            name="checkIn"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                  minDate={dayjs()}
                  label="Check-in"
                  {...field}
              />
            )}
        />
        {errors.checkIn && <Typography color="red">{errors.checkIn.message}</Typography>}

        <Controller
            name="checkOut"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                  label="Check-out"
                  minDate={watch('checkIn')}
                  {...field}
              />
            )}
        />
        {errors.checkOut && <Typography color="red">{errors.checkOut.message}</Typography>}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </LocalizationProvider>
      </form>
    );
};
