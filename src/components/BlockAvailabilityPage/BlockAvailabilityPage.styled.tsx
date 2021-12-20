import { rem } from "polished"
import styled from "styled-components"
import { Button } from "@mui/material"
import theme from "../../theme"

export const StyledBlockAvailablityPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${p => p.theme.palette.grey3};
  border-radius: ${rem("20px")};
`
export const StyledBlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem("24px")} ${rem("32px")};
  box-shadow: 0px 2px 8px 0px #0000000a;
`
export const StyledBlockSearchText = styled.p`
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
  }
`
export const StyledCollapsedSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem("32px")};
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
