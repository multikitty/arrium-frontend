import pxSuffix from "@/utils/pxSuffix"

export enum Sizes {
  container = 1280,
  topbarHeight = 64,
  web = 768,
  desktop = 1280,
}

export enum ZIndices {
  modalOverlay = 990,
  fullscreenLandingMenu = 999,
  navbar = 998,
  bottomImage = 2,
  topImage = 3,
}

export const devices = {
  web: {
    up: `(min-width: ${pxSuffix(Sizes.web)})`,
    down: `(max-width: ${pxSuffix(Sizes.web)})`,
  },
  desktop: {
    up: `(min-width: ${pxSuffix(Sizes.desktop)})`,
    down: `(max-width: ${pxSuffix(Sizes.desktop)})`,
  },
}
