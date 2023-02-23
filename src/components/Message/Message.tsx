import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton } from "@mui/material"
import { SnackbarContentProps, SnackbarKey, useSnackbar } from "notistack"

import {
  StyledMessage,
  StyledMessageIconContainer,
  StyledMessageText,
  StyledMessageTitle,
} from "@/components/Message/Message.styled"
import SuccessIcon from "@/assets/icons/snackbar-success_icon.inline.svg"
import WarningIcon from "@/assets/icons/snackbar-warning_icon.inline.svg"
import ErrorIcon from "@/assets/icons/snackbar-error_icon.inline.svg"
import theme from "@/theme"

export type MessageVariant = "success" | "warning" | "error"

export interface MessagePageProps
  extends Omit<SnackbarContentProps, "id" | "title"> {
  variant: MessageVariant
  title: React.ReactNode
  text: React.ReactNode
  id: SnackbarKey
}

const iconMap = {
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
}

const Message = React.forwardRef<HTMLDivElement, MessagePageProps>(
  (props, ref) => {
    const { closeSnackbar } = useSnackbar()
    const { variant, title, text, id, ...rest } = props

    const handleClose = () => {
      closeSnackbar(id)
    }

    return (
      <StyledMessage ref={ref} role="alert" variant={variant} {...rest}>
        <StyledMessageIconContainer>
          {iconMap[variant]}
        </StyledMessageIconContainer>
        <Box display="flex" flexDirection="column">
          <StyledMessageTitle>
            <React.Fragment>{title}</React.Fragment>
          </StyledMessageTitle>
          <StyledMessageText>
            <React.Fragment>{text}</React.Fragment>
          </StyledMessageText>
        </Box>
        <Box display="flex" alignItems="flex-start" alignSelf="flex-start">
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 10, color: theme.palette.grey5 }} />
          </IconButton>
        </Box>
      </StyledMessage>
    )
  }
)

export default Message
