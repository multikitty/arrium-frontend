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
  StyledUpdatePasswordModalFormFieldLabel,
} from "../SettingsPage/SettingsPage.styled"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { useStore } from "@/store"

interface UpdatePasswordModalProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

const ChangePasswordModal = (props: UpdatePasswordModalProps) => {
  const { userStore } = useStore()
  const [password,setPassword]=useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const handlePasswordFieldChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setPassword(e.target.value)
  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }
  const isSaveButtonDisabled = !password
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledChangePasswordModal sx={{ borderRadius: '20px' }}>
        <StyledChangePasswordModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledChangePasswordModalCloseIconContainer>
        <StyledChangePasswordModalTitle>
          Update password
        </StyledChangePasswordModalTitle>
        <StyledChangePasswordModalForm>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledUpdatePasswordModalFormFieldLabel>Email Address</StyledUpdatePasswordModalFormFieldLabel>
            <StyledChangePasswordModalFormField
              type="text"
              defaultValue={userStore.currentUser?.email}
              readOnly
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledUpdatePasswordModalFormFieldLabel>Password</StyledUpdatePasswordModalFormFieldLabel>
            <StyledChangePasswordModalFormField
              autoComplete="new-password"
              type={isPasswordHidden ? "password" : "text"}
              value={password}
              onChange={handlePasswordFieldChange}
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
            <ContainedButton sx={{ width: "100%" }} onClick={props.handleSave} disabled={isSaveButtonDisabled}>
              Save
            </ContainedButton>
          </StyledChangePasswordModalFormActions>
          <StyledChangePasswordModalFormActions>
            <OutlinedButton grey sx={{ width: "100%" }} onClick={props.handleClose}>
              Cancel
            </OutlinedButton>
          </StyledChangePasswordModalFormActions>
        </StyledChangePasswordModalForm>
      </StyledChangePasswordModal>
    </Modal >
  )
}

export default ChangePasswordModal
