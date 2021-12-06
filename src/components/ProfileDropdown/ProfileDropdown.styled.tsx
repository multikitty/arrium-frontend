import { rem } from "polished"
import styled from "styled-components"
import { styled as muiStyled } from "@mui/material/styles"
import { Button } from "@mui/material"
import theme from "../../theme"

export const StyledProfileDropdownUpperSection = styled.div`
  margin-top: ${rem("16px")};
  padding: ${rem("24px")};
`

export const StyledProfileDropdownUpperSectionUsername = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("24px")};
  line-height: ${rem("28px")};
  margin-bottom: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledProfileDropdownUpperSectionVerificationContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${rem("12px")};
`

export const StyledProfileDropdownUpperSectionVerificationText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};
  margin-right: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`
export const StyledProfileDropdownUpperSectionVerificationButton = muiStyled(
  Button
)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: rem("16px"),
  lineHeight: rem("20px"),
  padding: `${rem("6px")} ${rem("16px")}`,
  border: "1px solid",
  borderRadius: rem("10px"),
  backgroundColor: theme.palette.common.white,
  borderColor: theme.palette.grey3,
  color: theme.palette.grey7,
  fontFamily: ["Inter", "sans-serif"].join(","),
  width: "max-content",

  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.grey4,
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.grey4,
  },

  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
})

export const StyledProfileDropdownMenuItemText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`
