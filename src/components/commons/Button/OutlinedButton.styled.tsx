import { Button } from "@mui/material"
import { rem } from "polished"
import { styled as muiStyled } from "@mui/material/styles"
import theme from "@/theme"

export const StyledOutlinedButton = muiStyled(Button, {
  shouldForwardProp: prop => prop !== "grey" && prop !== "fontSize",
})<{ grey?: boolean; fontSize?: number }>(({ grey, fontSize = 16 }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: rem(`${fontSize}px`),
  lineHeight: rem(`${fontSize + fontSize / 4}px`),
  padding: `${rem("14px")} ${rem("28px")}`,
  border: "1px solid",
  borderRadius: rem("10px"),
  backgroundColor: theme.palette.common.white,
  borderColor: grey ? theme.palette.grey3 : theme.palette.main,
  fontFamily: ["Inter", "sans-serif"].join(","),
  "&:hover": {
    boxShadow: "none",
    borderColor: theme.palette.mainHover,
  },

  "&:active": {
    boxShadow: "none",
    borderColor: theme.palette.mainHover,
  },

  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },

  "& > a": {
    color: `${theme.palette.grey7}`,
    textDecoration: "none",
  },
}))
