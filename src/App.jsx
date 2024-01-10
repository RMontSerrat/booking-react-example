import { Booking } from "@/features/Booking";
import { ModalProvider } from "@/hooks/useModal";
import { ToastProvider } from "@/hooks/useToast";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <ToastProvider>
        <ModalProvider>
          <Booking />
        </ModalProvider>
        </ToastProvider>
    </RecoilRoot>
  );
}

export default App;
