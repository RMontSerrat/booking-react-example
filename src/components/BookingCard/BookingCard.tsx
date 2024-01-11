import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CardActions, IconButton, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import React from "react";
import { Card, CardContent } from "./BookingCard.styles";

interface BookingCardProps {
  children: React.ReactNode;
}

export function BookingCard({ children }: BookingCardProps) {
  return <Card variant="outlined">{children}</Card>;
}

interface CheckinCheckoutLabelProps {
  date: Dayjs | null;
}

function CheckinLabel({ date }: CheckinCheckoutLabelProps) {
  return (
    <Typography>
      <strong>Check-in:</strong> {date?.format?.("MM/DD/YYYY")}
    </Typography>
  );
}

function CheckoutLabel({ date }: CheckinCheckoutLabelProps) {
  return (
    <Typography>
      <strong>Check-out:</strong> {date?.format?.("MM/DD/YYYY")}
    </Typography>
  );
}

interface EditProps {
  onEdit: () => void;
}

function Edit({ onEdit }: EditProps) {
  return (
    <IconButton onClick={onEdit}>
      <EditIcon />
    </IconButton>
  );
}

interface DeleteProps {
  onDelete: () => void;
}

function Delete({ onDelete }: DeleteProps) {
  return (
    <IconButton onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  );
}

BookingCard.Actions = CardActions;
BookingCard.Content = CardContent;
BookingCard.CheckinLabel = CheckinLabel;
BookingCard.CheckoutLabel = CheckoutLabel;
BookingCard.Delete = Delete;
BookingCard.Edit = Edit;
