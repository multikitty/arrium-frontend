import React from "react"
import {
  StyledProfilePage,
  StyledProfilePageContent,
  StyledProfilePageHeader,
} from "./ProfilePage.styled"
import Tab from "@mui/material/Tab"
import { Box, styled, Tabs } from "@mui/material"
import { rem } from "polished"
import ProfileTabContent from "./ProfileTabContent"
import FlexAccountTabContent from "./FlexAccountTabContent"

const StyledTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
})

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "capitalize",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  color: "#585A61",
  fontFamily: ["Inter", "sans-serif"].join(","),
  fontSize: rem("20px"),
  fontWeight: 600,
  "&:hover": {
    color: "#3071F2",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#3071F2",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}))

interface StyledTabProps {
  label: string
  value: any
}

const ProfilePage = () => {
  const [tab, setTab] = React.useState("personalInformation")

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const isProfileTabOpen = tab === "personalInformation"
  const isFlexAccountOpen = tab === "flexAccount"

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
        {isFlexAccountOpen && <FlexAccountTabContent />}
      </StyledProfilePageContent>
    </StyledProfilePage>
  )
}

export default ProfilePage
