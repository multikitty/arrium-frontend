import React, { useEffect } from "react"
import { useTheme } from "@mui/material"
import useWindowSize from "@/hooks/useWindowSize"
import JsVectorMap from "jsvectormap"
import "jsvectormap/dist/maps/world"
import "jsvectormap/dist/css/jsvectormap.css"
import { lighten } from "polished"
import { isBrowser } from "@/utils"

interface IVectorMap {
  setSelectedRegion:
    | React.Dispatch<React.SetStateAction<string>>
    | ((region: string) => void)
  zoomOnScroll?: boolean
  regionsSelectable?: boolean
  regionsSelectableOne?: boolean
  height?: string | number
  width?: string | number
}

const VectorMap: React.FC<IVectorMap> = ({
  setSelectedRegion,
  zoomOnScroll = false,
  regionsSelectable = true,
  regionsSelectableOne = true,
  height = 520,
  width = "100%",
}) => {
  const theme = useTheme()
  const { width: windowWidth } = useWindowSize()

  useEffect(() => {
    const id = document.getElementById("map")
    if (id) id.innerHTML = ""

    const map = new JsVectorMap({
      selector: "#map",
      map: "world",
      zoomOnScroll,
      regionsSelectable,
      regionsSelectableOne,
      series: {
        regions: [
          {
            attribute: "fill",
            scale: {
              myScaleOne: lighten(0.2, theme.palette.primary.main),
              myScaleTwo: lighten(0.2, theme.palette.secondary.main),
            },
            values: {
              ES: "myScaleOne",
              GB: "myScaleTwo",
            },
          },
        ],
      },
      onRegionSelected(code: string) {
        setSelectedRegion(code)
      },
    })

    const handleUpdateSize = () => map.updateSize()
    isBrowser() && window.addEventListener("resize", handleUpdateSize)

    return () => {
      map.destroy()
      isBrowser() && window.removeEventListener("resize", handleUpdateSize)
    }
  }, [windowWidth])

  return (
    <div
      id="map"
      style={{
        width,
        height,
        marginTop: 20,
        marginBottom: 10,
      }}
    />
  )
}

export default VectorMap
