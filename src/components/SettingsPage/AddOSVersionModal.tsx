import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddOSVersionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddOSVersionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddOSVersionModalForm,
  StyledAddCountryModalFormActions as StyledAddOSVersionModalFormActions,
  StyledAddCountryModalFormField as StyledAddOSVersionModalFormField,
  StyledAddCountryModalTitle as StyledAddOSVersionModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { IAddOsVersionVariables } from "@/lib/interfaces/models"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: (variables: IAddOsVersionVariables) => void
}

const AddOSVersionModal = (props: IProps) => {
  const [osVersion, setOsVersion] = useState("")

  const handleOsVersionField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setOsVersion(e.target.value)

  const isSaveDisabled = !osVersion

  const handleSave = () => {
    if (isSaveDisabled) return
    props.handleAdd({ osVersion })
  }

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddOSVersionModal>
        <StyledAddOSVersionModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddOSVersionModalCloseIconContainer>
        <StyledAddOSVersionModalTitle>
          Add new OS Version
        </StyledAddOSVersionModalTitle>
        <StyledAddOSVersionModalForm>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledAddOSVersionModalFormField
              autoFocus
              placeholder={`OS Version`}
              value={osVersion}
              onChange={handleOsVersionField}
            />
          </Box>
          <StyledAddOSVersionModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={isSaveDisabled}
              onClick={handleSave}
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
          </StyledAddOSVersionModalFormActions>
        </StyledAddOSVersionModalForm>
      </StyledAddOSVersionModal>
    </Modal>
  )
}

export default AddOSVersionModal
