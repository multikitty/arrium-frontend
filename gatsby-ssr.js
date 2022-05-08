import wrapRootElement from "./wrapRootElement"
// Import React so that you can use JSX in HeadComponents
import React from "react"

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

const BodyAttributes = {
  "data-theme": "dark",
}

export const onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
  pluginOptions
) => {
  setHtmlAttributes(HtmlAttributes)
  setHeadComponents(HeadComponents)
  setBodyAttributes(BodyAttributes)
}

export { wrapRootElement }
