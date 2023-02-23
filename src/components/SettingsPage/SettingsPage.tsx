import React from "react"
import { Box } from "@mui/material"
import { rem } from "polished"
import { StyledTab, StyledTabs } from "@/components/commons/uiComponents"
import LocationsTab from "@/components/SettingsPage/LocationsTab"
import {
  StyledSettingsPage,
  StyledSettingsPageContent,
  StyledSettingsPageHeader,
  StyledSettingsPageHeaderContainer,
} from "@/components/SettingsPage/SettingsPage.styled"
import StationTypesTab from "@/components/SettingsPage/StationTypesTab"

const SettingsPage = () => {
  const [tab, setTab] = React.useState("locations")

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const isLocationsTabOpen = tab === "locations"
  const isStationTypesTabOpen = tab === "stationTypes"

  return (
    <StyledSettingsPage>
      <StyledSettingsPageHeaderContainer>
        <StyledSettingsPageHeader>Settings</StyledSettingsPageHeader>
      </StyledSettingsPageHeaderContainer>
      <StyledSettingsPageContent>
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
              label="Locations"
              value="locations"
            />
            <StyledTab
              sx={{
                padding: `${rem("30px")} ${rem("32px")}`,
                textTransform: "capitalize",
              }}
              label="Station Types"
              value="stationTypes"
            />
          </StyledTabs>
        </Box>
        {isLocationsTabOpen && <LocationsTab />}
        {isStationTypesTabOpen && <StationTypesTab />}
      </StyledSettingsPageContent>
    </StyledSettingsPage>
  )
}

export default SettingsPage
