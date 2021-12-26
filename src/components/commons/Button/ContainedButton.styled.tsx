import { Button } from "@mui/material"
import { rem } from "polished"
import { styled as muiStyled } from "@mui/material/styles"
import theme from "../../../theme"

export const StyledContainedButton = muiStyled(Button, {
  shouldForwardProp: prop => prop !== "iconButton",
})<{ iconButton?: boolean }>(({ iconButton }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: rem("16px"),
  lineHeight: rem("20px"),
  backgroundColor: theme.palette.main,
  padding: iconButton ? rem("4px") : `${rem("14px")} ${rem("28px")}`,
  minWidth: iconButton ? 0 : "64px",
  borderRadius: iconButton ? rem("4px") : rem("10px"),
  border: "1px solid",
  borderColor: theme.palette.main,
  fontFamily: ["Inter", "sans-serif"].join(","),

  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.mainHover,
    borderColor: theme.palette.main,
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: theme.palette.main,
    borderColor: theme.palette.mainHover,
  },

  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}))
