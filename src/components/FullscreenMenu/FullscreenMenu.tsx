import React from "react"
import { Avatar, Badge, Box } from "@mui/material"
import { rem } from "polished"
import theme from "../../theme"
import {
  StyledFullscreenMenu,
  StyledFullscreenMenuBottomContainer,
  StyledFullscreenMenuBottomContainerItem,
  StyledFullscreenMenuBottomContainerItemIcon,
  StyledFullscreenMenuBottomContainerItemText,
  StyledFullscreenMenuUpperContainer,
  StyledFullscreenMenuUpperContainerItem,
  StyledFullscreenMenuUpperContainerItemText,
  StyledFullscreenMenuUpperContainerNotificationIcon,
} from "./FullscreenMenu.styled"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import { useLocation } from "@reach/router"
import { DriverPages } from "../../types/common"
import { navigate } from "gatsby"
import SearchIcon from "../../assets/icons/sidepanel_driver-search_icon.inline.svg"
import SubscriptionIcon from "../../assets/icons/sidepanel_driver-subscription_icon.inline.svg"
import FAQIcon from "../../assets/icons/sidepanel_driver-faq_icon.inline.svg"
import SupportIcon from "../../assets/icons/sidepanel_driver-support_icon.inline.svg"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { ContainedButton } from "../commons/Button"
import { useAuth } from "../../hooks/useAuth"

interface IProps {
  open: boolean
}

const FullscreenMenu = (props: IProps) => {
  const { pathname } = useLocation()
  const auth = useAuth()
  // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  // const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)

  const isBlockAvailibityPage = pathname === `/${DriverPages.blockAvailability}`
  const isSubscriptionPage = pathname === `/${DriverPages.subscription}`
  const isFAQsPage = pathname === `/${DriverPages.faq}`
  const isSupportPage = pathname === `/${DriverPages.support}`

  const handleNavigateToBlockAvailibityPage = () =>
    navigate(`/${DriverPages.blockAvailability}`)
  const handleNavigateToSubscriptionPage = () =>
    navigate(`/${DriverPages.subscription}`)
  const handleNavigateToFAQsPage = () => navigate(`/${DriverPages.faq}`)
  const handleNavigateToSupportPage = () => navigate(`/${DriverPages.support}`)

  const handleLogoutButtonClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
    e.stopPropagation()
    auth.logout()
  }

  const handleProfileItemClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    e.stopPropagation()
    navigate(`/profile`)
  }

  return (
    <StyledFullscreenMenu visible={props.open}>
      <StyledFullscreenMenuUpperContainer>
        <StyledFullscreenMenuUpperContainerItem
          onClick={handleProfileItemClick}
        >
          <Box mr={rem("12px")}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
              }}
            >
              ED
            </Avatar>
          </Box>
          <StyledFullscreenMenuUpperContainerItemText>
            Eliza Doolittle
          </StyledFullscreenMenuUpperContainerItemText>
        </StyledFullscreenMenuUpperContainerItem>
        <StyledFullscreenMenuUpperContainerItem>
          <Box mr={rem("12px")}>
            <Badge
              color="error"
              overlap="circular"
              badgeContent=" "
              variant="dot"
            >
              <StyledFullscreenMenuUpperContainerNotificationIcon>
                <NotificationsNoneIcon
                  sx={{ fontSize: 24, color: theme.palette.main }}
                />
              </StyledFullscreenMenuUpperContainerNotificationIcon>
            </Badge>
          </Box>
          <StyledFullscreenMenuUpperContainerItemText>
            Notifications
          </StyledFullscreenMenuUpperContainerItemText>
        </StyledFullscreenMenuUpperContainerItem>
      </StyledFullscreenMenuUpperContainer>
      <StyledFullscreenMenuBottomContainer>
        <StyledFullscreenMenuBottomContainerItem
          active={isBlockAvailibityPage}
          onClick={handleNavigateToBlockAvailibityPage}
        >
          <StyledFullscreenMenuBottomContainerItemIcon
            active={isBlockAvailibityPage}
          >
            <SearchIcon />
          </StyledFullscreenMenuBottomContainerItemIcon>
          <StyledFullscreenMenuBottomContainerItemText>
            Block availability
          </StyledFullscreenMenuBottomContainerItemText>
        </StyledFullscreenMenuBottomContainerItem>
        <StyledFullscreenMenuBottomContainerItem
          active={isSubscriptionPage}
          onClick={handleNavigateToSubscriptionPage}
        >
          <StyledFullscreenMenuBottomContainerItemIcon
            active={isSubscriptionPage}
          >
            <SubscriptionIcon />
          </StyledFullscreenMenuBottomContainerItemIcon>
          <StyledFullscreenMenuBottomContainerItemText>
            Subscription
          </StyledFullscreenMenuBottomContainerItemText>
        </StyledFullscreenMenuBottomContainerItem>
        <StyledFullscreenMenuBottomContainerItem
          active={isFAQsPage}
          onClick={handleNavigateToFAQsPage}
        >
          <StyledFullscreenMenuBottomContainerItemIcon active={isFAQsPage}>
            <FAQIcon />
          </StyledFullscreenMenuBottomContainerItemIcon>
          <StyledFullscreenMenuBottomContainerItemText>
            FAQs
          </StyledFullscreenMenuBottomContainerItemText>
        </StyledFullscreenMenuBottomContainerItem>
        <StyledFullscreenMenuBottomContainerItem
          active={isSupportPage}
          onClick={handleNavigateToSupportPage}
        >
          <StyledFullscreenMenuBottomContainerItemIcon active={isSupportPage}>
            <SupportIcon />
          </StyledFullscreenMenuBottomContainerItemIcon>
          <StyledFullscreenMenuBottomContainerItemText>
            Support
          </StyledFullscreenMenuBottomContainerItemText>
        </StyledFullscreenMenuBottomContainerItem>
        <StyledFlexGrow />
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <ContainedButton onClick={handleLogoutButtonClick}>
            Logout
          </ContainedButton>
        </Box>
      </StyledFullscreenMenuBottomContainer>
    </StyledFullscreenMenu>
  )
}

export default FullscreenMenu
