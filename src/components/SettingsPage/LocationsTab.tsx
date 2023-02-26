import React, { useCallback, useMemo, useState } from "react"
import { Box, CircularProgress, Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"

import {
  StyledLocationsTab,
  StyledSettingsColumn,
  StyledSettingsColumnContent,
  StyledSettingsColumnContentHeaderContainer,
  StyledSettingsColumnContentHeaderText,
  StyledSettingsColumnContentList,
  StyledSettingsColumnContentSearchField,
} from "@/components/SettingsPage/SettingsPage.styled"
import { ContainedButton } from "@/components/commons/Button"
import theme from "@/theme"
import AddCountryModal from "@/components/SettingsPage/AddCountryModal"
import RegionModal from "@/components/SettingsPage/RegionModal"
import AddStationModal from "@/components/SettingsPage/AddStationModal"
import DeleteConfirmationModal from "@/components/SettingsPage/DeleteConfirmationModal"
import {
  addCountry,
  addRegion,
  addStation,
  deleteCountry,
  deleteRegion,
  deleteStation,
  useCountryList,
  useRegionList,
  useStationList,
} from "@/agent/locations"
import {
  AddCountryResult,
  AddCountryVariables,
  AddRegionResult,
  AddRegionVariables,
  AddStationResult,
  AddStationVariables,
  CountryListDataItem,
  DeleteCountryResult,
  DeleteCountryVariables,
  DeleteRegionResult,
  DeleteRegionVariables,
  DeleteStationResult,
  DeleteStationVariables,
  RegionListDataItem,
  UpdateRegionVariables,
} from "@/lib/interfaces/locations"
import CountryList from "@/components/SettingsPage/CountryList"
import RegionList from "@/components/SettingsPage/RegionList"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"
import StationList from "@/components/SettingsPage/StationList"
import AddStationAddressModal from "@/components/SettingsPage/AddStationAddressModal"

type LocationsDeleteItem = {
  type: "Country" | "Region" | "Station"
  sk: string
  pk: string
  name: string
}

const STATION_DATA_DEFAULT_VALUES = {
  countryCode: "",
  regionCode: "",
  regionId: "",
  regionName: "",
  stationName: "",
  stationId: "",
  stationCode: "",
  stationType: "",
  address1: "",
  address2: "",
  address3: "",
  city: "",
  state: "",
  postalCode: "",
  longitude: "",
  latitude: "",
} as const

export type StationFieldName = keyof typeof STATION_DATA_DEFAULT_VALUES
export type RegionToEditType = UpdateRegionVariables & {
  regionCode: string
  countryCode: string
}

const LocationsTab = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedCountry, setSelectedCountry] =
    useState<CountryListDataItem | null>(null)
  const [selectedRegion, setSelectedRegion] =
    useState<RegionListDataItem | null>(null)
  const [regionToEdit, setRegionToEdit] = useState<RegionToEditType | null>(
    null
  )
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false)
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false)
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false)
  const [isAddStationAddressModalOpen, setIsAddStationAddressModalOpen] =
    useState(false)
  const [itemToDelete, setItemToDelete] = useState<LocationsDeleteItem | null>(
    null
  )
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [regionSearchQuery, setRegionSearchQuery] = useState("")
  const [stationSearchQuery, setStationSearchQuery] = useState("")
  const [stationData, setStationData] = useState<Required<AddStationVariables>>(
    STATION_DATA_DEFAULT_VALUES
  )

  const {
    data: countryListData,
    isLoading: isCountryListLoading,
    refetch: refetchCountryList,
  } = useCountryList()
  const {
    data: regionListData,
    isLoading: isRegionListLoading,
    refetch: refetchRegionList,
  } = useRegionList(selectedCountry?.countryCode || "")
  const {
    data: stationListData,
    isLoading: isStationListLoading,
    refetch: refetchStationList,
  } = useStationList(
    selectedCountry?.countryCode || "",
    selectedRegion?.regionCode || ""
  )

  const { mutate: addCountryMutate } = useMutation<
    AddCountryResult,
    Error,
    AddCountryVariables
  >(addCountry)
  const { mutate: deleteCountryMutate } = useMutation<
    DeleteCountryResult,
    Error,
    DeleteCountryVariables
  >(deleteCountry)
  const { mutate: addRegionMutate } = useMutation<
    AddRegionResult,
    Error,
    AddRegionVariables
  >(addRegion)
  const { mutate: deleteRegionMutate } = useMutation<
    DeleteRegionResult,
    Error,
    DeleteRegionVariables
  >(deleteRegion)
  const { mutate: addStationMutate } = useMutation<
    AddStationResult,
    Error,
    AddStationVariables
  >(addStation)
  const { mutate: deleteStationMutate } = useMutation<
    DeleteStationResult,
    Error,
    DeleteStationVariables
  >(deleteStation)

  const handleCountrySearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setCountrySearchQuery(e.target.value)
  const handleRegionSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setRegionSearchQuery(e.target.value)
  const handleStationSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setStationSearchQuery(e.target.value)

  const handleStationField = (name: StationFieldName, value: string) => {
    setStationData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCountryModalOpen = () => setIsAddCountryModalOpen(true)
  const handleAddCountryModalClose = () => setIsAddCountryModalOpen(false)
  const handleAddCountry = (variables: AddCountryVariables) => {
    addCountryMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.countryCode || validationError?.country || message,
            {
              variant: "error",
            }
          )
          return
        }
        enqueueSnackbar(message, { variant: "success" })
        refetchCountryList()
      },
      onError(error, variables) {
        enqueueSnackbar(error.message, { variant: "error" })
        console.error("ERROR:", error)
        console.log("VARIABLES USED:", variables)
      },
    })
    handleAddCountryModalClose()
  }
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
  const handleClickCountry = (clickedCountry: CountryListDataItem) => {
    setSelectedCountry(clickedCountry)
    setSelectedRegion(null)
  }

  const handleRegionModalOpen = () => {
    setRegionToEdit(null)
    setIsRegionModalOpen(true)
  }
  const handleRegionModalClose = () => setIsRegionModalOpen(false)
  const handleDeleteRegion = (sk: string, pk: string) => {
    deleteRegionMutate(
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
          refetchRegionList()
          setSelectedRegion(null)
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
  const handleClickRegion = (clickedRegion: RegionListDataItem) => {
    setSelectedRegion(clickedRegion)
  }
  const handleEditRegion = (region: Omit<RegionToEditType, "countryCode">) => {
    setRegionToEdit({ ...region, countryCode: selectedCountry!.countryCode })
    setIsRegionModalOpen(true)
  }

  const handleAddStationModalOpen = () => {
    setIsAddStationModalOpen(true)
  }
  const handleAddStationModalClose = () => {
    setIsAddStationModalOpen(false)
  }
  const handleAddStationModalNext = () => {
    handleAddStationModalClose()
    handleAddStationAddressModalOpen()
  }
  const handleAddStation = (variables: AddStationVariables) => {
    addStationMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          enqueueSnackbar(
            validationError?.countryCode ||
              validationError?.regionCode ||
              validationError?.regionId ||
              validationError?.regionName ||
              validationError?.stationCode ||
              validationError?.stationId ||
              validationError?.stationName ||
              validationError?.stationType ||
              validationError?.address1 ||
              validationError?.address2 ||
              validationError?.address3 ||
              validationError?.city ||
              validationError?.state ||
              validationError?.longitude ||
              validationError?.latitude ||
              message,
            {
              variant: "error",
            }
          )
          return
        }
        enqueueSnackbar(message, { variant: "success" })
        refetchStationList()
      },
      onError(error, variables) {
        enqueueSnackbar(error.message, { variant: "error" })
        console.error("ERROR:", error)
        console.log("VARIABLES USED:", variables)
      },
    })
  }
  const handleDeleteStation = (sk: string, pk: string) => {
    deleteStationMutate(
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
          refetchStationList()
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

  const handleAddStationAddressModalOpen = () => {
    setIsAddStationAddressModalOpen(true)
  }
  const handleAddStationAddressModalClose = () => {
    setIsAddStationAddressModalOpen(false)
  }

  const handleAddStationClearFields = () => {
    setStationData(STATION_DATA_DEFAULT_VALUES)
  }

  const handleAddStationAddressModalGoBack = () => {
    handleAddStationAddressModalClose()
    handleAddStationModalOpen()
  }

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

  const filteredStations = useMemo(
    () =>
      (stationListData?.data?.Items || []).filter(
        station =>
          station.stationName
            .toLowerCase()
            .includes(stationSearchQuery.toLowerCase()) ||
          station.stationCode
            .toLowerCase()
            .includes(stationSearchQuery.toLowerCase()) ||
          station.stationID
            .toLowerCase()
            .includes(stationSearchQuery.toLowerCase())
      ),
    [stationListData, stationSearchQuery]
  )

  const handleDeleteMap = useCallback(
    (sk: string, pk: string) => ({
      Country: () => handleDeleteCountry(sk, pk),
      Region: () => handleDeleteRegion(sk, pk),
      Station: () => handleDeleteStation(sk, pk),
    }),
    []
  )

  return (
    <StyledLocationsTab>
      {isAddCountryModalOpen ? (
        <AddCountryModal
          open={isAddCountryModalOpen}
          handleClose={handleAddCountryModalClose}
          handleAdd={handleAddCountry}
        />
      ) : null}
      {isRegionModalOpen ? (
        <RegionModal
          open={isRegionModalOpen}
          handleClose={handleRegionModalClose}
          countries={filteredCountries}
          regionData={regionToEdit || undefined}
          refetchRegionList={refetchRegionList}
        />
      ) : null}
      {isAddStationModalOpen ? (
        <AddStationModal
          open={isAddStationModalOpen}
          handleClose={handleAddStationModalClose}
          handleAdd={handleAddStation}
          handleNext={handleAddStationModalNext}
          handleClearFields={handleAddStationClearFields}
          countries={countryListData?.data?.Items || []}
          regions={regionListData?.data?.Items || []}
          stationData={stationData}
          handleStationField={handleStationField}
        />
      ) : null}
      {isAddStationAddressModalOpen ? (
        <AddStationAddressModal
          open={isAddStationAddressModalOpen}
          handleClose={handleAddStationAddressModalClose}
          handleAdd={handleAddStation}
          handleClearFields={handleAddStationClearFields}
          handleGoBack={handleAddStationAddressModalGoBack}
          countries={countryListData?.data?.Items || []}
          regions={regionListData?.data?.Items || []}
          stationData={stationData}
          handleStationField={handleStationField}
        />
      ) : null}
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
                  <ContainedButton iconButton onClick={handleRegionModalOpen}>
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
                      onEdit={handleEditRegion}
                      selectedRegion={selectedRegion}
                    />
                  )}
                </StyledSettingsColumnContentList>
              </StyledSettingsColumnContent>
              <Divider orientation="vertical" flexItem />
            </StyledSettingsColumn>
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          {selectedCountry && selectedRegion && (
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
                  {isStationListLoading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      my={6}
                    >
                      <CircularProgress size={32} />
                    </Box>
                  ) : (
                    <StationList
                      data={filteredStations}
                      onDelete={(sk, pk, name) => {
                        handleDeleteConfirmationModalOpen({
                          type: "Station",
                          sk,
                          pk,
                          name,
                        })
                      }}
                    />
                  )}
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
