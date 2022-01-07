import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import muiTheme from "../../muiTheme"
import { ThemeProvider } from "styled-components"
import theme from "../../theme"
import "./TopLayout.css"
import { ChildrenProps } from "../AdminLayout/AdminLayout.types"

const TopLayout = ({ children }: ChildrenProps) => {
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
