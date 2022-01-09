import React from "react"
import LandingNavbar from "../LandingNavbar"
import {
  Styled404Page,
  Styled404PageContent,
  Styled404PageContentImageContainer,
  Styled404PageContentTextContainer,
  Styled404PageContentTextContainerArrowImageContainer,
  Styled404PageContentTextContainerHeader,
  Styled404PageContentTextContainerSubHeader,
} from "./404Page.styled"
import _404LaptopImage from "../../assets/images/404_laptop.svg"
import _404ArrowImage from "../../assets/images/404_sub-header_arrow.svg"
import { ContainedButton } from "../commons/Button"
import { navigate } from "gatsby"
import { useMediaQuery } from "@mui/material"
import { devices } from "../../constants/device"

const _404Page = () => {
  const isDesktopView = useMediaQuery(devices.desktop.up)

  return (
    <Styled404Page>
      <LandingNavbar />
      <Styled404PageContent>
        <Styled404PageContentTextContainer>
          <Styled404PageContentTextContainerHeader>
            404
          </Styled404PageContentTextContainerHeader>
          <Styled404PageContentTextContainerSubHeader>
            This page doesn't exist or was removed.
            <br /> We suggest you back to home
            <Styled404PageContentTextContainerArrowImageContainer>
              <img src={_404ArrowImage} width={64} height={48} />
            </Styled404PageContentTextContainerArrowImageContainer>
          </Styled404PageContentTextContainerSubHeader>
          <ContainedButton onClick={() => navigate("/")}>
            Back to Home
          </ContainedButton>
        </Styled404PageContentTextContainer>
        {isDesktopView && (
          <Styled404PageContentImageContainer>
            <img src={_404LaptopImage} width={845} height={734} />
          </Styled404PageContentImageContainer>
        )}
      </Styled404PageContent>
    </Styled404Page>
  )
}

export default _404Page
