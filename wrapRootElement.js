import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ThemeProvider } from "styled-components"
import { enableStaticRendering } from "mobx-react-lite"

import isBrowser from "./src/utils/isBrowser"
import theme from "./src/theme"
import muiTheme from "./src/muiTheme"
import TopLayout from "./src/components/TopLayout"

const wrapRootElement = ({ element }) => {
  enableStaticRendering(isBrowser())
  return (
    <TopLayout>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {element}
          </LocalizationProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </TopLayout>
  )
}

export default wrapRootElement
