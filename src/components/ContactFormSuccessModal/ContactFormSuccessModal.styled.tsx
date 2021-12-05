import styled from "styled-components"
import { rem } from "polished"

export const StyledContactFormSuccessModalOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 990;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledContactFormSuccessModalCloseIconContainer = styled.div`
  position: absolute;
  top: ${rem("12px")};
  right: ${rem("12px")};
`

export const StyledContactFormSuccessModalCard = styled.div`
  position: relative;
  background: ${p => p.theme.palette.common.white};
  box-shadow: 0 ${rem("4px")} ${rem("24px")} rgba(0, 0, 0, 0.3);
  border-radius: ${rem("16px")};
  padding: ${rem("24px")};
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledContactFormSuccessModalCardIconContainer = styled.div`
  padding: ${rem("15px")};
  margin-bottom: ${rem("4px")};
`

export const StyledContactFormSuccessModalCardIcon = styled.img`
  width: ${rem("45px")};
  height: ${rem("45px")};
`

export const StyledContactFormSuccessModalCardTitle = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("20px")};
  line-height: ${rem("24px")};
  text-align: center;
  margin-bottom: ${rem("12px")};

  color: ${p => p.theme.palette.common.green};
`

export const StyledContactFormSuccessModalCardText = styled.p`
  width: 100%;
  max-width: ${rem("244px")};
  margin: 0 auto;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};
  text-align: center;
  margin-bottom: ${rem("12px")};

  color: #585a61;
`
