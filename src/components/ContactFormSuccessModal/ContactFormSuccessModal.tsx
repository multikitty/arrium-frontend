import { ClickAwayListener, IconButton, Tooltip } from "@mui/material"
import React from "react"
import {
  StyledContactFormSuccessModalCard,
  // StyledContactFormSuccessModalCardIcon,
  StyledContactFormSuccessModalCardIconContainer,
  StyledContactFormSuccessModalCardText,
  StyledContactFormSuccessModalCardTitle,
  StyledContactFormSuccessModalCloseIconContainer,
  StyledContactFormSuccessModalOverlay,
} from "./ContactFormSuccessModal.styled"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import theme from "@/theme"
import { ContactFormSuccessModalProps } from "./ContactFormSuccessModal.types"

const ContactFormSuccessModal = ({
  handleClose,
  open,
}: ContactFormSuccessModalProps) => {
  const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation()
    handleClose()
  }

  return open ? (
    <ClickAwayListener onClickAway={handleClose}>
      <StyledContactFormSuccessModalOverlay onClick={handleOverlayClick}>
        <StyledContactFormSuccessModalCard>
          <StyledContactFormSuccessModalCloseIconContainer>
            <Tooltip title="Close">
              <IconButton onClick={handleClose}>
                <CloseIcon
                  sx={{
                    color: theme.palette.grey4,
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                />
              </IconButton>
            </Tooltip>
          </StyledContactFormSuccessModalCloseIconContainer>
          <StyledContactFormSuccessModalCardIconContainer>
            <CheckCircleOutlineIcon
              sx={{ color: theme.palette.common.green, fontSize: 45 }}
            />
          </StyledContactFormSuccessModalCardIconContainer>
          <StyledContactFormSuccessModalCardTitle>
            Message sent!
          </StyledContactFormSuccessModalCardTitle>
          <StyledContactFormSuccessModalCardText>
            A member of the team will be in with you touch at the email address
            provided
          </StyledContactFormSuccessModalCardText>
        </StyledContactFormSuccessModalCard>
      </StyledContactFormSuccessModalOverlay>
    </ClickAwayListener>
  ) : (
    <></>
  )
}

export default ContactFormSuccessModal
