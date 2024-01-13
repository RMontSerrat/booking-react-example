import { ModalProvider } from "@/providers/ModalProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { Booking } from "./Booking";

jest.mock("@/hooks/useBookingManagement", () => ({
  useBookingManagement: () => ({
    deleteBooking: jest.fn(),
    bookings: [
      {
        id: "1",
        checkIn: new Date("2022-01-01"),
        checkOut: new Date("2022-01-02"),
      },
      {
        id: "2",
        checkIn: new Date("2022-01-03"),
        checkOut: new Date("2022-01-04"),
      },
    ],
  }),
}));

jest.mock("@/hooks/useModal", () => ({
  useModal: () => ({
    openModal: jest.fn(),
  }),
}));

jest.mock("@/hooks/useToast", () => ({
  useToast: () => ({
    addToast: jest.fn(),
  }),
}));

describe("<Booking />", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <RecoilRoot>
        <ToastProvider>
          <ModalProvider>
            <Booking />
          </ModalProvider>
        </ToastProvider>
      </RecoilRoot>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
