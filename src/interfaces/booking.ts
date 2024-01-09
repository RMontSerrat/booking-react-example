import { Dayjs } from "dayjs";

export interface IBooking {
  id?: string;
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
}
