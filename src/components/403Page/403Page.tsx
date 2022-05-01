import React from "react"
import { navigate } from "gatsby"
import { useMediaQuery } from "@mui/material"

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
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"
import { defaultRoutes } from "@/constants/common"
import { UserRoles } from "@/types/common"

const _403Page = () => {
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
            You are not authorized to access this page.
            <br /> We suggest you back to home
            <Styled403PageContentTextContainerArrowImageContainer>
              <img src={_403ArrowImage} width={64} height={48} />
            </Styled403PageContentTextContainerArrowImageContainer>
          </Styled403PageContentTextContainerSubHeader>
          <ContainedButton
            onClick={() =>
              navigate(
                "/" +
                  defaultRoutes[userStore.currentUser?.role || UserRoles.driver]
              )
            }
          >
            Back to Home
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
