import React from "react"
import { Box, IconButton, MenuItem, Modal, Select } from "@mui/material"
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
import { CreateReferralModalProps } from "./ReferralsPage.types"

const CreateReferralModal: React.FC<CreateReferralModalProps> = ({
  handleClose,
  open,
}) => {
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
            <Select
              defaultValue="none"
              input={<StyledCreateReferralModalFormField />}
            >
              <MenuItem disabled value="none">
                Choose region
              </MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <Select
              defaultValue="none"
              input={<StyledCreateReferralModalFormField />}
            >
              <MenuItem disabled value="none">
                Choose station
              </MenuItem>
            </Select>
          </Box>
          <Box display="flex" mb={rem("16px")}>
            <StyledCreateReferralModalFormField placeholder="Number of referrals" />
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <Select
              defaultValue="none"
              input={<StyledCreateReferralModalFormField />}
            >
              <MenuItem disabled value="none">
                Assign to
              </MenuItem>
            </Select>
          </Box>
          <StyledCreateReferralModalFormAction>
            <ContainedButton sx={{ width: "100%" }}>Save</ContainedButton>
          </StyledCreateReferralModalFormAction>
        </StyledCreateReferralModalForm>
      </StyledCreateReferralModal>
    </Modal>
  )
}

export default CreateReferralModal
