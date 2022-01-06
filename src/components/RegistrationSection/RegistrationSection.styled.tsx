import { rem } from "polished"
import styled, { css } from "styled-components"
import theme from "../../theme"

export const StyledTextBox = styled.p`
  margin: ${rem("16px")} 0;
  text-align: center;
`

export const StyledPasswordValidationContainer = styled.div<{
  isWebView: boolean
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  ${p =>
    p.isWebView
      ? css`
          left: ${rem("400px")};
          top: ${rem("-16px")};
        `
      : css`
          left: ${rem("35px")};
          top: ${rem("64px")};
        `}

  background-color: #ffffff;
  padding: ${rem("28px")} ${rem("24px")};
  border: 1px solid #e6e6ed;
  border-radius: ${rem("14px")};
  width: ${rem("220px")};

  &::before {
    content: '""';
    display: block;
    position: absolute;
    ${p =>
      p.isWebView
        ? css`
            top: ${rem("40px")};
            left: ${rem("-11px")};
            border-left: 1px solid #e6e6ed;
            border-bottom: 1px solid #e6e6ed;
          `
        : css`
            top: 0;
            left: ${rem("100px")};
            border-left: 1px solid #e6e6ed;
            border-top: 1px solid #e6e6ed;
          `}
    background-color: #ffffff;
    color: #ffffff;
    transform: translateY(-50%) rotate(45deg);
    z-index: 0;

    width: ${rem("20px")};
    height: ${rem("20px")};
  }
`
export const StyledValidationTextWrapper = styled.div<{
  isRequired: boolean
}>`
  display: flex;
  margin-bottom: ${rem("8px")};
  font-size: ${rem("14px")};
  font-weight: 400;
  line-height: ${rem("16px")};
  ${p =>
    p.isRequired
      ? css`
          color: ${theme.palette.grey5};
        `
      : css`
          color: ${theme.palette.blackText};
        `}
`

export const StyledValidationText = styled.p`
  margin-left: ${rem("8px")};
`

export const StyledText = styled.p`
  font-family: Inter;
  font-size: ${rem("16px")};
  font-style: normal;
  font-weight: 400;
  line-height: ${rem("24px")};
  text-align: center;
  margin: 0 ${rem("51px")};
`
