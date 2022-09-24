import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal,
  StyledAddCountryModalCloseIconContainer,
  StyledAddCountryModalForm,
  StyledAddCountryModalFormActions,
  StyledAddCountryModalFormField,
  StyledAddCountryModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { CountryData } from "@/utils/getCountryData"
import CountrySelect from "../CountrySelect"
import TimezoneSelect, { ITimezone } from "react-timezone-select"
import { makeStyles } from "@mui/styles"
import { IAddCountryVariables } from "@/lib/interfaces/locations"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: (variables: IAddCountryVariables) => void
}

const useStyles = makeStyles({
  timezoneStyles: {
    "& > div": {
      padding: "6px 0",
      borderRadius: "10px !important",
    },
    "& > div > div > span": {
      display: "none",
    },
  },
})

const AddCountryModal = (props: IProps) => {
  const classes = useStyles()
  const [country, setCountry] = useState<CountryData | null>(null)
  const [countryCode, setCountryCode] =
    useState<CountryData["countryShortName"]>("")
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  const handleCountryField = (c: CountryData | null) => {
    setCountry(c)
    setCountryCode(c?.countryShortName || "")
  }

  const handleSave = () => {
    if (!country) return
    props.handleAdd({
      country: country.countryName,
      countryCode: country.countryShortName,
      tzName:
        typeof selectedTimezone === "string"
          ? selectedTimezone
          : selectedTimezone.value,
    })
  }

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddCountryModal>
        <StyledAddCountryModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddCountryModalCloseIconContainer>
        <StyledAddCountryModalTitle>Add new Country</StyledAddCountryModalTitle>
        <StyledAddCountryModalForm>
          <Box display="flex" flexDirection="column" mb={rem("24px")}>
            <CountrySelect
              autoFocus
              country={country}
              setCountry={handleCountryField}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("24px")}>
            <StyledAddCountryModalFormField
              readOnly
              disabled
              value={countryCode}
              placeholder="Country Code"
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <TimezoneSelect
              placeholder="Choose timezone"
              value={selectedTimezone}
              className={classes.timezoneStyles}
              onChange={setSelectedTimezone}
            />
          </Box>
          <StyledAddCountryModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={!country}
              onClick={handleSave}
              type="submit"
            >
              Save
            </ContainedButton>
            <OutlinedButton
              grey
              sx={{ width: "100%" }}
              onClick={props.handleClose}
            >
              Cancel
            </OutlinedButton>
          </StyledAddCountryModalFormActions>
        </StyledAddCountryModalForm>
      </StyledAddCountryModal>
    </Modal>
  )
}

export default AddCountryModal
