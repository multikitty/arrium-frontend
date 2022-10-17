import React from "react"
import { useMediaQuery } from "@mui/material"

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
import _404LaptopImage from "@/assets/images/404_laptop.svg"
import _404ArrowImage from "@/assets/images/404_sub-header_arrow.svg"
import { ContainedButton } from "../commons/Button"
import { devices } from "@/constants/device"
import { content } from "@/constants/content"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface I404Page extends IPageProps {}

const _404Page: React.FC<I404Page> = ({ country_code, lang }) => {
  const { navigate } = useNavigate({ country_code, lang })
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
            {content.page404.subHeader[0]}
            <br /> {content.page404.subHeader[1]}
            <Styled404PageContentTextContainerArrowImageContainer>
              <img src={_404ArrowImage} width={64} height={48} />
            </Styled404PageContentTextContainerArrowImageContainer>
          </Styled404PageContentTextContainerSubHeader>
          <ContainedButton onClick={() => navigate(routes.home)}>
            {content.page404.buttonText}
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
