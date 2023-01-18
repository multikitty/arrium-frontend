import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { rem } from "polished"

import {
  StyledAddCountryModal as StyledAddOSVersionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddOSVersionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddOSVersionModalForm,
  StyledAddCountryModalFormActions as StyledAddOSVersionModalFormActions,
  StyledAddCountryModalFormField as StyledAddOSVersionModalFormField,
  StyledAddCountryModalTitle as StyledAddOSVersionModalTitle,
} from "./SettingsPage.styled"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { StyledFieldLabel } from "@/components/commons/uiComponents"
import { AddOsVersionVariables } from "@/lib/interfaces/models"
import { ModalProps } from "./SettingsPage.types"

interface AddOSVersionModalProps extends ModalProps {
  handleAdd: (variables: AddOsVersionVariables) => void
}

const AddOSVersionModal = (props: AddOSVersionModalProps) => {
  const [osVersion, setOsVersion] = useState("")

  const handleOsVersionField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setOsVersion(e.target.value)
  }

  const isSaveDisabled = !osVersion

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        <StyledAddOSVersionModalForm onSubmit={handleSave}>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!osVersion}>
              OS Version
            </StyledFieldLabel>
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
          </StyledAddOSVersionModalFormActions>
        </StyledAddOSVersionModalForm>
      </StyledAddOSVersionModal>
    </Modal>
  )
}

export default AddOSVersionModal
