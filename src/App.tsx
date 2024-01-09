import { Booking } from "@/features/Booking";
import { ModalProvider } from "@/hooks/useModal";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <ModalProvider>
        <Booking />
      </ModalProvider>
    </RecoilRoot>
  );
}

export default App;
