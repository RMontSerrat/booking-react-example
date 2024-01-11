import { BookingFormInput } from "@/hooks/useBookingForm";
import { IBooking } from "@/interfaces/booking";
import { generateUniqueId } from "@/utils";
import dayjs, { Dayjs } from "dayjs";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const bookingsState = atom<IBooking[]>({
  key: "bookingsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const useBooking = () => {
  const [bookings, setBookings] = useRecoilState<IBooking[]>(bookingsState);

  const deleteBooking = (bookingId: string) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  const checkExistingBooking = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn)
      ? (data.checkIn as Dayjs)
      : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut)
      ? (data.checkOut as Dayjs)
      : null;

    return bookings.some(
      (booking) =>
        booking.id !== data.id &&
        dayjs(booking.checkIn)?.isSame(checkInDate, "day") &&
        dayjs(booking.checkOut)?.isSame(checkOutDate, "day"),
    );
  };

  const addBooking = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn)
      ? (data.checkIn as Dayjs)
      : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut)
      ? (data.checkOut as Dayjs)
      : null;

    const newBooking = {
      id: generateUniqueId(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
    };
    setBookings([...bookings, newBooking]);
  };

  const editBooking = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn)
      ? (data.checkIn as Dayjs)
      : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut)
      ? (data.checkOut as Dayjs)
      : null;

    setBookings(
      bookings.map((booking) =>
        booking.id === data.id
          ? { ...booking, checkIn: checkInDate, checkOut: checkOutDate }
          : booking,
      ),
    );
  };

  return {
    bookings,
    deleteBooking,
    editBooking,
    addBooking,
    checkExistingBooking,
  };
};
