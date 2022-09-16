import React, { useCallback, useMemo, useState } from "react"
import { Box, CircularProgress, Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"
import { nanoid } from "nanoid"

import {
  StyledLocationsTab,
  StyledSettingsColumn,
  StyledSettingsColumnContent,
  StyledSettingsColumnContentHeaderContainer,
  StyledSettingsColumnContentHeaderText,
  StyledSettingsColumnContentList,
  StyledSettingsColumnContentSearchField,
} from "./SettingsPage.styled"
import { ContainedButton } from "@/components/commons/Button"
import theme from "@/theme"
import { countryList, regionList, stationList } from "./SettingsPage.data"
import AddCountryModal from "./AddCountryModal"
import AddRegionModal from "./AddRegionModal"
import AddStationModal from "./AddStationModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import SettingsListItem from "./SettingsListItem"
import { useCountryList } from "@/agent/locations"
import { ICountryListData } from "@/lib/interfaces/locations"

export type SettingsItem = {
  name: string
  id: string
}

type LocationsDeleteItem = {
  type: "Country" | "Region" | "Station"
} & SettingsItem

export interface SettingsTabProps {
  setMessage: React.Dispatch<React.SetStateAction<string | boolean>>
}

const LocationsTab: React.FC<SettingsTabProps> = props => {
  const [countries, setCountries] = useState<SettingsItem[]>(countryList)
  const [selectedCountry, setSelectedCountry] = useState<
    ICountryListData["Items"][0] | null
  >(null)
  const [regions, setRegions] = useState<SettingsItem[]>(regionList)
  const [stations, setStations] = useState<SettingsItem[]>(stationList)
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false)
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false)
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<LocationsDeleteItem | null>(
    null
  )
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [regionSearchQuery, setRegionSearchQuery] = useState("")
  const [stationSearchQuery, setStationSearchQuery] = useState("")
  const { data: countryListData } = useCountryList()

  console.log("countryListData", countryListData)

  const handleCountrySearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setCountrySearchQuery(e.target.value)
  const handleRegionSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setRegionSearchQuery(e.target.value)
  const handleStationSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setStationSearchQuery(e.target.value)

  const handleAddCountryModalOpen = () => setIsAddCountryModalOpen(true)
  const handleAddCountryModalClose = () => setIsAddCountryModalOpen(false)
  const handleAddCountry = (countryName: string) => {
    setCountries(prev => [...prev, { name: countryName, id: nanoid() }])
    props.setMessage(`<strong>${countryName}</strong> successfully created`)
  }
  const handleDeleteCountry = (id: string) => {
    setCountries(prev => prev.filter(p => p.id !== id))
    handleDeleteConfirmationModalClose()
    props.setMessage("Country deleted successfully")
  }
  const handleClickCountry = (clickedCountry: ICountryListData["Items"][0]) => {
    setSelectedCountry(clickedCountry)
  }

  const handleAddRegionModalOpen = () => setIsAddRegionModalOpen(true)
  const handleAddRegionModalClose = () => setIsAddRegionModalOpen(false)
  const handleAddRegion = (regionName: string) => {
    setRegions(prev => [...prev, { name: regionName, id: nanoid() }])
  }
  const handleDeleteRegion = (id: string) => {
    setRegions(prev => prev.filter(p => p.id !== id))
    handleDeleteConfirmationModalClose()
    props.setMessage("Region deleted successfully")
  }

  const handleAddStationModalOpen = () => setIsAddStationModalOpen(true)
  const handleAddStationModalClose = () => setIsAddStationModalOpen(false)
  const handleAddStation = (stationName: string) => {
    setStations(prev => [...prev, { name: stationName, id: nanoid() }])
  }
  const handleDeleteStation = (id: string) => {
    setStations(prev => prev.filter(p => p.id !== id))
    handleDeleteConfirmationModalClose()
    props.setMessage("Station deleted successfully")
  }

  const handleDeleteConfirmationModalOpen = (deleteItem: LocationsDeleteItem) =>
    setItemToDelete(deleteItem)
  const handleDeleteConfirmationModalClose = () => setItemToDelete(null)

  const filteredCountries = useMemo(
    () =>
      countries.filter(country =>
        country.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
      ),
    [countries, countrySearchQuery]
  )

  const filteredRegions = useMemo(
    () =>
      regions.filter(region =>
        region.name.toLowerCase().includes(regionSearchQuery.toLowerCase())
      ),
    [regions, regionSearchQuery]
  )

  const filteredStations = useMemo(
    () =>
      stations.filter(station =>
        station.name.toLowerCase().includes(stationSearchQuery.toLowerCase())
      ),
    [stations, stationSearchQuery]
  )

  const handleDeleteMap = useCallback(
    (id: string) => ({
      Country: () => handleDeleteCountry(id),
      Region: () => handleDeleteRegion(id),
      Station: () => handleDeleteStation(id),
    }),
    []
  )

  return (
    <StyledLocationsTab>
      <AddCountryModal
        open={isAddCountryModalOpen}
        handleClose={handleAddCountryModalClose}
        handleAdd={handleAddCountry}
        countries={filteredCountries}
      />
      <AddRegionModal
        open={isAddRegionModalOpen}
        handleClose={handleAddRegionModalClose}
        handleAdd={handleAddRegion}
        countries={filteredCountries}
        regions={filteredRegions}
      />
      <AddStationModal
        open={isAddStationModalOpen}
        handleClose={handleAddStationModalClose}
        handleAdd={handleAddStation}
        countries={filteredCountries}
        regions={filteredRegions}
        stations={filteredStations}
      />
      {itemToDelete && (
        <DeleteConfirmationModal
          open={!!itemToDelete}
          name={itemToDelete.name}
          type={itemToDelete.type}
          handleClose={handleDeleteConfirmationModalClose}
          handleDelete={handleDeleteMap(itemToDelete.id)[itemToDelete.type]}
        />
      )}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} lg={4}>
          <StyledSettingsColumn>
            <StyledSettingsColumnContent>
              <StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentHeaderText>
                  Country
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton iconButton onClick={handleAddCountryModalOpen}>
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                placeholder="Search country"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
                value={countrySearchQuery}
                onChange={handleCountrySearchQueryField}
              />
              <StyledSettingsColumnContentList>
                {countryListData?.data?.Items ? (
                  <SettingsListItem
                    list={countryListData.data.Items}
                    onDelete={(id, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Country",
                        name,
                        id,
                      })
                    }}
                    onClick={handleClickCountry}
                  />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    my={6}
                  >
                    <CircularProgress size={32} />
                  </Box>
                )}
              </StyledSettingsColumnContentList>
            </StyledSettingsColumnContent>
            <Divider orientation="vertical" flexItem />
          </StyledSettingsColumn>
        </Grid>
        <Grid item xs={12} lg={4}>
          {selectedCountry && (
            <StyledSettingsColumn>
              <StyledSettingsColumnContent>
                <StyledSettingsColumnContentHeaderContainer>
                  <StyledSettingsColumnContentHeaderText>
                    Region
                  </StyledSettingsColumnContentHeaderText>
                  <ContainedButton
                    iconButton
                    onClick={handleAddRegionModalOpen}
                  >
                    <AddIcon
                      sx={{ fontSize: 16, color: theme.palette.common.white }}
                    />
                  </ContainedButton>
                </StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentSearchField
                  placeholder="Search region"
                  endAdornment={
                    <IconButton sx={{ mr: rem("8px") }}>
                      <SearchIcon />
                    </IconButton>
                  }
                  value={regionSearchQuery}
                  onChange={handleRegionSearchQueryField}
                />
                <StyledSettingsColumnContentList>
                  <SettingsListItem
                    list={filteredRegions}
                    onDelete={(id, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Region",
                        name,
                        id,
                      })
                    }}
                  />
                </StyledSettingsColumnContentList>
              </StyledSettingsColumnContent>
              <Divider orientation="vertical" flexItem />
            </StyledSettingsColumn>
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          {selectedCountry && (
            <StyledSettingsColumn>
              <StyledSettingsColumnContent last>
                <StyledSettingsColumnContentHeaderContainer>
                  <StyledSettingsColumnContentHeaderText>
                    Station
                  </StyledSettingsColumnContentHeaderText>
                  <ContainedButton
                    iconButton
                    onClick={handleAddStationModalOpen}
                  >
                    <AddIcon
                      sx={{ fontSize: 16, color: theme.palette.common.white }}
                    />
                  </ContainedButton>
                </StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentSearchField
                  placeholder="Search station"
                  endAdornment={
                    <IconButton sx={{ mr: rem("8px") }}>
                      <SearchIcon />
                    </IconButton>
                  }
                  value={stationSearchQuery}
                  onChange={handleStationSearchQueryField}
                />
                <StyledSettingsColumnContentList>
                  <SettingsListItem
                    list={filteredStations}
                    onDelete={(id, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Station",
                        name,
                        id,
                      })
                    }}
                  />
                </StyledSettingsColumnContentList>
              </StyledSettingsColumnContent>
            </StyledSettingsColumn>
          )}
        </Grid>
      </Grid>
    </StyledLocationsTab>
  )
}

export default LocationsTab
