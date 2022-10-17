import React from "react"
import { useMediaQuery } from "@mui/material"
import { observer } from "mobx-react-lite"

import {
  Styled403Page,
  Styled403PageContent,
  Styled403PageContentImageContainer,
  Styled403PageContentTextContainer,
  Styled403PageContentTextContainerArrowImageContainer,
  Styled403PageContentTextContainerHeader,
  Styled403PageContentTextContainerSubHeader,
} from "./403Page.styled"
import _403LaptopImage from "@/assets/images/404_laptop.svg"
import _403ArrowImage from "@/assets/images/404_sub-header_arrow.svg"
import LandingNavbar from "@/components/LandingNavbar"
import { ContainedButton } from "@/components/commons/Button"
import { devices } from "@/constants/device"
import { useStore } from "@/store"
import { content } from "@/constants/content"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface I403Props extends IPageProps {}

const _403Page: React.FC<I403Props> = ({ country_code, lang }) => {
  const { navigateToDefault } = useNavigate({ country_code, lang })
  const { userStore } = useStore()
  const isDesktopView = useMediaQuery(devices.desktop.up)

  return (
    <Styled403Page>
      <LandingNavbar />
      <Styled403PageContent>
        <Styled403PageContentTextContainer>
          <Styled403PageContentTextContainerHeader>
            403
          </Styled403PageContentTextContainerHeader>
          <Styled403PageContentTextContainerSubHeader>
            {content.page403.subHeader[0]}
            <br /> {content.page403.subHeader[1]}
            <Styled403PageContentTextContainerArrowImageContainer>
              <img src={_403ArrowImage} width={64} height={48} />
            </Styled403PageContentTextContainerArrowImageContainer>
          </Styled403PageContentTextContainerSubHeader>
          <ContainedButton
            onClick={() => navigateToDefault(userStore.currentUser?.role)}
          >
            {content.page403.buttonText}
          </ContainedButton>
        </Styled403PageContentTextContainer>
        {isDesktopView && (
          <Styled403PageContentImageContainer>
            <img src={_403LaptopImage} width={845} height={734} />
          </Styled403PageContentImageContainer>
        )}
      </Styled403PageContent>
    </Styled403Page>
  )
}

export default observer(_403Page)
