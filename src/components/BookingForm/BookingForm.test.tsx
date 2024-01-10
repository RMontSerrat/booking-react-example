import { IBooking } from "@/interfaces/booking";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BookingForm } from "./BookingForm";

describe("BookingForm", () => {
  const mockOnSuccess = jest.fn();
  const defaultValues: IBooking = {
    checkIn: null,
    checkOut: null,
  };

  it("renders correctly", () => {
    render(
      <RecoilRoot>
        <ToastProvider>
          <ModalProvider>
            <BookingForm
              defaultValues={defaultValues}
              onSuccess={mockOnSuccess}
            />
          </ModalProvider>
        </ToastProvider>
      </RecoilRoot>,
    );
    expect(screen.getByLabelText(/check-in/i)).toBeTruthy();
    expect(screen.getByLabelText(/check-out/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /submit/i })).toBeTruthy();
  });

  it("submits the form with selected dates", async () => {
    render(
      <RecoilRoot>
        <ToastProvider>
          <ModalProvider>
            <BookingForm
              defaultValues={defaultValues}
              onSuccess={mockOnSuccess}
            />
          </ModalProvider>
        </ToastProvider>
      </RecoilRoot>,
    );

    fireEvent.change(screen.getByLabelText(/check-in/i), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/check-out/i), {
      target: { value: "2023-01-07" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
