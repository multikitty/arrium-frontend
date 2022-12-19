import { Button } from "@mui/material"
import { styled as muiStyled } from "@mui/material/styles"
import theme from "@/theme"

export type StyledPaginationButtonProps = {
  grey?: boolean
  fontSize?: number
}

const allowedProps = ["grey", "fontSize"]

export const StyledPaginationButton = muiStyled(Button, {
  shouldForwardProp: prop => !allowedProps.includes(prop as string),
})<StyledPaginationButtonProps>(({ grey, fontSize = 16 }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: `${fontSize}px`,
  lineHeight: `${fontSize + fontSize / 4}px`,
  padding: `${"8px"} ${"18px"}`,
  border: "1px solid",
  borderRadius: "10px",
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
