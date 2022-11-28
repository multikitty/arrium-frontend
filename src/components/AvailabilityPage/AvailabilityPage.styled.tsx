import { rem } from "polished"
import styled from "styled-components"
import { Box, Button, TextField, Typography, Paper } from "@mui/material"
import theme from "@/theme"
import { devices } from "@/constants/device"

export const StyledAvailablityPageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};
`

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem("24px")} ${rem("32px")};
  box-shadow: 0px 2px 8px 0px #0000000a;
`

export const StyledSearchText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("20px")};
  line-height: ${rem("32px")};
  color: ${p => p.theme.palette.grey7};
`

export const StyledTextWrapper = styled.div`
  display: flex;
`

export const StyledSearchButton = styled(Button)`
  &&& {
    margin-left: ${rem("20px")};
    border: 1px solid #e6e6ed;
    border-radius: ${rem("6px")};
    padding: ${rem("6px")} ${rem("16px")};
    text-transform: capitalize;
    font-size: ${rem("16px")};
    line-height: ${rem("20px")};
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const StyledCollapsedSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem("20px")};

  @media ${devices.web.down} {
    flex-direction: column;
    align-items: stretch;
  }
`

export const StyledCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${rem("10px")};
  height: ${rem("20px")};
  width: ${rem("20px")};
  border: 1px solid ${theme.palette.grey2};
`

export const StyledShowMoreText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  color: ${theme.palette.blackText};
  margin-left: ${rem("8px")};
`

export const StyledTimePickerField = styled(TextField)`
  &&& {
    input[type="time"]::-webkit-calendar-picker-indicator {
      display: none;
    }
    input[type="time"]::-webkit-clear-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      -ms-appearance: none;
      appearance: none;
      margin: -10px;
    }
    input[type="time"]::-webkit-datetime-edit-ampm-field {
      display: none;
    }
    width: ${rem("64px")};
    & > div > input {
      padding: ${rem("8px")};
      height: ${rem("24px")};
    }
  }
`

export const StyledWarningTextSmall = styled.p`
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: #f25555;
`

export const StyledAvailabilityMobile = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  min-width: ${rem("300px")};
`

export const StyledAvailabilityTitleMobile = styled.p`
  font-family: Inter;
  font-size: ${rem("28px")};
  font-weight: 300;
  line-height: ${rem("32px")};
  padding: ${rem("24px")} ${rem("20px")};
`

export const StyledAvailabilitySearchTableFieldContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const StyledAvailabilitySearchTableFieldHelperText = styled.p`
  position: absolute;
  bottom: -${rem("18px")};
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("10px")};
  line-height: ${rem("16px")};

  color: ${p => p.theme.palette.errorText};
`

export const StyledNoSearchResultsTitle = styled(Typography)`
  &&& {
    margin-top: ${rem("20px")};
    margin-bottom: ${rem("12px")};
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: ${rem("20px")};
    line-height: ${rem("20px")};
    text-align: center;
    max-width: ${rem("270px")};
  }
`

export const StyledNoSearchResultsText = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: ${rem("14px")};
    line-height: ${rem("20px")};
    text-align: center;
    max-width: ${rem("270px")};
  }
`

export const StyledAvailablityAutomationModal = styled(Paper).attrs({
  elevation: 1,
})<{}>`
  border-radius: ${rem("20px")};
  padding: ${rem("16px")};
  width: 100%;
  max-width: ${rem("642px")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: ${rem("760px")};
  overflow: scroll;
  overflow-x: hidden;
`

export const StyledAvailablityAutomationModalTitle = styled.p`
  font-family: Inter;
  font-weight: 300;
  font-size: ${rem("28px")};
  line-height: ${rem("32px")};
  color: ${theme.palette.blackText};
  margin-bottom: ${rem("16px")};
`

export const StyledAvailablityAutomationModalTitleDesc = styled.p`
  font-family: Inter;
  font-weight: 400;
  font-size: ${rem("18px")};
  font-height: ${rem("32px")};
  color: ${theme.palette.grey7};
  width: ${rem("443px")};
  height: ${rem("64px")};
  margin-bottom: ${rem("12px")};
`

export const StyledAvailablityAutomationDeleteButton = styled(Button)`
  &&& {
    margin-left: ${rem("20px")};
    border: 1px solid #e6e6ed;
    border-radius: ${rem("6px")};
    padding: ${rem("6px")} ${rem("16px")};
    text-transform: capitalize;
    font-size: ${rem("16px")};
    line-height: ${rem("20px")};
    font-weight: 600;
    color: ${theme.palette.grey7};
  }
`
