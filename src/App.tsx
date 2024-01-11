import { Booking } from "@/features/Booking";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToastProvider } from "@/providers/ToastProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RecoilRoot } from "recoil";

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
