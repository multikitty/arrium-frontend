import { createTheme } from "@mui/material/styles"
import { Sizes } from "@/constants/device"

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: Sizes.web,
      md: 980,
      lg: Sizes.desktop,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "hsl(220, 88%, 57%)",
      dark: "hsl(220, 88%, 47%)",
      light: "hsl(220, 88%, 67%)",
    },
    background: {
      default: "#F2F3F7",
    },
    grey: {
      "100": "#F7F7FC",
      "200": "#F0F0F7",
      "300": "#E6E6ED",
      "400": "#D2D3D9",
      "500": "#A6A8B3",
      "600": "#888A95",
      "700": "#585A61",
    },
    error: {
      main: "#F25555",
    },
    text: {
      secondary: "#0A0A0A",
    },
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
})

export default theme
