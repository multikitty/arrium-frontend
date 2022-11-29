import React from "react"
import styled, { css } from "styled-components"
import { rem } from "polished"
import {
  Tab,
  Tabs,
  styled as muiStyled,
  Box,
  Button,
  TextField,
} from "@mui/material"

export const StyledInputField = styled(TextField)<{
  mb?: string
  $isCentered?: boolean
  $maxWidth?: string
  $minWidth?: string
  $centerInput?: boolean
}>`
  &&& {
    background-color: #ffffff;
    width: 100%;
    height: ${rem("52px")};
    border: none;
    outline: none;
    ${p =>
      p.$isCentered &&
      css`
        margin: 0 auto;
      `}
    ${p =>
      p.mb
        ? css`
            margin-bottom: ${p.mb};
          `
        : css`
            margin-bottom: ${rem("16px")};
          `};
    border-radius: ${rem("10px")};

    & > .MuiOutlinedInput-root {
      max-width: ${p => rem(p.$maxWidth || "378px")};
      height: ${rem("52px")};
      min-width: ${p => rem(p.$minWidth || "250px")};
      border-radius: ${rem("10px")};
      ${p =>
        p.$centerInput &&
        css`
          margin: 0 auto;
        `}
    }
  }
`

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

export const StyledLoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${rem("20px")};
  background-color: #f2f3f7;
  padding: ${rem("40px")};
  width: ${rem("458px")};
`

export const StyledLoginText = styled.h4`
  font-size: ${rem("28px")};
  font-weight: 400;
  text-align: center;
  color: #0a0a0a;
  padding: 0 ${rem("40px")} ${rem("40px")} ${rem("40px")};
  line-height: ${rem("32px")};
`

export const StyledRemeberMeText = styled.label`
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  color: #888a95;
`

export const StyledCheckBox = styled.input`
  margin-right: ${rem("8px")};
  width: ${rem("16px")};
  height: ${rem("16px")};
`

export const StyledForgotPassword = styled(Box)`
  cursor: pointer;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  & > a {
    color: #888a95;
    text-decoration: none;
  }
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

export const StyledInstructionsText = styled.p`
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("24px")};
  margin-bottom: ${rem("16px")};
  text-align: center;
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

export const StyledLoginContainerMobile = styled(Box)`
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

export const SearchTableTextField = styled(TextField)`
  &&& {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
    width: ${rem("130px")};
    height: ${rem("32px")};
    & > div {
      border-radius: ${rem("6px")};
      height: ${rem("32px")};
    }
    & > div > input {
      padding: ${rem("2px")} ${rem("8px")};
      height: ${rem("28px")};
      border-radius: ${rem("6px")};
    }

    & fieldset.MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.8);
    }

    & .Mui-disabled fieldset.MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.23);
    }
  }
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

export const StyledHelperText = styled.p<{
  $isCentered?: boolean
  $maxWidth?: string
  $minWidth?: string
  $marginLeft?: string
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("10px")};
  line-height: ${rem("16px")};
  margin-left: ${p => rem(p.$marginLeft || "16px")};
  ${p =>
    p.$isCentered &&
    css`
      margin: 0 auto;
    `}

  ${p =>
    p.$maxWidth &&
    css`
      max-width: ${rem(p.$maxWidth)};
    `}
  ${p =>
    p.$minWidth &&
    css`
      min-width: ${rem(p.$minWidth)};
    `}

  color: #a60000;
`
