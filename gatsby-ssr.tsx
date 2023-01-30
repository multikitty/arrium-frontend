// Import React so that you can use JSX in HeadComponents
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
import { GatsbySSR } from "gatsby"

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

const PreBodyComponents = [<div id="amazon-root"></div>]

const PostBodyComponents = [
  <script
    type="text/javascript"
    id="amazon-sdk-setup"
    dangerouslySetInnerHTML={{
      __html: `window.onAmazonLoginReady = function() {
            // TODO: Replace the Client ID with env variable
            amazon.Login.setClientId("amzn1.application-oa2-client.cdff02c8bfb34434a61941e9836410f7");
            console.log("script logging test");
          };
          (function(d) {
            var a = d.createElement('script'); a.type = 'text/javascript';
            a.async = true; a.id = 'amazon-login-sdk';
            a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
            d.getElementById('amazon-root').appendChild(a);
          })(document);`,
    }}
  ></script>,
]

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setHeadComponents,
  setPreBodyComponents,
  setPostBodyComponents,
}) => {
  setHtmlAttributes(HtmlAttributes)
  setHeadComponents(HeadComponents)
  setPreBodyComponents(PreBodyComponents)
  setPostBodyComponents(PostBodyComponents)
}

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
