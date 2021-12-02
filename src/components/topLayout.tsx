import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import muiTheme from "../muiTheme"
import "./topLayout.css"
import { ThemeProvider } from "styled-components"
import theme from "../theme"

const TopLayout = ({ children }: any) => {
  return (
    <>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}

export default TopLayout
