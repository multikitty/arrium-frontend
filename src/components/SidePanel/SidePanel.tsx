import React from "react"
import { navigate } from "gatsby"
import {
  StyledSidePanel,
  StyledSidePanelBrandLogo,
  StyledSidePanelBrandLogoContainer,
  StyledSidePanelItem,
  StyledSidePanelItemIcon,
  StyledSidePanelItemList,
  StyledSidePanelItemText,
} from "./SidePanel.styled"
import brandLogo from "../../assets/icons/arrium_logo.svg"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { useLocation } from "@reach/router"
import { AdminPages, DriverPages, UserRoles } from "../../types/common"
import SearchIcon from "../../assets/icons/sidepanel_driver-search_icon.inline.svg"
import SubscriptionIcon from "../../assets/icons/sidepanel_driver-subscription_icon.inline.svg"
import FAQIcon from "../../assets/icons/sidepanel_driver-faq_icon.inline.svg"
import SupportIcon from "../../assets/icons/sidepanel_driver-support_icon.inline.svg"
import CustomersIcon from "../../assets/icons/sidepanel_admin-customer_icon.inline.svg"
import DashboardIcon from "../../assets/icons/sidepanel_admin-dashboard_icon.inline.svg"
import MessagesIcon from "../../assets/icons/sidepanel_admin-messages_icon.inline.svg"
import SettingsIcon from "../../assets/icons/sidepanel_admin-settings_icon.inline.svg"
import ReferralsIcon from "../../assets/icons/sidepanel_admin-referral_icon.inline.svg"
import { SidePanelProps } from "./SidePanel.types"

const SidePanel: React.FC<SidePanelProps> = ({ role }) => {
  const { pathname } = useLocation()

  const isBlockAvailibityPage = pathname.includes(
    `/${DriverPages.blockAvailability}`
  )
  const isSubscriptionPage = pathname.includes(`/${DriverPages.subscription}`)
  const isFAQsPage = pathname.includes(`/${DriverPages.faq}`)
  const isSupportPage = pathname.includes(`/${DriverPages.support}`)

  const isCustomersPage = pathname.includes(`/${AdminPages.customers}`)
  const isDashboardPage = pathname.includes(`/${AdminPages.dashboard}`)
  const isMessagesPage = pathname.includes(`/${AdminPages.messages}`)
  const isSettingsPage = pathname.includes(`/${AdminPages.settings}`)
  const isReferralsPage = pathname.includes(`/${AdminPages.referrals}`)

  const handleNavigateToHomePage = () => navigate("/")

  const renderSidePanelItem = (
    active: boolean,
    href: string,
    icon: React.ReactNode,
    label: string
  ) => (
    <StyledSidePanelItem active={active} onClick={() => navigate(href)}>
      <StyledSidePanelItemIcon active={active}>{icon}</StyledSidePanelItemIcon>
      <StyledSidePanelItemText>{label}</StyledSidePanelItemText>
    </StyledSidePanelItem>
  )

  return (
    <StyledSidePanel>
      <StyledSidePanelBrandLogoContainer>
        <StyledSidePanelBrandLogo
          src={brandLogo}
          onClick={handleNavigateToHomePage}
        />
      </StyledSidePanelBrandLogoContainer>
      <StyledSidePanelItemList>
        {role === UserRoles.driver ? (
          <>
            {renderSidePanelItem(
              isBlockAvailibityPage,
              `/${DriverPages.blockAvailability}`,
              <SearchIcon />,
              "Block availability"
            )}
            {renderSidePanelItem(
              isSubscriptionPage,
              `/${DriverPages.subscription}`,
              <SubscriptionIcon />,
              "Subscription"
            )}
            {renderSidePanelItem(
              isFAQsPage,
              `/${DriverPages.faq}`,
              <FAQIcon />,
              "FAQs"
            )}
            <StyledFlexGrow />
            {renderSidePanelItem(
              isSupportPage,
              `/${DriverPages.support}`,
              <SupportIcon />,
              "Support"
            )}
          </>
        ) : (
          <>
            {renderSidePanelItem(
              isCustomersPage,
              `/${AdminPages.customers}`,
              <CustomersIcon />,
              "Customers"
            )}
            {renderSidePanelItem(
              isDashboardPage,
              `/${AdminPages.dashboard}`,
              <DashboardIcon />,
              "Dashboard"
            )}
            {renderSidePanelItem(
              isMessagesPage,
              `/${AdminPages.messages}`,
              <MessagesIcon />,
              "Messages"
            )}
            {renderSidePanelItem(
              isSettingsPage,
              `/${AdminPages.settings}`,
              <SettingsIcon />,
              "Settings"
            )}
            {renderSidePanelItem(
              isReferralsPage,
              `/${AdminPages.referrals}`,
              <ReferralsIcon />,
              "Referrals"
            )}
          </>
        )}
      </StyledSidePanelItemList>
    </StyledSidePanel>
  )
}

export default SidePanel
