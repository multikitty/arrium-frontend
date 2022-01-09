import { rem } from "polished"
import styled from "styled-components"
import bannerBackground from "../../assets/images/landing-banner_background.png"
import { devices } from "../../constants/device"

export const Styled404Page = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  background: url(${bannerBackground}) no-repeat;
  background-size: cover;
  overflow: hidden;
  display: flex;
`

export const Styled404PageContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${rem("76px")} ${rem("80px")} 0;

  @media ${devices.desktop.down} {
    margin: auto;
  }
`

export const Styled404PageContentImageContainer = styled.div`
  flex-grow: 1;
`

export const Styled404PageContentTextContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const Styled404PageContentTextContainerHeader = styled.h1`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("146px")};
  line-height: ${rem("146px")};
  margin-bottom: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`

export const Styled404PageContentTextContainerSubHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("18px")};
  line-height: ${rem("27px")};
  margin-bottom: ${rem("32px")};
  white-space: nowrap;
  position: relative;

  color: ${p => p.theme.palette.grey7};
`

export const Styled404PageContentTextContainerArrowImageContainer = styled.div`
  position: absolute;
  bottom: -36px;
  right: 36px;
`
