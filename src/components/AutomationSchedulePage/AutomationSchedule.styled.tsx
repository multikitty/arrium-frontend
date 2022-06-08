import { devices } from "@/constants/device"
import { Box, TextField } from "@mui/material"
import { rem } from "polished"
import styled, { css } from "styled-components"

export const StyledAutomationSchedulePageSubHeader = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: ${rem("20px")};
  line-height: ${rem("24px")};
  margin-bottom: ${rem("24px")};
  color: ${p => p.theme.palette.grey5};

  @media ${devices.desktop.down} {
    padding-top: ${rem("8px")};
    padding-left: ${rem("21px")};
  }
`

export const StyledAutomationSchedulePageWrapper = styled(Box)`
  flex-grow: 1;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};

  @media ${devices.desktop.down} {
    border-radius: 0;
  }
`

export const StyledAutomationSchedulePageContent = styled.div<{
  fullWidth?: boolean
  centerX?: boolean
  centerY?: boolean
  noPadding?: boolean
}>`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 2rem;
  width: ${p => (p.fullWidth ? "100%" : "50%")};

  ${p =>
    p.centerX &&
    css`
      align-items: center;
    `}

  ${p =>
    p.centerY &&
    css`
      justify-content: center;
      height: 100%;
      padding: ${rem("16px")};
    `}

  ${p =>
    p.noPadding &&
    css`
      padding: 0;
    `}

  @media (max-width: 1200px) {
    width: auto;
  }
`

export const StyledContentHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};
  margin-top: ${rem("40px")};
  color: ${p => p.theme.palette.blackText};
`

export const StyledAutomationScheduleInputField = styled(TextField)`
  &&& {
    background-color: #ffffff;
    width: 100%;
    height: ${rem("48px")};
    border: none;
    outline: none;
    border-radius: ${rem("10px")};
    margin-top: ${rem("32px")};

    & > .MuiOutlinedInput-root {
      width: 100%;
      height: ${rem("48px")};
      border-radius: ${rem("10px")};
    }
  }
`

export const StyledAutomationScheduleTextArea = styled(TextField)`
  &&& {
    background-color: #ffffff;
    width: 100%;
    border: none;
    outline: none;
    border-radius: ${rem("10px")};
    margin-top: ${rem("24px")};

    & > .MuiOutlinedInput-root {
      width: 100%;
      border-radius: ${rem("10px")};
    }
  }
`

export const StyledContentBottom = styled.div<{ isWebView: boolean }>`
  display: flex;
  ${p =>
    p.isWebView
      ? css`
          justify-content: space-between;
          align-items: center;
        `
      : css`
          flex-direction: column;
          align-items: stretch;
          justify-content: baseline;
        `}
  margin-top: ${rem("48px")};
`

export const StyledAttachmentText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  margin-left: ${rem("4px")};
  color: ${p => p.theme.palette.grey6};
`

export const StyledButtonContainer = styled.div`
  display: flex;
`
