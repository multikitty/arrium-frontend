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
          };
          (function(d) {
            var a = d.createElement('script'); a.type = 'text/javascript';
            a.async = true; a.id = 'amazon-login-sdk';
            a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
            d.getElementById('amazon-root').appendChild(a);
          })(document);`,
    }}
  ></script>,

  <script
    type="text/javascript"
    id="user-guiding-script"
    dangerouslySetInnerHTML={{
      __html: `
    (function(g,u,i,d,e,s){g[e]=g[e]||[];var f=u.getElementsByTagName(i)[0];var k=u.createElement(i);k.async=true;k.src='https://static.userguiding.com/media/user-guiding-'+s+'-embedded.js';f.parentNode.insertBefore(k,f);if(g[d])return;var ug=g[d]={q:[]};ug.c=function(n){return function(){ug.q.push([n,arguments])};};var m=['previewGuide','finishPreview','track','identify','triggerNps','hideChecklist','launchChecklist'];for(var j=0;j<m.length;j+=1){ug[m[j]]=ug.c(m[j]);}})(window,document,'script','userGuiding','userGuidingLayer','394854866ID');
    `,
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

const UnSafeSnackbarProvider = SnackbarProvider as any

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
          <UnSafeSnackbarProvider
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
          </UnSafeSnackbarProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  )
}
