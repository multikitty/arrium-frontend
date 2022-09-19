import React, { useCallback, useMemo, useState } from "react"
import { Box, CircularProgress, Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"
// import { nanoid } from "nanoid"

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
// import { countryList, regionList, stationList } from "./SettingsPage.data"
// import AddCountryModal from "./AddCountryModal"
// import AddRegionModal from "./AddRegionModal"
// import AddStationModal from "./AddStationModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
// import SettingsListItem from "./SettingsListItem"
import { deleteCountry, useCountryList, useRegionList } from "@/agent/locations"
import {
  // ICountryListData,
  ICountryListDataItem,
  IDeleteCountryResult,
  IDeleteCountryVariables,
  IRegionListDataItem,
} from "@/lib/interfaces/locations"
import CountryList from "./CountryList"
import RegionList from "./RegionList"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"

type LocationsDeleteItem = {
  type: "Country" | "Region" | "Station"
  sk: string
  pk: string
  name: string
}

export interface SettingsTabProps {
  setMessage: React.Dispatch<React.SetStateAction<string | boolean>>
}

const LocationsTab = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedCountry, setSelectedCountry] =
    useState<ICountryListDataItem | null>(null)
  const [selectedRegion, setSelectedRegion] =
    useState<IRegionListDataItem | null>(null)
  // const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false)
  // const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false)
  // const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<LocationsDeleteItem | null>(
    null
  )
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [regionSearchQuery, setRegionSearchQuery] = useState("")
  const [stationSearchQuery, setStationSearchQuery] = useState("")
  const {
    data: countryListData,
    isLoading: isCountryListLoading,
    refetch: refetchCountryList,
  } = useCountryList()
  const { data: regionListData, isLoading: isRegionListLoading } =
    useRegionList(selectedCountry?.countryCode || "")

  const { mutate: deleteCountryMutate, isLoading: isDeleteCountryLoading } =
    useMutation<IDeleteCountryResult, Error, IDeleteCountryVariables>(
      deleteCountry
    )

  const handleCountrySearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setCountrySearchQuery(e.target.value)
  const handleRegionSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setRegionSearchQuery(e.target.value)
  const handleStationSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setStationSearchQuery(e.target.value)

  // const handleAddCountryModalOpen = () => setIsAddCountryModalOpen(true)
  // const handleAddCountryModalClose = () => setIsAddCountryModalOpen(false)
  // const handleAddCountry = (countryName: string) => {
  //   setCountries(prev => [...prev, { name: countryName, id: nanoid() }])
  //   props.setMessage(`<strong>${countryName}</strong> successfully created`)
  // }
  const handleDeleteCountry = (sk: string, pk: string) => {
    deleteCountryMutate(
      { sortKey: sk, partitionKey: pk },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(
              validationError?.sortKey ||
                validationError?.partitionKey ||
                message,
              {
                variant: "error",
              }
            )
            return
          }
          enqueueSnackbar(message, { variant: "success" })
          refetchCountryList()
          setSelectedCountry(null)
        },
        onError(error, variables) {
          enqueueSnackbar(error.message, { variant: "error" })
          console.error("ERROR:", error)
          console.log("VARIABLES USED:", variables)
        },
      }
    )
    handleDeleteConfirmationModalClose()
  }
  const handleClickCountry = (clickedCountry: ICountryListDataItem) => {
    setSelectedCountry(clickedCountry)
  }
  const handleClickRegion = (clickedRegion: IRegionListDataItem) => {
    setSelectedRegion(clickedRegion)
  }

  // const handleAddRegionModalOpen = () => setIsAddRegionModalOpen(true)
  // const handleAddRegionModalClose = () => setIsAddRegionModalOpen(false)
  // const handleAddRegion = (regionName: string) => {
  //   setRegions(prev => [...prev, { name: regionName, id: nanoid() }])
  // }
  // const handleDeleteRegion = (id: string) => {
  //   setRegions(prev => prev.filter(p => p.id !== id))
  //   handleDeleteConfirmationModalClose()
  //   props.setMessage("Region deleted successfully")
  // }

  // const handleAddStationModalOpen = () => setIsAddStationModalOpen(true)
  // const handleAddStationModalClose = () => setIsAddStationModalOpen(false)
  // const handleAddStation = (stationName: string) => {
  //   setStations(prev => [...prev, { name: stationName, id: nanoid() }])
  // }
  // const handleDeleteStation = (id: string) => {
  //   setStations(prev => prev.filter(p => p.id !== id))
  //   handleDeleteConfirmationModalClose()
  //   props.setMessage("Station deleted successfully")
  // }

  const handleDeleteConfirmationModalOpen = (deleteItem: LocationsDeleteItem) =>
    setItemToDelete(deleteItem)
  const handleDeleteConfirmationModalClose = () => setItemToDelete(null)

  const filteredCountries = useMemo(
    () =>
      (countryListData?.data?.Items || []).filter(({ country }) =>
        country.toLowerCase().includes(countrySearchQuery.toLowerCase())
      ),
    [countryListData, countrySearchQuery]
  )

  const filteredRegions = useMemo(
    () =>
      (regionListData?.data?.Items || []).filter(
        region =>
          region.regionName
            .toLowerCase()
            .includes(regionSearchQuery.toLowerCase()) ||
          region.regionCode
            .toLowerCase()
            .includes(regionSearchQuery.toLowerCase()) ||
          region.regionID
            .toLowerCase()
            .includes(regionSearchQuery.toLowerCase())
      ),
    [regionListData, regionSearchQuery]
  )

  // const filteredStations = useMemo(
  //   () =>
  //     stations.filter(station =>
  //       station.name.toLowerCase().includes(stationSearchQuery.toLowerCase())
  //     ),
  //   [stations, stationSearchQuery]
  // )

  const handleDeleteMap = useCallback(
    (sk: string, pk: string) => ({
      Country: () => handleDeleteCountry(sk, pk),
      Region: () => {},
      Station: () => {},
    }),
    []
  )

  return (
    <StyledLocationsTab>
      {/* <AddCountryModal
        open={isAddCountryModalOpen}
        handleClose={handleAddCountryModalClose}
        handleAdd={handleAddCountry}
      /> */}
      {/* <AddRegionModal
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
      /> */}
      {itemToDelete && (
        <DeleteConfirmationModal
          open={!!itemToDelete}
          name={itemToDelete.name}
          type={itemToDelete.type}
          handleClose={handleDeleteConfirmationModalClose}
          handleDelete={
            handleDeleteMap(itemToDelete.sk, itemToDelete.pk)[itemToDelete.type]
          }
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
                <ContainedButton
                  iconButton
                  // onClick={handleAddCountryModalOpen}
                >
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
                {isCountryListLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    my={6}
                  >
                    <CircularProgress size={32} />
                  </Box>
                ) : (
                  <CountryList
                    data={filteredCountries}
                    onDelete={(sk: string, pk: string, name: string) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Country",
                        sk,
                        pk,
                        name,
                      })
                    }}
                    onClick={handleClickCountry}
                    selectedCountry={selectedCountry}
                  />
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
                    // onClick={handleAddRegionModalOpen}
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
                  {isRegionListLoading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      my={6}
                    >
                      <CircularProgress size={32} />
                    </Box>
                  ) : (
                    <RegionList
                      data={filteredRegions}
                      onDelete={(sk, pk, name) => {
                        handleDeleteConfirmationModalOpen({
                          type: "Region",
                          sk,
                          pk,
                          name,
                        })
                      }}
                      onClick={handleClickRegion}
                      selectedRegion={selectedRegion}
                    />
                  )}
                </StyledSettingsColumnContentList>
              </StyledSettingsColumnContent>
              <Divider orientation="vertical" flexItem />
            </StyledSettingsColumn>
          )}
        </Grid>
        {/* <Grid item xs={12} lg={4}>
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
        </Grid> */}
      </Grid>
    </StyledLocationsTab>
  )
}

export default LocationsTab
