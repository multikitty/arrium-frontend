import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddPhoneModelModal,
  StyledAddCountryModalCloseIconContainer as StyledAddPhoneModelModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddPhoneModelModalForm,
  StyledAddCountryModalFormActions as StyledAddPhoneModelModalFormActions,
  StyledAddCountryModalFormField as StyledAddPhoneModelModalFormField,
  StyledAddCountryModalFormHelperText as StyledAddPhoneModelHelperText,
  StyledAddCountryModalTitle as StyledAddPhoneModelModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { phoneModelList } from "./SettingsPage.data"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddPhoneModelModal = (props: IProps) => {
  const [phoneModel, setPhoneModel] = useState("")
  const [phoneID, setPhoneID] = useState("")

  const handlePhoneModelField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setPhoneModel(e.target.value)

  const handlePhoneIDField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setPhoneID(e.target.value)

  const phoneModelError = !!phoneModelList.find(
    item => item.name === phoneModel
  )

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
        <StyledAddPhoneModelModalForm>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledAddPhoneModelModalFormField
              placeholder={`Phone Model name`}
              value={phoneModel}
              onChange={handlePhoneModelField}
              error={phoneModelError}
              autoFocus
            />
            {phoneModelError && (
              <StyledAddPhoneModelHelperText>
                Phone Model name already exists
              </StyledAddPhoneModelHelperText>
            )}
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <StyledAddPhoneModelModalFormField
              placeholder={`Phone Model ID`}
              value={phoneID}
              onChange={handlePhoneIDField}
            />
          </Box>
          <StyledAddPhoneModelModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={phoneModelError}
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
