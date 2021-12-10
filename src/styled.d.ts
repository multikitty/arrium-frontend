import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      common: {
        black: string
        white: string
        orange: string
        cyan: string
        violet: string
        green: string
        lightGreen: string
      }
      main: string
      mainHover: string
      blackText: string
      background: string
      grey1: string
      grey2: string
      grey3: string
      grey4: string
      grey5: string
      grey6: string
      grey7: string
    }
    breakpoints: {
      web: string
    }
    sizes: {
      container: string
      topbarHeight: string
    }
    zIndices: {
      modalOverlay: number
      fullscreenLandingMenu: number
      navbar: number
      bottomImage: number
      topImage: number
    }
  }
}
