import * as React from "react"
import { Autocomplete, Box, IconButton, Modal, TextField } from "@mui/material"
import { rem } from "polished"
import {
  StyledCreateReferralModal,
  StyledCreateReferralModalCloseIconContainer,
  StyledCreateReferralModalForm,
  StyledCreateReferralModalFormAction,
  StyledCreateReferralModalFormField,
  StyledCreateReferralModalTitle,
} from "./ReferralsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton } from "../commons/Button"
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"
import { UserRoles } from "@/constants/common"
import CountrySelect from "../CountrySelect"
import { CountryData, RegionData } from "@/utils/getCountryData"
import RegionSelect from "../RegionSelect"
import { StyledFieldLabel } from "../commons/uiComponents"

export interface IProps {
  open: boolean
  handleClose: () => void
  role: UserRolesType
}

const CreateReferralModal: React.FC<IProps> = ({ handleClose, open, role }) => {
  const isSalesAgent = role === UserRoles.salesAgent

  const { userStore } = useStore()
  const [country, setCountry] = React.useState<CountryData | null>(null)
  const [region, setRegion] = React.useState<RegionData | null>(null)
  const [numberOfReferrals, setNumberOfReferrals] = React.useState(0)
  const [assignTo, setAssignTo] = React.useState(
    isSalesAgent ? userStore.userFullName : ""
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const isSaveDisabled = !country || !region || !numberOfReferrals || !assignTo

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledCreateReferralModal>
        <StyledCreateReferralModalCloseIconContainer>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledCreateReferralModalCloseIconContainer>
        <StyledCreateReferralModalTitle>
          Create new referral codes
        </StyledCreateReferralModalTitle>
        <StyledCreateReferralModalForm onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!country}>Country</StyledFieldLabel>
            <CountrySelect
              fullWidth
              required
              placeholder="Choose Country*"
              country={country}
              setCountry={setCountry}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!region}>Region</StyledFieldLabel>
            <RegionSelect
              fullWidth
              required
              placeholder="Choose Region*"
              disabled={!country}
              country={country?.countryShortName}
              region={region}
              setRegion={setRegion}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <Autocomplete
              fullWidth
              disabled={!country || !region}
              options={[]}
              renderInput={params => (
                <TextField {...params} label="Choose Station" required />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={Number.isNaN(numberOfReferrals)}>
              Number of Referrals
            </StyledFieldLabel>
            <StyledCreateReferralModalFormField
              value={numberOfReferrals}
              onChange={e => {
                setNumberOfReferrals(parseInt(e.target.value))
              }}
              placeholder="Number of referrals"
              type="number"
              required
              inputProps={{
                min: 1,
                max: 10,
              }}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!assignTo}>Assign to</StyledFieldLabel>
            {userStore.userFullName && (
              <Autocomplete
                fullWidth
                value={assignTo}
                onChange={(_, newVal) => setAssignTo(newVal || "")}
                options={[userStore.userFullName]}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder="Assign to*"
                    required
                    InputProps={{ readOnly: isSalesAgent }}
                  />
                )}
              />
            )}
          </Box>
          <StyledCreateReferralModalFormAction>
            <ContainedButton
              sx={{ width: "100%" }}
              type="submit"
              disabled={isSaveDisabled}
            >
              Save
            </ContainedButton>
          </StyledCreateReferralModalFormAction>
        </StyledCreateReferralModalForm>
      </StyledCreateReferralModal>
    </Modal>
  )
}

export default observer(CreateReferralModal)
