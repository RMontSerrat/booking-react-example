import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dayjs } from 'dayjs';

interface BookingCardProps {
  children: React.ReactNode;
}

export function BookingCard({ children }: BookingCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

interface CheckinCheckoutLabelProps {
  date: Dayjs | null;
}

function CheckinLabel({ date }: CheckinCheckoutLabelProps) {
  return (
    <Typography>Check-in: {date?.format('DD/MM/YYYY')}</Typography>
  );
};

function CheckoutLabel({ date }: CheckinCheckoutLabelProps) {
  return (
    <Typography>Check-out: {date?.format('DD/MM/YYYY')}</Typography>
  );
};

interface EditProps {
  onEdit: () => void;
}

function Edit({ onEdit }: EditProps) {
  return (
    <IconButton onClick={onEdit}>
      <EditIcon />
    </IconButton>
  );
};

interface DeleteProps {
  onDelete: () => void;
}

function Delete({ onDelete }: DeleteProps) {
  return (
    <IconButton onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  );
};

BookingCard.Actions = CardActions;
BookingCard.CheckinLabel = CheckinLabel;
BookingCard.CheckoutLabel = CheckoutLabel;
BookingCard.Delete = Delete;
BookingCard.Edit = Edit;
