import { ClickAwayListener, IconButton, Tooltip } from "@mui/material"
import React, { ReactElement } from "react"
import {
  StyledContactFormSuccessModalCard,
  StyledContactFormSuccessModalCardIconContainer,
  StyledContactFormSuccessModalCardText,
  StyledContactFormSuccessModalCardTitle,
  StyledContactFormSuccessModalCloseIconContainer,
  StyledContactFormSuccessModalOverlay,
} from "./FormSuccessModal.styled"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import theme from "@/theme"

interface ContactFormSuccessModalProps {
  open: boolean
  handleClose: () => void
  title?: string
  text?: string | ReactElement
}

const ContactFormSuccessModal = ({
  handleClose,
  open,
  title = "Message sent!",
  text = `A member of the team will be in touch with you at the email address provided.`,
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
            {title}
          </StyledContactFormSuccessModalCardTitle>
          <StyledContactFormSuccessModalCardText>
            {text}
          </StyledContactFormSuccessModalCardText>
        </StyledContactFormSuccessModalCard>
      </StyledContactFormSuccessModalOverlay>
    </ClickAwayListener>
  ) : (
    <></>
  )
}

export default ContactFormSuccessModal
