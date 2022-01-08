import { Box } from "@mui/material"
import { rem } from "polished"
import React from "react"
import { StyledTab, StyledTabs } from "../commons/commonComponents"
import LocationsTab from "./LocationsTab"
import ModelsTab from "./ModelsTab"
import {
  StyledSettingsPage,
  StyledSettingsPageContent,
  StyledSettingsPageHeader,
} from "./SettingsPage.styled"
import StationTypesTab from "./StationTypesTab"

const SettingsPage = () => {
  const [tab, setTab] = React.useState("locations")

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const isLocationsTabOpen = tab === "locations"
  const isModelsTabOpen = tab === "models"
  const isStationTypesTabOpen = tab === "stationTypes"

  return (
    <StyledSettingsPage>
      <StyledSettingsPageHeader>Settings</StyledSettingsPageHeader>
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
              label="Models and versions"
              value="models"
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
        {isModelsTabOpen && <ModelsTab />}
        {isStationTypesTabOpen && <StationTypesTab />}
      </StyledSettingsPageContent>
    </StyledSettingsPage>
  )
}

export default SettingsPage
