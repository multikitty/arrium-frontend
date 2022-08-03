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
  const [assignTo, setAssignTo] = React.useState(
    isSalesAgent ? userStore.userFullName : ""
  )

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
        <StyledCreateReferralModalForm>
          <Box display="flex" mb={rem("16px")}>
            <CountrySelect
              fullWidth
              required
              label="Choose Country"
              country={country}
              setCountry={setCountry}
            />
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <RegionSelect
              fullWidth
              required
              label="Choose Region"
              disabled={!country}
              country={country?.countryShortName}
              region={region}
              setRegion={setRegion}
            />
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <Autocomplete
              fullWidth
              disabled={!country || !region}
              options={[]}
              renderInput={params => (
                <TextField {...params} label="Choose Station" required />
              )}
            />
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <StyledCreateReferralModalFormField
              placeholder="Number of referrals"
              type="number"
              required
              inputProps={{
                min: 1,
                max: 10,
              }}
            />
          </Box>
          <Box display="flex" mb={rem("44px")}>
            {userStore.userFullName && (
              <Autocomplete
                fullWidth
                value={assignTo}
                onChange={(_, newVal) => setAssignTo(newVal || "")}
                options={[userStore.userFullName]}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Assign To"
                    required
                    InputProps={{ readOnly: isSalesAgent }}
                  />
                )}
              />
            )}
          </Box>
          <StyledCreateReferralModalFormAction>
            <ContainedButton sx={{ width: "100%" }} type="submit">
              Save
            </ContainedButton>
          </StyledCreateReferralModalFormAction>
        </StyledCreateReferralModalForm>
      </StyledCreateReferralModal>
    </Modal>
  )
}

export default observer(CreateReferralModal)
