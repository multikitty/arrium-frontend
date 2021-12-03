import { Button } from "@mui/material"
import { rem } from "polished"
import { styled as muiStyled } from "@mui/material/styles"
import theme from "../../../theme"

export const StyledContainedButton = muiStyled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: rem("16px"),
  lineHeight: rem("20px"),
  padding: `${rem("14px")} ${rem("28px")}`,
  border: "1px solid",
  borderRadius: rem("10px"),
  backgroundColor: theme.palette.main,
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
})
