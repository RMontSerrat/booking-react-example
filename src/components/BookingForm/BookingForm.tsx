import React from 'react';
import { Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useBookingForm } from '@/hooks/useBookingForm/useBookingForm';

export function BookingForm({ defaultValues = {} }) {
  const { control, handleSubmit, errors, watch, onSubmit } = useBookingForm(defaultValues);

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
