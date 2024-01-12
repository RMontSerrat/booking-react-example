import { BookingFormInput } from "@/hooks/useBookingForm";
import { IBooking } from "@/interfaces/booking";
import { generateUniqueId } from "@/utils";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

  const checkIsBookingOverlapping = (data: BookingFormInput) => {
    const checkInDate = dayjs.isDayjs(data.checkIn) ? data.checkIn : null;
    const checkOutDate = dayjs.isDayjs(data.checkOut) ? data.checkOut : null;

    if (!checkInDate || !checkOutDate) {
      return false;
    }

    const isDateOverlapping = (
      existingCheckIn: Dayjs,
      existingCheckOut: Dayjs,
    ) => {
      const overlapsWithExisting =
        (checkInDate.isSameOrAfter(existingCheckIn, "day") &&
          checkInDate.isBefore(existingCheckOut, "day")) ||
        (checkOutDate.isAfter(existingCheckIn, "day") &&
          checkOutDate.isSameOrBefore(existingCheckOut, "day"));

      const envelopsExisting =
        checkInDate.isBefore(existingCheckIn, "day") &&
        checkOutDate.isAfter(existingCheckOut, "day");

      return overlapsWithExisting || envelopsExisting;
    };

    return bookings.some((booking) => {
      const existingCheckIn = dayjs(booking.checkIn);
      const existingCheckOut = dayjs(booking.checkOut);

      return (
        booking.id !== data.id &&
        isDateOverlapping(existingCheckIn, existingCheckOut)
      );
    });
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
    checkIsBookingOverlapping,
  };
};
