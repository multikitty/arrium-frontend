import React from "react"
import styled from "styled-components"
import { rem } from "polished"
import { Tab, Tabs, styled as muiStyled, Button } from "@mui/material"

export const StyledTitle = styled.p`
  font-weight: 700;
  font-size: ${rem("34px")};
  color: #2453b2;
  line-height: ${rem("32px")};
  letter-spacing: 1.6px;
  margin-top: ${rem("80px")};
  margin-bottom: ${rem("56px")};
  text-transform: uppercase;
  cursor: pointer;
`

export const StyledLoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${rem("20px")};
  background-color: #f2f3f7;
  padding: ${rem("40px")};
  width: ${rem("458px")};
`

export const StyledCardHeader = styled.h4`
  font-size: 28px;
  line-height: 32px;
  font-weight: 400;
  text-align: center;
  color: #0a0a0a;
  padding: 0 40px;
  margin-bottom: 40px;
`

export const StyledButton = styled(Button)<{ $marginTop?: string }>`
  &&& {
    color: white;
    text-transform: none;
    border-radius: 10px;
    padding: ${rem("14px")} ${rem("28px")};
    margin-top: ${p => p.$marginTop};
    & > a {
      color: #ffffff;
      text-decoration: none;
    }
  }
`

export const StyledButtonText = styled.h5`
  font-size: ${rem("16px")};
  font-weight: 500;
  line-height: ${rem("20px")};
  width: 100%;
  color: #ffffff;
`

export const StyledSignUpText = styled.h5`
  margin-top: ${rem("16px")};
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("20px")};
  color: #888a95;
`

export const StyledSignUpButton = styled.span`
  cursor: pointer;
  font-size: ${rem("16px")};
  font-weight: 600;
  color: #0a0a0a;
  line-height: ${rem("20px")};
  margin-left: ${rem("4px")};
  & > a {
    color: #0a0a0a;
    text-decoration: none;
  }
`

export const StyledTitleMobile = styled.div`
  font-weight: 800;
  font-size: ${rem("24px")};
  color: #2453b2;
  text-align: center;
  line-height: ${rem("32px")};
  letter-spacing: 1.6px;
  text-transform: uppercase;
  margin: ${rem("16px")} auto ${rem("16px")} ${rem("20px")};
  cursor: pointer;
`

export const StyledLoginContainerMobile = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #f2f3f7;
  width: 100%;
  min-width: ${rem("300px")};
  min-height: 92vh;
  padding: ${rem("20px")};
`

export const StyledWarningText = styled.p<{
  marginbottom?: string
  marginTop?: string
}>`
  color: #f25555;
  font-size: ${rem("16px")};
  font-weight: 500;
  line-height: ${rem("20px")};
  margin-bottom: ${p => p.marginbottom};
  margin-top: ${p => p.marginTop};
`

interface StyledTabProps {
  label: string
  value: any
}

export const StyledTabs = muiStyled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
})

export const StyledTab = muiStyled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "capitalize",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  color: "#585A61",
  fontFamily: ["Inter", "sans-serif"].join(","),
  fontSize: rem("20px"),
  fontWeight: 600,
  "&:hover": {
    color: "#3071F2",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#3071F2",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}))

export const StyledPlaceholder = styled.span`
  color: ${p => p.theme.palette.grey6};
`

export const StyledFieldLabel = styled.span<{ $isHidden?: boolean }>`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("12px")};
  line-height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  opacity: ${p => (p.$isHidden ? 0 : 1)};

  color: #${p => p.theme.palette.grey6};

  transition: opacity 150ms ease-out;
`
