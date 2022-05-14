import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ThemeProvider } from "styled-components"
import { enableStaticRendering } from "mobx-react-lite"
import { QueryClient, QueryClientProvider } from "react-query"
import { SnackbarProvider } from "notistack"

import isBrowser from "./src/utils/isBrowser"
import theme from "./src/theme"
import muiTheme from "./src/muiTheme"
import TopLayout from "./src/components/TopLayout"
import "./src/global.css"

const wrapRootElement = ({ element }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnmount: true,
        refetchOnReconnect: true,
        retry: 3,
        staleTime: 5 * 60 * 1000,
      },
    },
  })

  enableStaticRendering(isBrowser())

  return (
    <TopLayout>
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
                <CssBaseline />
                {element}
              </LocalizationProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </TopLayout>
  )
}

export default wrapRootElement
