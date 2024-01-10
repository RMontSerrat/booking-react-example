import { Typography } from "@mui/material";
import {
  DatePicker as DatePickerBase,
  DatePickerProps as DatePickerBaseProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Container } from "./DatePicker.styles";

interface DatePickerProps extends DatePickerBaseProps<Dayjs> {
  error?: string;
}

export function DatePicker({ error, ...props }: DatePickerProps) {
  return (
    <Container>
      <DatePickerBase {...props} />
      {!!error && (
        <Typography fontSize="12px" color="red">
          {error}
        </Typography>
      )}
    </Container>
  );
}
