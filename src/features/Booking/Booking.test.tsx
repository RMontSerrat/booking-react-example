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
        checkIn: new Date("2022-01-01T00:00:00"),
        checkOut: new Date("2022-01-02T00:00:00"),
      },
      {
        id: "2",
        checkIn: new Date("2022-01-03T00:00:00"),
        checkOut: new Date("2022-01-04T00:00:00"),
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
