import { Booking } from "@/features/Booking";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { ThemeProvider } from "@emotion/react";

import { GlobalStyles } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <ModalProvider>
            <Booking />
          </ModalProvider>
        </ToastProvider>
        <GlobalStyles />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
