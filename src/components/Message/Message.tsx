import React, { useState } from "react"
import {
  StyledMessage,
  StyledMessageIconContainer,
  StyledMessageText,
} from "./Message.styled"
import SuccessIcon from "../../assets/icons/snackbar-success_icon.inline.svg"
import WarningIcon from "../../assets/icons/snackbar-warning_icon.inline.svg"
import ErrorIcon from "../../assets/icons/snackbar-error_icon.inline.svg"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton } from "@mui/material"
import theme from "../../theme"

interface Props {
  variant: "success" | "warning" | "error"
  text: string
}

const iconMap = {
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
}

const Message = (props: Props) => {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <StyledMessage hidden={isHidden} variant={props.variant}>
      <StyledMessageIconContainer>
        {iconMap[props.variant]}
      </StyledMessageIconContainer>
      <StyledMessageText>{props.text}</StyledMessageText>
      <Box display="flex" alignItems="flex-start" alignSelf="flex-start">
        <IconButton size="small" onClick={() => setIsHidden(true)}>
          <CloseIcon sx={{ fontSize: 10, color: theme.palette.grey5 }} />
        </IconButton>
      </Box>
    </StyledMessage>
  )
}

export default Message
