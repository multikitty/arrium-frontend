import { Button } from "@mui/material"
import { darken, rem, rgba } from "polished"
import { styled as muiStyled } from "@mui/material/styles"
import theme from "../../../theme"

export const StyledContainedButton = muiStyled(Button, {
  shouldForwardProp: prop => prop !== "iconButton" && prop !== "error",
})<{ iconButton?: boolean; error?: boolean }>(({ iconButton, error }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: rem("16px"),
  lineHeight: rem("20px"),
  backgroundColor: error ? theme.palette.errorText : theme.palette.main,
  padding: iconButton ? rem("4px") : `${rem("14px")} ${rem("28px")}`,
  minWidth: iconButton ? 0 : "64px",
  borderRadius: iconButton ? rem("4px") : rem("10px"),
  border: "1px solid",
  borderColor: error ? theme.palette.errorText : theme.palette.main,
  fontFamily: ["Inter", "sans-serif"].join(","),

  "&:hover": {
    boxShadow: "none",
    backgroundColor: error
      ? darken(0.2, theme.palette.errorText)
      : theme.palette.mainHover,
    borderColor: error ? theme.palette.errorText : theme.palette.main,
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: error
      ? darken(0.2, theme.palette.errorText)
      : theme.palette.main,
    borderColor: error
      ? darken(0.2, theme.palette.errorText)
      : theme.palette.mainHover,
  },

  "&:focus": {
    boxShadow: error
      ? `"0 0 0 0.2rem ${rgba(darken(0.2, theme.palette.errorText), 0.5)}`
      : "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}))
