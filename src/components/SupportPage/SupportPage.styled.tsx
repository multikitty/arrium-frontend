import { Box, TextField } from "@mui/material"
import { rem } from "polished"
import styled, { css } from "styled-components"
import { StyledProfileTabContentFieldLabel } from "../ProfilePage/ProfilePage.styled"

export const StyledSupportPageWrapper = styled(Box)`
  flex-grow: 1;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};
`

export const StyledSupportPageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 2rem;
  width: 50%;

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
  margin-bottom: ${rem("32px")};
  color: ${p => p.theme.palette.blackText};
`

export const StyledSupportFormLabel = styled(StyledProfileTabContentFieldLabel)`
  margin-bottom: ${rem("4px")};
  font-weight: 400;
`

export const StyledSupportInputField = styled(TextField)`
  &&& {
    background-color: #ffffff;
    width: 100%;
    height: ${rem("48px")};
    border: none;
    outline: none;
    border-radius: ${rem("10px")};
    margin-bottom: ${rem("38px")};

    & > .MuiOutlinedInput-root {
      width: 100%;
      height: ${rem("48px")};
      border-radius: ${rem("10px")};
    }
  }
`

export const StyledSupportTextArea = styled(TextField)`
  &&& {
    background-color: #ffffff;
    width: 100%;
    border: none;
    outline: none;
    border-radius: ${rem("10px")};

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
