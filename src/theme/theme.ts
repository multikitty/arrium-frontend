import { Sizes } from "@/constants/device"
import pxSuffix from "@/utils/pxSuffix"

const theme = {
  palette: {
    common: {
      black: "#000000",
      white: "#FFFFFF",
      orange: "#FAB11E",
      cyan: "#35C6DB",
      violet: "#8059F7",
      green: "#2DB560",
      lightGreen: "#98D9B8",
      red: "#FA6464",
    },
    main: "#3071F2",
    mainHover: "#1657D9",
    blackText: "#0A0A0A",
    background: "#F2F3F7",
    grey1: "#F7F7FC",
    grey2: "#F0F0F7",
    grey3: "#E6E6ED",
    grey4: "#D2D3D9",
    grey5: "#A6A8B3",
    grey6: "#888A95",
    grey7: "#585A61",
    errorText: "#F25555",
  },
  breakpoints: {
    web: pxSuffix(Sizes.web),
  },
  sizes: {
    container: pxSuffix(Sizes.container),
    topbarHeight: pxSuffix(Sizes.topbarHeight),
  },
  zIndices: {
    modalOverlay: 990,
    fullscreenLandingMenu: 999,
    navbar: 998,
    bottomImage: 2,
    topImage: 3,
  },
}

export default theme
