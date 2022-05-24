import * as React from "react"

import {
  StyledFAQPage as StyledTimezonesPage,
  StyledFAQPageHeader as StyledTimezonesPageHeader,
} from "@/components/FAQPage/FAQPage.styled"
import VectorMap from "@/components/VectorMap"
import {
  StyledTimezonesPageWrapper,
  StyledTimezonesPageMapWrapper,
} from "./TimezonesPage.styled"
// import { useTimezoneByZone } from "@/api/timezone"
import TimezoneTable from "./TimezoneTable"
import mockTimezoneData, { IMockTimezone } from "./__mock__"
import { Box } from "@mui/material"
import { ContainedButton } from "../commons/Button"
import TimezoneModal from "./TimezoneModal"
import getCountryData from "@/utils/getCountryData"
import DeleteConfirmationModal from "../SettingsPage/DeleteConfirmationModal"

const TimezonesPage = () => {
  const [isAddTimezoneModalOpen, setIsAddTimezoneModalOpen] =
    React.useState(false)
  const [isEditTimezoneModalOpen, setIsEditTimezoneModalOpen] =
    React.useState(false)
  const [isDeleteTimezoneModalOpen, setIsDeleteTimezoneModalOpen] =
    React.useState(false)
  const [selectedCountry, setSelectedCountry] = React.useState("")
  const [timezoneData, setTimezoneData] = React.useState<IMockTimezone[]>([])
  const [selectedTimezone, setSelectedTimezone] =
    React.useState<IMockTimezone | null>(null)
  // const { data: zoneListData, isSuccess: isListTimezonesSuccess } =
  //   useTimezonesByCountry(selectedCountry)
  // useTimezoneByZone("Europe/London")

  const handleEditTimezoneModalOpen = (tzData: IMockTimezone) => {
    setSelectedTimezone(tzData)
    setIsEditTimezoneModalOpen(true)
  }

  const handleEditTimezoneModalClose = () => {
    setSelectedTimezone(null)
    setIsEditTimezoneModalOpen(false)
  }

  const handleDeleteTimezoneModalOpen = (tzData: IMockTimezone) => {
    setSelectedTimezone(tzData)
    setIsDeleteTimezoneModalOpen(true)
  }

  const handleDeleteTimezoneModalClose = () => {
    setSelectedTimezone(null)
    setIsDeleteTimezoneModalOpen(false)
  }

  React.useEffect(() => {
    if (!selectedCountry || !["ES", "GB"].includes(selectedCountry)) return
    setTimezoneData(mockTimezoneData[selectedCountry])
  }, [selectedCountry])

  return (
    <StyledTimezonesPage>
      {isAddTimezoneModalOpen && (
        <TimezoneModal
          open={isAddTimezoneModalOpen}
          handleClose={() => setIsAddTimezoneModalOpen(false)}
          label="Add new Timezone"
        />
      )}
      {isEditTimezoneModalOpen && selectedTimezone && (
        <TimezoneModal
          open={isEditTimezoneModalOpen}
          handleClose={handleEditTimezoneModalClose}
          label="Edit Timezone"
          _country={getCountryData()[selectedTimezone.countryCode]}
          _timezone={selectedTimezone.zoneName}
        />
      )}
      {isDeleteTimezoneModalOpen && selectedTimezone && (
        <DeleteConfirmationModal
          open={isDeleteTimezoneModalOpen}
          type="Timezone"
          name={selectedTimezone.zoneName}
          handleClose={handleDeleteTimezoneModalClose}
          handleDelete={() => {}}
        />
      )}
      <StyledTimezonesPageHeader>Timezones</StyledTimezonesPageHeader>
      <StyledTimezonesPageWrapper>
        <StyledTimezonesPageMapWrapper>
          <VectorMap
            setSelectedRegion={setSelectedCountry}
            zoomOnScroll={false}
          />
        </StyledTimezonesPageMapWrapper>
        <Box px={2} my={2} display="flex" justifyContent="flex-end">
          <ContainedButton onClick={() => setIsAddTimezoneModalOpen(true)}>
            Add Timezone
          </ContainedButton>
        </Box>
        <TimezoneTable
          timezones={timezoneData}
          handleEditTimezoneModalOpen={handleEditTimezoneModalOpen}
          handleDeleteTimezoneModalOpen={handleDeleteTimezoneModalOpen}
        />
      </StyledTimezonesPageWrapper>
    </StyledTimezonesPage>
  )
}

export default TimezonesPage
