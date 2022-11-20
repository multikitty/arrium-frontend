import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { rem } from "polished"

import {
  StyledAddCountryModal as StyledAddPhoneModelModal,
  StyledAddCountryModalCloseIconContainer as StyledAddPhoneModelModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddPhoneModelModalForm,
  StyledAddCountryModalFormActions as StyledAddPhoneModelModalFormActions,
  StyledAddCountryModalFormField as StyledAddPhoneModelModalFormField,
  StyledAddCountryModalTitle as StyledAddPhoneModelModalTitle,
} from "./SettingsPage.styled"
import { IAddPhoneModelVariables } from "@/lib/interfaces/models"
import { ModalProps } from "./SettingsPage.types"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { StyledFieldLabel } from "../commons/uiComponents"

interface IProps extends ModalProps {
  handleAdd: (variables: IAddPhoneModelVariables) => void
}

const AddPhoneModelModal = (props: IProps) => {
  const [phoneModel, setPhoneModel] = useState("")
  const [phoneID, setPhoneID] = useState("")

  const handlePhoneModelField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setPhoneModel(e.target.value)
  }

  const handlePhoneIDField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setPhoneID(e.target.value)
  }

  const isSaveDisabled = !phoneID || !phoneModel

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSaveDisabled) return
    props.handleAdd({
      modelId: phoneID,
      modelName: phoneModel,
    })
  }

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddPhoneModelModal>
        <StyledAddPhoneModelModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddPhoneModelModalCloseIconContainer>
        <StyledAddPhoneModelModalTitle>
          Add new Phone Model
        </StyledAddPhoneModelModalTitle>
        <StyledAddPhoneModelModalForm onSubmit={handleSave}>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledFieldLabel $isHidden={!phoneModel}>
              Phone Model name
            </StyledFieldLabel>
            <StyledAddPhoneModelModalFormField
              placeholder={`Phone Model name`}
              value={phoneModel}
              onChange={handlePhoneModelField}
              autoFocus
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledFieldLabel $isHidden={!phoneID}>
              Phone Model ID
            </StyledFieldLabel>
            <StyledAddPhoneModelModalFormField
              placeholder={`Phone Model ID`}
              value={phoneID}
              onChange={handlePhoneIDField}
            />
          </Box>
          <StyledAddPhoneModelModalFormActions>
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
          </StyledAddPhoneModelModalFormActions>
        </StyledAddPhoneModelModalForm>
      </StyledAddPhoneModelModal>
    </Modal>
  )
}

export default AddPhoneModelModal
