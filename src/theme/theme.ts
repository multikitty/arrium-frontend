import { PALETTE } from "@/constants/colors"
import { Sizes } from "@/constants/device"
import pxSuffix from "@/utils/pxSuffix"

const theme = {
  palette: PALETTE,
  breakpoints: {
    web: pxSuffix(Sizes.web),
  },
  sizes: {
    container: pxSuffix(Sizes.container),
    topbarHeight: pxSuffix(Sizes.topbarHeight),
  },
  zIndices: {
    modalOverlay: 990,
    drawer: 989,
    fullscreenLandingMenu: 999,
    navbar: 998,
    bottomImage: 2,
    topImage: 3,
  },
}

export default theme
