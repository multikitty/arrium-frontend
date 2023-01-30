import * as React from "react"
import { Autocomplete, Box, IconButton, Modal, TextField } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { observer } from "mobx-react-lite"
import { rem } from "polished"

import {
  StyledCreateReferralModal as StyledTimezoneModal,
  StyledCreateReferralModalCloseIconContainer as StyledTimezoneModalCloseIconContainer,
  StyledCreateReferralModalForm as StyledTimezoneModalForm,
  StyledCreateReferralModalFormAction as StyledTimezoneModalFormAction,
  StyledCreateReferralModalTitle as StyledTimezoneModalTitle,
} from "@/components/ReferralsPage/ReferralsPage.styled"
import { ContainedButton } from "@/components/commons/Button"
import CountrySelect from "@/components/CountrySelect"
import { CountryData } from "@/utils/getCountryData"
import { useTimezonesByCountry } from "@/agent/timezone"
import { StyledFieldLabel } from "../commons/uiComponents"

export interface IProps {
  open: boolean
  handleClose: () => void
  _country?: CountryData
  _timezone?: string
  label?: "Add new Timezone" | "Edit Timezone"
}

const TimezoneModal: React.FC<IProps> = ({
  handleClose,
  open,
  _country = null,
  _timezone = "",
  label = "Add new Timezone",
}) => {
  const [country, setCountry] = React.useState<CountryData | null>(_country)
  const [timezone, setTimezone] = React.useState<string>(_timezone)
  const { data: zoneListData, isLoading } = useTimezonesByCountry(
    country?.countryShortName || null
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  React.useEffect(() => {
    setTimezone("")
  }, [country])

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledTimezoneModal>
        <StyledTimezoneModalCloseIconContainer>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledTimezoneModalCloseIconContainer>
        <StyledTimezoneModalTitle>{label}</StyledTimezoneModalTitle>
        <StyledTimezoneModalForm onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!country}>Country</StyledFieldLabel>
            <CountrySelect
              fullWidth
              required
              label="Choose Country Code"
              country={country}
              setCountry={setCountry}
              getOptionLabel={option =>
                `${option.countryName} (${option.countryShortName})`
              }
            />
          </Box>

          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!timezone}>Timezone</StyledFieldLabel>
            <Autocomplete
              fullWidth
              disabled={!zoneListData}
              value={timezone}
              onChange={(_, newVal) => setTimezone(newVal || "")}
              options={zoneListData?.zones.map(zone => zone.zoneName) || []}
              loading={isLoading}
              renderInput={params => (
                <TextField {...params} label="Choose Timezone" required />
              )}
            />
          </Box>
          <StyledTimezoneModalFormAction>
            <ContainedButton sx={{ width: "100%" }} type="submit">
              Save
            </ContainedButton>
          </StyledTimezoneModalFormAction>
        </StyledTimezoneModalForm>
      </StyledTimezoneModal>
    </Modal>
  )
}

export default observer(TimezoneModal)
