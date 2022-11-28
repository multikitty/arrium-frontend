import React from "react"
import { Box, Grid, IconButton, Tooltip } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Close"
import { rem } from "polished"
import { nanoid } from "nanoid"

import {
  StyledReferralTab as StyledLocationsTab,
  StyledReferralTabForm as StyledLocationsTabForm,
  StyledReferralTabFormActions as StyledLocationsTabFormActions,
  StyledReferralTabFormItem as StyledLocationsTabFormItem,
} from "./AddCustomerPage.styled"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import CountrySelect from "../CountrySelect"
import { CountryData, RegionData } from "@/utils/getCountryData"
import RegionSelect from "../RegionSelect"
import SaveChangesModal from "../SaveChangesModal"
import { useSnackbar } from "notistack"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

export interface LocationState {
  country: CountryData | null
  region: RegionData | null
  id: string
}

const initialLocationState: LocationState = {
  country: null,
  region: null,
  id: nanoid(),
}

interface ILocationsTabProps extends IPageProps {}

const LocationsTab: React.FC<ILocationsTabProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()
  const [locationState, setLocationState] = React.useState<LocationState[]>([
    initialLocationState,
  ])
  const [isDirty, setIsDirty] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [isSaveChangesModalOpen, setIsSaveChangesModalOpen] =
    React.useState(false)

  const handleChangeCountry = (idx: number, country: CountryData | null) => {
    setLocationState(prev =>
      prev.map((location, i) =>
        i === idx ? { ...location, country } : location
      )
    )
    if (isDirty) return
    setIsDirty(true)
  }
  const handleChangeRegion = (idx: number, region: RegionData | null) => {
    setLocationState(prev =>
      prev.map((location, i) =>
        i === idx ? { ...location, region } : location
      )
    )
    if (isDirty) return
    setIsDirty(true)
  }

  const handleAddNewRow = (idx: number) => {
    setLocationState(prev => {
      const newState = [...prev]
      newState.splice(idx + 1, 0, initialLocationState)
      return newState
    })
  }

  const handleDeleteRow = (idx: number) => {
    setLocationState(prev => prev.filter((_, i) => i !== idx))
  }

  const handleCancelClick = () => {
    if (isError)
      return enqueueSnackbar("Fields must not be empty", { variant: "error" })
    if (isDirty) return setIsSaveChangesModalOpen(true)
    return navigate(routes.customers)
  }

  const handelFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    enqueueSnackbar("Locations updated successfully", { variant: "success" })
    setIsDirty(false)
  }

  const handleClose = () => {
    setIsSaveChangesModalOpen(false)
    navigate(routes.customers)
  }

  const handleSave = () => {
    handelFormSubmit()
    setIsSaveChangesModalOpen(false)
  }

  const renderLocationRows = locationState.map((location, idx) => {
    const isFirst = idx === 0
    return (
      <React.Fragment key={location.id}>
        <Grid item xs={12} lg={5}>
          <StyledLocationsTabFormItem>
            <CountrySelect
              country={location.country}
              setCountry={(c: CountryData | null) =>
                handleChangeCountry(idx, c)
              }
              required
            />
          </StyledLocationsTabFormItem>
        </Grid>
        <Grid item xs={12} lg={5}>
          <StyledLocationsTabFormItem>
            <RegionSelect
              country={location.country?.countryShortName}
              region={location.region}
              setRegion={(r: RegionData | null) => handleChangeRegion(idx, r)}
              disabled={!location.country}
              required
            />
          </StyledLocationsTabFormItem>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Box display="flex" alignItems="center">
            <Tooltip title="Add Row Beneath">
              <IconButton
                size="large"
                sx={{ mr: 2 }}
                onClick={() => handleAddNewRow(idx)}
              >
                <AddIcon color="primary" sx={{ fontSize: 32 }} />
              </IconButton>
            </Tooltip>
            {!isFirst && (
              <Tooltip title="Delete Row">
                <IconButton size="large" onClick={() => handleDeleteRow(idx)}>
                  <DeleteIcon color="error" sx={{ fontSize: 32 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Grid>
      </React.Fragment>
    )
  })

  React.useEffect(() => {
    setIsError(
      Boolean(
        locationState.find(location => !location.country || !location.region)
      )
    )
  }, [locationState])

  return (
    <StyledLocationsTab>
      <SaveChangesModal
        open={isSaveChangesModalOpen}
        handleClose={handleClose}
        handleSave={handleSave}
      />
      <StyledLocationsTabForm onSubmit={handelFormSubmit}>
        <Grid container spacing={2}>
          {renderLocationRows}
        </Grid>
        <StyledLocationsTabFormActions>
          <OutlinedButton
            grey
            sx={{ mr: rem("12px") }}
            onClick={handleCancelClick}
          >
            Cancel
          </OutlinedButton>
          <ContainedButton type="submit">Save</ContainedButton>
        </StyledLocationsTabFormActions>
      </StyledLocationsTabForm>
    </StyledLocationsTab>
  )
}

export default LocationsTab
