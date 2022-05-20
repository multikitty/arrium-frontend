// Import React so that you can use JSX in HeadComponents
import React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ThemeProvider } from "styled-components"
import { QueryClient, QueryClientProvider } from "react-query"
import { SnackbarProvider } from "notistack"

const HtmlAttributes = {
  lang: "en",
}

const HeadComponents = [
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/jsvectormap/dist/css/jsvectormap.min.css"
  />,
  <script src="https://cdn.jsdelivr.net/npm/jsvectormap"></script>,
  <script src="https://cdn.jsdelivr.net/npm/jsvectormap/dist/maps/world.js"></script>,
]

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
  setHtmlAttributes,
}) => {
  setHtmlAttributes(HtmlAttributes)
  setHeadComponents(HeadComponents)
}

import theme from "./src/theme"
import muiTheme from "./src/muiTheme"
import "./src/global.css"
import { GatsbySSR } from "gatsby"

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
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
