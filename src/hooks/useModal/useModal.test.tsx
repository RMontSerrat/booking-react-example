import { act, render, screen } from "@testing-library/react";
import { ModalProvider, useModal } from "./useModal";

describe("ModalProvider", () => {
  test("should render children and provide modal context", () => {
    const ChildComponent = () => {
      const { openModal, closeModal } = useModal();

      return (
        <>
          <button onClick={() => openModal({ body: <div>Modal Content</div> })}>
            Open Modal
          </button>
          <button onClick={closeModal}>Close Modal</button>
        </>
      );
    };

    render(
      <ModalProvider>
        <ChildComponent />
      </ModalProvider>,
    );

    act(() => {
      screen.getByText("Open Modal").click();
    });
    expect(screen.getByText("Modal Content")).toBeTruthy();

    act(() => {
      screen.getByText("Close Modal").click();
    });
    expect(screen.queryByText("Modal Content")).not.toBeTruthy();
  });

  test("should handle custom onClose", () => {
    const onCloseMock = jest.fn();
    const ChildComponent = () => {
      const { openModal, closeModal } = useModal();

      return (
        <>
          <button
            onClick={() =>
              openModal({
                body: <div>Modal Content</div>,
                onClose: onCloseMock,
              })
            }
          >
            Open Modal
          </button>
          <button onClick={closeModal}>Close Modal</button>
        </>
      );
    };

    render(
      <ModalProvider>
        <ChildComponent />
      </ModalProvider>,
    );

    act(() => {
      screen.getByText("Open Modal").click();
    });

    act(() => {
      screen.getByText("Close Modal").click();
    });

    expect(onCloseMock).toHaveBeenCalled();
  });
});
