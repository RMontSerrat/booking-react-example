import { indigo, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    warning: {
      main: yellow[700],
    },
  },
});
