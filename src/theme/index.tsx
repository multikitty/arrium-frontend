import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#3071F2",
    },
  },
  colorPalette: {
    main: "rgb(48, 113, 242)",
    mainHover: "#1657D9",
    blackText: "#0A0A0A",
    background: "#F2F3F7",
    grey1: "#F7F7FC",
    grey2: "#F0F0F7",
    grey3: "#E6E6ED",
    grey4: "#D2D3D9",
    grey5: "#A6A8B3",
    grey6: "#888A95",
    grey7: "#585A61",
    white: "#FFFFFF",
    green: "#2DB560",
    lightGreen: "#98D9B8",
    orange: "#FAB11E",
    cyan: "#35C6DB",
    violet: "#8059F7",
  },
  typography: {
    fontFamily: "Inter",
  },
  textStyles: {
    h2: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "20px",
    },
    body: {
      "16": {
        semiBold: {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "20px",
        },
        medium: {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "20px",
        },
        regular: {
          "20": {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "20px",
          },
          "24": {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "24px",
          },
        },
      },
      "14": {
        semiBold: {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "20px",
        },
        regular: {
          "16": {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "16px",
          },
          "20": {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "20px",
          },
        },
      },
    },
    copy: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "10px",
      lineHeight: "16px",
    },
  },
})

declare module "@mui/material/styles" {
  // fix the type error when referencing the Theme object in your styled component
  interface Theme {
    colorPalette?: {
      main?: string
      mainHover?: string
      blackText?: string
      background?: string
      grey1?: string
      grey2?: string
      grey3?: string
      grey4?: string
      grey5?: string
      grey6?: string
      grey7?: string
      white?: string
      green?: string
      lightGreen?: string
      orange?: string
      cyan?: string
      violet?: string
    }
    textStyles: {
      h2: {
        fontFamily: string
        fontStyle: string
        fontWeight: string
        fontSize: string
        lineHeight: string
      }
      body: {
        16: {
          semiBold: {
            fontFamily: string
            fontStyle: string
            fontWeight: string
            fontSize: string
            lineHeight: string
          }
          medium: {
            fontFamily: string
            fontStyle: string
            fontWeight: string
            fontSize: string
            lineHeight: string
          }
          regular: {
            20: {
              fontFamily: string
              fontStyle: string
              fontWeight: string
              fontSize: string
              lineHeight: string
            }
            24: {
              fontFamily: string
              fontStyle: string
              fontWeight: string
              fontSize: string
              lineHeight: string
            }
          }
        }
        14: {
          semiBold: {
            fontFamily: string
            fontStyle: string
            fontWeight: string
            fontSize: string
            lineHeight: string
          }
          regular: {
            16: {
              fontFamily: string
              fontStyle: string
              fontWeight: string
              fontSize: string
              lineHeight: string
            }
            20: {
              fontFamily: string
              fontStyle: string
              fontWeight: string
              fontSize: string
              lineHeight: string
            }
          }
        }
      }
      copy: {
        fontFamily: string
        fontStyle: string
        fontWeight: string
        fontSize: string
        lineHeight: string
      }
    }
  }
  // fix the type error when calling `createTheme()` with a custom theme option
  interface ThemeOptions extends Theme {}
}

export default theme
