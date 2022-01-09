import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledAddFlexVersionModal,
  StyledAddCountryModalCloseIconContainer as StyledAddFlexVersionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddFlexVersionModalForm,
  StyledAddCountryModalFormActions as StyledAddFlexVersionModalFormActions,
  StyledAddCountryModalFormField as StyledAddFlexVersionModalFormField,
  StyledAddCountryModalFormHelperText as StyledAddFlexVersionModalFormHelperText,
  StyledAddCountryModalTitle as StyledAddFlexVersionModalTitle,
} from "./SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { flexVersionList } from "./SettingsPage.data"

interface IProps {
  open: boolean
  handleClose: () => void
  handleAdd: () => void
}

const AddFlexVersionModal = (props: IProps) => {
  const [flexVersion, setFlexVersion] = useState("")

  const handleFlexVersionField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setFlexVersion(e.target.value)

  const flexVersionError = !!flexVersionList.find(
    item => item.name === flexVersion
  )

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddFlexVersionModal>
        <StyledAddFlexVersionModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddFlexVersionModalCloseIconContainer>
        <StyledAddFlexVersionModalTitle>
          Add new Amazon Flex Version
        </StyledAddFlexVersionModalTitle>
        <StyledAddFlexVersionModalForm>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledAddFlexVersionModalFormField
              autoFocus
              placeholder={`Amazon Flex Version`}
              value={flexVersion}
              onChange={handleFlexVersionField}
              error={flexVersionError}
            />
            {flexVersionError && (
              <StyledAddFlexVersionModalFormHelperText>
                Flex Version already exists
              </StyledAddFlexVersionModalFormHelperText>
            )}
          </Box>
          <StyledAddFlexVersionModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={flexVersionError}
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
          </StyledAddFlexVersionModalFormActions>
        </StyledAddFlexVersionModalForm>
      </StyledAddFlexVersionModal>
    </Modal>
  )
}

export default AddFlexVersionModal
