import { renderHook } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import dayjs from "dayjs";
import { useBookingForm } from "./useBookingForm";

const mockedSetError = jest.fn();
const mockedAddBooking = jest.fn();
const mockedEditBooking = jest.fn();
let mockedcheckIsBookingOverlapping = jest.fn(() => false);

jest.mock("@/hooks/useBookingManagement", () => ({
  useBookingManagement: () => ({
    addBooking: mockedAddBooking,
    editBooking: mockedEditBooking,
    checkIsBookingOverlapping: mockedcheckIsBookingOverlapping,
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
    expect(mockedcheckIsBookingOverlapping).toHaveBeenCalled();
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
    expect(mockedcheckIsBookingOverlapping).toHaveBeenCalledWith(
      newBookingData,
    );
    expect(mockedEditBooking).toHaveBeenCalledWith(newBookingData);
  });

  test("should handle adding a existing booking correctly", () => {
    mockedcheckIsBookingOverlapping = jest.fn(() => true);
    const { result } = renderHook(() => useBookingForm());
    const newBookingData = {
      id: "1",
      checkIn: dayjs(),
      checkOut: dayjs().add(1, "day"),
    };

    act(() => {
      result.current.onSubmit(newBookingData);
    });

    expect(mockedcheckIsBookingOverlapping).toHaveBeenCalledWith(
      newBookingData,
    );
    expect(mockedAddBooking).not.toHaveBeenCalled();
    expect(mockedEditBooking).not.toHaveBeenCalled();
    expect(mockedSetError).toHaveBeenCalled();
  });
});
