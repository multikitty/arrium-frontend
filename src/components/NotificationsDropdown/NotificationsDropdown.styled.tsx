import { rem } from "polished"
import styled from "styled-components"
import { styled as muiStyled } from "@mui/material/styles"
import { Button } from "@mui/material"
import theme from "@/theme"

export const StyledNotificationsDropdownUpperSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rem("24px")};
  padding-top: ${rem("40px")};
`

export const StyledNotificationsDropdownUpperSectionDismissButton = styled.button`
  all: unset;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  line-height: ${rem("16px")};

  color: ${p => p.theme.palette.grey6};

  &:hover {
    color: ${p => p.theme.palette.main};
  }
`

export const StyledNotificationsDropdownUpperSectionUsername = styled.h4`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledNotificationsDropdownUpperSectionVerificationContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${rem("12px")};
`

export const StyledNotificationsDropdownUpperSectionVerificationText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};
  margin-right: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`
export const StyledNotificationsDropdownUpperSectionVerificationButton =
  muiStyled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: rem("16px"),
    lineHeight: rem("20px"),
    padding: `${rem("6px")} ${rem("16px")}`,
    border: "1px solid",
    borderRadius: rem("10px"),
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.grey3,
    color: theme.palette.grey7,
    fontFamily: ["Inter", "sans-serif"].join(","),
    width: "max-content",

    "&:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.grey4,
    },

    "&:active": {
      boxShadow: "none",
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.grey4,
    },

    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  })

export const StyledNotificationsDropdownMenuItemText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledInvoiceNotification = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rem("16px")} ${rem("24px")};
  width: 100%;
`

export const StyledInvoiceNotificationUpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem("8px")};
  width: 100%;
`

export const StyledInvoiceNotificationUpperContainerText = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};
  margin-right: ${rem("8px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledInvoiceNotificationUpperContainerTextInvoiceNumber = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledInvoiceNotificationBottomContainer = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.grey6};
`

export const StyledBlockAcceptNotification = styled(StyledInvoiceNotification)``

export const StyledBlockAcceptNotificationUpperContainer = styled(
  StyledInvoiceNotificationUpperContainer
)``

export const StyledBlockAcceptNotificationUpperContainerTitle = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.common.green};
`

export const StyledBlockAcceptNotificationUpperContainerDismissButton = styled(
  StyledNotificationsDropdownUpperSectionDismissButton
)``

export const StyledBlockAcceptNotificationItem = styled.div`
  display: flex;
  margin-bottom: ${rem("4px")};
`

export const StyledBlockAcceptNotificationItemTitle = styled.h5`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};
  margin-right: ${rem("8px")};

  color: ${p => p.theme.palette.grey7};
`

export const StyledBlockAcceptNotificationItemValue = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledBlockAcceptNotificationBottomContainer = styled(
  StyledInvoiceNotificationBottomContainer
)`
  margin-top: ${rem("4px")};
`
