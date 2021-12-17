import { Box, TextField } from "@mui/material"
import { rem } from "polished"
import styled from "styled-components"

export const StyledSupportPageWrapper = styled(Box)`
  flex-grow: 1;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};
`
export const StyledSupportPageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 44%;
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
export const StyledSupportInputField = styled(TextField)`
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
export const StyledSupportTextArea = styled(TextField)`
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

export const StyledContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
