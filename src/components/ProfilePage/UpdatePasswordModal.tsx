import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { rem } from "polished"

import {
  StyledAddCountryModal as StyledChangePasswordModal,
  StyledAddCountryModalCloseIconContainer as StyledChangePasswordModalCloseIconContainer,
  StyledAddCountryModalForm as StyledChangePasswordModalForm,
  StyledAddCountryModalFormActions as StyledChangePasswordModalFormActions,
  StyledAddCountryModalFormField as StyledChangePasswordModalFormField,
  StyledAddCountryModalTitle as StyledChangePasswordModalTitle,
} from "../SettingsPage/SettingsPage.styled"
import { ContainedButton } from "../commons/Button"
import { useStore } from "@/store"

interface IProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

const ChangePasswordModal = (props: IProps) => {
  const { userStore } = useStore()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledChangePasswordModal>
        <StyledChangePasswordModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledChangePasswordModalCloseIconContainer>
        <StyledChangePasswordModalTitle>
          Update password
        </StyledChangePasswordModalTitle>
        <StyledChangePasswordModalForm>
          <Box display="flex" mb={rem("16px")}>
            <StyledChangePasswordModalFormField
              type="text"
              defaultValue={userStore.currentUser?.email}
              readOnly
            />
          </Box>
          <Box display="flex" mb={rem("44px")}>
            <StyledChangePasswordModalFormField
              autoComplete="new-password"
              type={isPasswordHidden ? "password" : "text"}
              endAdornment={
                <IconButton
                  size="small"
                  onClick={handleToggleHidePassword}
                  sx={{ mr: rem("8px") }}
                >
                  {isPasswordHidden ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              }
              placeholder="Password"
            />
          </Box>
          <StyledChangePasswordModalFormActions>
            <ContainedButton sx={{ width: "100%" }} onClick={props.handleSave}>
              Save
            </ContainedButton>
          </StyledChangePasswordModalFormActions>
        </StyledChangePasswordModalForm>
      </StyledChangePasswordModal>
    </Modal>
  )
}

export default ChangePasswordModal
