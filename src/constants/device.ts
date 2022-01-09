export const screenSizes = {
  web: 768,
  desktop: 1280,
}

export const devices = {
  web: {
    up: `(min-width: ${screenSizes.web}px)`,
    down: `(max-width: ${screenSizes.web}px)`,
  },
  desktop: {
    up: `(min-width: ${screenSizes.desktop}px)`,
    down: `(max-width: ${screenSizes.desktop}px)`,
  },
}
