import React from "react"
import {
  StyledProfilePage,
  StyledProfilePageContent,
  StyledProfilePageHeader,
} from "./ProfilePage.styled"
import { Box, IconButton, tabsClasses, Tooltip } from "@mui/material"
import { rem } from "polished"
import ProfileTabContent from "./ProfileTabContent"
import FlexAccountTabContent from "./FlexAccountTabContent"
import { StyledTab, StyledTabs } from "../commons/commonComponents"
import { Close } from "@mui/icons-material"
import { useStore } from "@/store"
import navigateToDefault from "@/utils/navigateToDefault"

const ProfilePage = () => {
  const { userStore } = useStore()
  const [tab, setTab] = React.useState("personalInformation")

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const handleCloseButtonClick = () => {
    navigateToDefault(userStore.currentUser?.role)
  }

  const isProfileTabOpen = tab === "personalInformation"
  const isFlexAccountTabOpen = tab === "flexAccount"

  return (
    <StyledProfilePage>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <StyledProfilePageHeader>Profile</StyledProfilePageHeader>
        <Tooltip title="Close">
          <IconButton sx={{ mr: rem("21px") }} onClick={handleCloseButtonClick}>
            <Close />
          </IconButton>
        </Tooltip>
      </Box>
      <StyledProfilePageContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={tab}
            onChange={handleChange}
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              maxWidth: "100vw",
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Personal Information"
              value="personalInformation"
            />
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Amazon Flex Account"
              value="flexAccount"
            />
          </StyledTabs>
        </Box>
        {isProfileTabOpen && <ProfileTabContent />}
        {isFlexAccountTabOpen && <FlexAccountTabContent />}
      </StyledProfilePageContent>
    </StyledProfilePage>
  )
}

export default ProfilePage
