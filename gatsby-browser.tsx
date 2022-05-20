import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ThemeProvider } from "styled-components"
import { QueryClient, QueryClientProvider } from "react-query"
import { SnackbarProvider } from "notistack"

import theme from "./src/theme"
import muiTheme from "./src/muiTheme"
import "./src/global.css"
import { GatsbyBrowser } from "gatsby"

const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: 3,
        staleTime: 5 * 60 * 1000,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            dense
            preventDuplicate
            maxSnack={3}
            autoHideDuration={4000}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <React.Fragment>
                <CssBaseline />
                {element}
              </React.Fragment>
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  )
}

export { wrapRootElement }
