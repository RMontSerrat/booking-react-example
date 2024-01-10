import { act } from "@testing-library/react-hooks";
import { useBookingForm } from "./useBookingForm";
import { renderHook } from "@testing-library/react";
import dayjs from "dayjs";

const mockedSetError = jest.fn();
const mockedAddBooking = jest.fn();
const mockedEditBooking = jest.fn();
let mockedCheckExistingBooking = jest.fn(() => false);

jest.mock("@/hooks/useBooking", () => ({
  useBooking: () => ({
    addBooking: mockedAddBooking,
    editBooking: mockedEditBooking,
    checkExistingBooking: mockedCheckExistingBooking,
  }),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    formState: {},
  }),
}));

jest.mock("@/hooks/useToast", () => ({
  useToast: () => ({
    addToast: mockedSetError,
  }),
}));

describe("useBookingForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should handle adding a new booking correctly", () => {
    const { result } = renderHook(() => useBookingForm());
    const newBookingData = {
      checkIn: dayjs(),
      checkOut: dayjs().add(1, "day"),
    };

    act(() => {
      result.current.onSubmit(newBookingData);
    });

    expect(mockedAddBooking).toHaveBeenCalledWith(newBookingData);
    expect(mockedCheckExistingBooking).toHaveBeenCalled();
    expect(mockedEditBooking).not.toHaveBeenCalled();
  });

  test("should handle adding a existing booking correctly", () => {
    const { result } = renderHook(() => useBookingForm());
    const newBookingData = {
      id: "1",
      checkIn: dayjs(),
      checkOut: dayjs().add(1, "day"),
    };

    act(() => {
      result.current.onSubmit(newBookingData);
    });

    expect(mockedAddBooking).not.toHaveBeenCalled();
    expect(mockedCheckExistingBooking).toHaveBeenCalledWith(newBookingData);
    expect(mockedEditBooking).toHaveBeenCalledWith(newBookingData);
  });

  test("should handle adding a existing booking correctly", () => {
    mockedCheckExistingBooking = jest.fn(() => true);
    const { result } = renderHook(() => useBookingForm());
    const newBookingData = {
      id: "1",
      checkIn: dayjs(),
      checkOut: dayjs().add(1, "day"),
    };

    act(() => {
      result.current.onSubmit(newBookingData);
    });

    expect(mockedCheckExistingBooking).toHaveBeenCalledWith(newBookingData);
    expect(mockedAddBooking).not.toHaveBeenCalled();
    expect(mockedEditBooking).not.toHaveBeenCalled();
    expect(mockedSetError).toHaveBeenCalled();
  });
});
