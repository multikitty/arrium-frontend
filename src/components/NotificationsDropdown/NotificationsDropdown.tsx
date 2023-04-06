import React, { useState } from "react"
import { navigate } from "gatsby"
import { Divider, Menu, MenuItem } from "@mui/material"
import { rem } from "polished"

import {
  StyledNotificationsDropdownUpperSection,
  StyledNotificationsDropdownUpperSectionDismissButton,
  StyledNotificationsDropdownUpperSectionUsername,
} from "./NotificationsDropdown.styled"
import InvoiceNotification from "./InvoiceNotification"
import BlockAcceptNotification from "./BlockAcceptNotification"
import { NotifcatioDropDownProps } from "./NotificationsDropdown.types"
import routes from "@/constants/routes"
import {
  updateAllBlockNotificationDismiss,
  updateBlockNotificationDismiss,
} from "@/agent/notification"
import { useMutation } from "react-query"
import {
  UpdateAllBlockNotificationDismissResult,
  UpdateAllBlockNotificationDismissVariables,
  UpdateBlockNotificationDismissResult,
  UpdateBlockNotificationDismissVariables,
} from "@/lib/interfaces/notification"
import { useStore } from "@/store"
import { WebSocketURL } from "@/agent/axios"

const NotificationsDropdown: React.FC<NotifcatioDropDownProps> = ({
  handleClose,
  anchorEl,
  open,
  pk,
  allNotification,
  refetch,
}) => {
  const { mutate: allBlockNotificationDismiss } = useMutation<
    UpdateAllBlockNotificationDismissResult,
    Error,
    UpdateAllBlockNotificationDismissVariables
  >(updateAllBlockNotificationDismiss)
  const { mutate: blockNotificationDismiss } = useMutation<
    UpdateBlockNotificationDismissResult,
    Error,
    UpdateBlockNotificationDismissVariables
  >(updateBlockNotificationDismiss)

  const handleInvoiceNotificationClick:
    | React.MouseEventHandler<HTMLLIElement>
    | undefined = e => {
      e.stopPropagation()
      navigate(routes.subscription)
    }

  const handleAllBlockNotificationDismiss = async () => {
    await allBlockNotificationDismiss(
      { pk: pk },
      {
        onSuccess(data) {
          if (!data.success) {
            refetch()
            return
          }
          refetch()
          handleClose()
        },
        onError(error, variables) {
          refetch()
          handleClose()
        },
      }
    )
  }

  const handleDismissBlockNotification = async (sk: string) => {
    await blockNotificationDismiss(
      { pk: pk, sk: sk },
      {
        onSuccess(data) {
          if (!data.success) {
            refetch()
            return
          }
          refetch()
          handleClose()
        },
        onError(error, variables) {
          refetch()
          handleClose()
        },
      }
    )
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "auto",
          filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1))",
          mt: 2,
          borderRadius: rem("20px"),
          minWidth: rem("360px"),
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 18,
            width: 14,
            height: 14,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <StyledNotificationsDropdownUpperSection>
        <StyledNotificationsDropdownUpperSectionUsername>
          Notifications
        </StyledNotificationsDropdownUpperSectionUsername>
        <StyledNotificationsDropdownUpperSectionDismissButton onClick={handleAllBlockNotificationDismiss}>
          Dismiss all
        </StyledNotificationsDropdownUpperSectionDismissButton>
      </StyledNotificationsDropdownUpperSection>
      <Divider />

      {allNotification?.invoiceNotificationData?.map(item => {
        return (
          <MenuItem
            dense
            divider
            sx={{ py: rem("12px") }}
            onClick={handleInvoiceNotificationClick}
          >
            <InvoiceNotification
              invoiceNumber={item?.invID}
              fromNow={new Date(
                item?.sk?.split("#")[item?.sk?.split("#")?.length - 2] * 1000
              ).toDateString()}
            />
          </MenuItem>
        )
      })}
      {allNotification?.blockNotificationData?.map(item => {
        return (
          <MenuItem dense sx={{ py: rem("12px") }}>
            <BlockAcceptNotification
              location={item.stationName}
              date={new Date(item?.bStartTimeU * 1000).toDateString()}
              time={`${new Date(item?.sessionTimeU * 1000).getHours()}`}
              pay={item.price}
              fromNow={new Date(
                item?.sk?.split("#")[item?.sk?.split("#")?.length - 2] * 1000
              ).toDateString()}
              onDismiss={() => handleDismissBlockNotification(item?.sk)}
            />
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default NotificationsDropdown
