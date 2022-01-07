import { rem } from "polished"
import styled, { css } from "styled-components"
import theme from "../../theme"
import { EState } from "./SignupStepsProgress.types"

export const StyledStepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${rem("40px")};
`

export const StyledStepperNodeWrapper = styled.div<{ state: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${rem("8px")};
`

export const StyledStepperNode = styled.div<{ state: EState }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${rem("32px")};
  width: ${rem("32px")};
  border-radius: 50%;
  margin: ${rem("4px")};
  border: 1px solid #d2d3d9;

  ${p =>
    p.state === EState.active &&
    css`
      border: 1px solid ${theme.palette.main};
    `}

  ${p =>
    p.state === EState.completed &&
    css`
      border: 1px solid ${theme.palette.common.green};
      background-color: ${theme.palette.common.green};
    `}
`

export const StyledStepText = styled.p`
  font-family: Inter;
  font-size: ${rem("10px")};
  font-style: normal;
  font-weight: 600;
  line-height: ${rem("10px")};
  color: ${theme.palette.grey6};
  margin-bottom: ${rem("4px")};
`
export const StyledStepTextTwo = styled.p<{ state: EState }>`
  font-family: Inter;
  font-size: ${rem("14px")};
  font-style: normal;
  font-weight: 600;
  line-height: ${rem("18px")};
  color: ${theme.palette.blackText};

  ${p =>
    p.state === EState.active &&
    css`
      color: ${theme.palette.main};
    `}

  ${p =>
    p.state === EState.completed &&
    css`
      color: ${theme.palette.common.green};
    `}
`

export const StyledSeparator = styled.div<{ state: EState; lastNode: boolean }>`
  ${p =>
    p.lastNode &&
    css`
      display: none;
    `};

  height: ${rem("1px")};
  width: ${rem("24px")};
  margin-left: ${rem("8px")};
  ${p =>
    p.state === EState.active &&
    css`
      background-color: ${theme.palette.main};
    `};

  ${p =>
    p.state === EState.completed &&
    css`
      background-color: ${theme.palette.common.green};
    `};

  ${p =>
    p.state === EState.inactive &&
    css`
      background-color: ${theme.palette.grey4};
    `};
`

export const StyledStepTextMobile = styled.p`
  font-family: Inter;
  font-size: ${rem("10px")};
  font-style: normal;
  font-weight: 600;
  line-height: ${rem("10px")};
  color: ${theme.palette.grey6};
`

export const StyledStepTwoTextMobile = styled.p`
  font-family: Inter;
  font-size: ${rem("14px")};
  font-style: normal;
  font-weight: 600;
  line-height: ${rem("18px")};
  color: ${theme.palette.main};
`
