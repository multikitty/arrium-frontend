import React from "react"
import {
  StyledProfilePage,
  StyledProfilePageContent,
  StyledProfilePageHeader,
} from "./ProfilePage.styled"
import { Box } from "@mui/material"
import { rem } from "polished"
import ProfileTabContent from "./ProfileTabContent"
import FlexAccountTabContent from "./FlexAccountTabContent"
import { StyledTab, StyledTabs } from "../commons/commonComponents"

const ProfilePage = () => {
  const [tab, setTab] = React.useState("personalInformation")

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const isProfileTabOpen = tab === "personalInformation"
  const isFlexAccountTabOpen = tab === "flexAccount"

  return (
    <StyledProfilePage>
      <StyledProfilePageHeader>Profile</StyledProfilePageHeader>
      <StyledProfilePageContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={tab}
            onChange={handleChange}
            aria-label="profile tabs"
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
