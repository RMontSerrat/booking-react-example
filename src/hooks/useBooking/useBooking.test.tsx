import { renderHook } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import React from "react";
import { RecoilRoot } from "recoil";
import { bookingsState, useBooking } from "./useBooking";

import dayjs from "dayjs";

jest.mock("@/hooks/useModal", () => ({
  useModal: () => ({
    openModal: jest.fn(),
  }),
}));

const mockInitialState = [
  { id: "1", checkIn: dayjs("2022-01-01"), checkOut: dayjs("2022-01-02") },
  { id: "2", checkIn: dayjs("2022-01-03"), checkOut: dayjs("2022-01-04") },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(bookingsState, mockInitialState);
    }}
  >
    {children}
  </RecoilRoot>
);

describe("useBooking", () => {
  test("should detect complete overlap in bookings", () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    expect(
      result.current.checkIsBookingOverlapping({
        checkIn: dayjs("2022-01-01"),
        checkOut: dayjs("2022-01-05"),
      }),
    ).toEqual(true);
  });

  test("should detect when a booking envelops an existing booking", () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    expect(
      result.current.checkIsBookingOverlapping({
        checkIn: dayjs("2021-12-31"),
        checkOut: dayjs("2022-01-05"),
      }),
    ).toEqual(true);
  });

  test("should not detect overlap for booking starting or ending on the same day without overlap", () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    expect(
      result.current.checkIsBookingOverlapping({
        checkIn: dayjs("2022-01-02"),
        checkOut: dayjs("2022-01-03"),
      }),
    ).toEqual(false);
  });

  test("should not detect overlap for completely separate bookings", () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    expect(
      result.current.checkIsBookingOverlapping({
        checkIn: dayjs("2022-01-05"),
        checkOut: dayjs("2022-01-06"),
      }),
    ).toEqual(false);
  });

  test("should handle addBooking correctly", () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.addBooking({
        checkIn: dayjs("2022-01-01"),
        checkOut: dayjs("2022-01-05"),
      });
    });
    expect(result.current.bookings.length).toEqual(3);
  });

  test("should handle editBooking correctly", () => {
    const { result } = renderHook(() => useBooking(), { wrapper });
    const booking = result.current.bookings[0];

    act(() => {
      result.current.editBooking({
        id: booking.id,
        checkIn: dayjs("2022-01-02"),
        checkOut: dayjs("2022-01-03"),
      });
    });
    expect(dayjs(result.current.bookings[0].checkIn).date()).toEqual(2);
  });

  test("should handle deleteBooking correctly", () => {
    const { result } = renderHook(() => useBooking(), { wrapper });
    act(() => {
      result.current.deleteBooking("1");
    });
    expect(result.current.bookings.length).toEqual(2);
  });
});
