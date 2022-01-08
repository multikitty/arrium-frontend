import React, { useState } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import { rem } from "polished"
import {
  StyledAddCountryModal as StyledChangePasswordModal,
  StyledAddCountryModalCloseIconContainer as StyledChangePasswordModalCloseIconContainer,
  StyledAddCountryModalForm as StyledChangePasswordModalForm,
  StyledAddCountryModalFormActions as StyledChangePasswordModalFormActions,
  StyledAddCountryModalFormField as StyledChangePasswordModalFormField,
  StyledAddCountryModalFormHelperText as StyledChangePasswordModalFormHelperText,
  StyledAddCountryModalTitle as StyledChangePasswordModalTitle,
} from "../SettingsPage/SettingsPage.styled"
import CloseIcon from "@mui/icons-material/Close"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"

interface IProps {
  open: boolean
  handleClose: () => void
  handleSave: () => void
}

const ChangePasswordModal = (props: IProps) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [isCurrentPasswordHidden, setIsCurrentPasswordHidden] = useState(true)
  const [newPassword, setNewPassword] = useState("")
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true)
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isConfirmNewPasswordHidden, setIsConfirmNewPasswordHidden] =
    useState(true)

  const handleCurrentPasswordFieldChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setCurrentPassword(e.target.value)

  const handleToggleHideCurrentPassword = () =>
    setIsCurrentPasswordHidden(p => !p)

  const handleNewPasswordFieldChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setNewPassword(e.target.value)

  const handleToggleHideNewPassword = () => setIsNewPasswordHidden(p => !p)

  const handleConfirmNewPasswordFieldChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setConfirmNewPassword(e.target.value)

  const handleToggleHideConfirmNewPassword = () =>
    setIsConfirmNewPasswordHidden(p => !p)

  const arePasswordsMatching = newPassword === confirmNewPassword
  const isSaveButtonDisabled =
    !currentPassword ||
    !newPassword ||
    !confirmNewPassword ||
    !arePasswordsMatching

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledChangePasswordModal>
        <StyledChangePasswordModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledChangePasswordModalCloseIconContainer>
        <StyledChangePasswordModalTitle>
          Change password
        </StyledChangePasswordModalTitle>
        <StyledChangePasswordModalForm>
          <Box display="flex" mb={rem("16px")}>
            <StyledChangePasswordModalFormField
              type={isCurrentPasswordHidden ? "password" : "text"}
              value={currentPassword}
              onChange={handleCurrentPasswordFieldChange}
              endAdornment={
                <IconButton
                  size="small"
                  onClick={handleToggleHideCurrentPassword}
                  sx={{ mr: rem("8px") }}
                >
                  {isCurrentPasswordHidden ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              }
              placeholder="Current password"
            />
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("16px")}>
            <StyledChangePasswordModalFormField
              type={isNewPasswordHidden ? "password" : "text"}
              value={newPassword}
              onChange={handleNewPasswordFieldChange}
              endAdornment={
                <IconButton
                  size="small"
                  onClick={handleToggleHideNewPassword}
                  sx={{ mr: rem("8px") }}
                >
                  {isNewPasswordHidden ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              }
              placeholder="New password"
              error={!arePasswordsMatching}
            />
            {!arePasswordsMatching && (
              <StyledChangePasswordModalFormHelperText>
                Passwords must match!
              </StyledChangePasswordModalFormHelperText>
            )}
          </Box>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledChangePasswordModalFormField
              type={isConfirmNewPasswordHidden ? "password" : "text"}
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordFieldChange}
              endAdornment={
                <IconButton
                  size="small"
                  onClick={handleToggleHideConfirmNewPassword}
                  sx={{ mr: rem("8px") }}
                >
                  {isConfirmNewPasswordHidden ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              }
              placeholder="Confirm new password"
              error={!arePasswordsMatching}
            />
            {!arePasswordsMatching && (
              <StyledChangePasswordModalFormHelperText>
                Passwords must match!
              </StyledChangePasswordModalFormHelperText>
            )}
          </Box>
          <StyledChangePasswordModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={isSaveButtonDisabled}
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
          </StyledChangePasswordModalFormActions>
        </StyledChangePasswordModalForm>
      </StyledChangePasswordModal>
    </Modal>
  )
}

export default ChangePasswordModal
