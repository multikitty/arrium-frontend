export const BLACK = "#000000"
export const WHITE = "#FFFFFF"
export const ORANGE = "#FAB11E"
export const CYAN = "#35C6DB"
export const VIOLET = "#8059F7"
export const GREEN = "#2DB560"
export const LIGHT_GREEN = "#98D9B8"
export const RED = "#FA6464"
export const DARK_RED = "#a60000"
export const COMMON = {
  black: BLACK,
  white: WHITE,
  orange: ORANGE,
  cyan: CYAN,
  violet: VIOLET,
  green: GREEN,
  lightGreen: LIGHT_GREEN,
  red: RED,
  darkRed: DARK_RED,
} as const

export const PRIMARY = "#3071F2"
export const PRIMARY_HOVER = "#1657D9"
export const BLACK_TEXT = "#0A0A0A"
export const BACKGROUND = "#F2F3F7"
export const GREY_1 = "#F7F7FC"
export const GREY_2 = "#F0F0F7"
export const GREY_3 = "#E6E6ED"
export const GREY_4 = "#D2D3D9"
export const GREY_5 = "#A6A8B3"
export const GREY_6 = "#888A95"
export const GREY_7 = "#585A61"
export const ERROR_TEXT = "#F25555"
export const GREEN_1 = "#F5FBF7"
export const MAIN_1 = "#F7F9FF"

export const PALETTE = {
  common: COMMON,
  main: PRIMARY,
  mainHover: PRIMARY_HOVER,
  blackText: BLACK_TEXT,
  background: BACKGROUND,
  grey1: GREY_1,
  grey2: GREY_2,
  grey3: GREY_3,
  grey4: GREY_4,
  grey5: GREY_5,
  grey6: GREY_6,
  grey7: GREY_7,
  errorText: ERROR_TEXT,
  green1: GREEN_1,
  main1: MAIN_1,
} as const

export type CommonColors = keyof typeof COMMON
export type Pallete = keyof typeof PALETTE
