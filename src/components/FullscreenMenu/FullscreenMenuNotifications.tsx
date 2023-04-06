import React from "react"
import { Box, Divider, IconButton } from "@mui/material"
import BackIcon from "@mui/icons-material/ChevronLeft"
import { rem } from "polished"

import {
  StyledFullscreenMenuNotifications,
  StyledFullscreenMenuNotificationsList,
  StyledFullscreenMenuNotificationsListItem,
  StyledFullscreenMenuNotificationsUpperContainer,
  StyledFullscreenMenuNotificationsUpperContainerDismissButton,
  StyledFullscreenMenuNotificationsUpperContainerTitle,
} from "./FullscreenMenu.styled"
import theme from "@/theme"
import InvoiceNotification from "../NotificationsDropdown/InvoiceNotification"
import BlockAcceptNotification from "../NotificationsDropdown/BlockAcceptNotification"
import { updateAllBlockNotificationDismiss, updateBlockNotificationDismiss, useAllNotifications } from "@/agent/notification"
import { useStore } from "@/store"
import routes from "@/constants/routes"
import { navigate } from "gatsby"
import { useMutation } from "react-query"
import {
  GetAllNotificationResult,
  UpdateAllBlockNotificationDismissResult,
  UpdateAllBlockNotificationDismissVariables,
  UpdateBlockNotificationDismissResult,
  UpdateBlockNotificationDismissVariables,
} from "@/lib/interfaces/notification"

interface FullscreenMenuNotificationsProps {
  handleClose: () => void
  refetch: () => void
  allNotification: GetAllNotificationResult
}

const FullscreenMenuNotifications = (
  props: FullscreenMenuNotificationsProps
) => {
  const { userStore } = useStore()

  const { mutate: blockNotificationDismiss } = useMutation<
    UpdateBlockNotificationDismissResult,
    Error,
    UpdateBlockNotificationDismissVariables
  >(updateBlockNotificationDismiss)

  const { mutate: allBlockNotificationDismiss } = useMutation<
    UpdateAllBlockNotificationDismissResult,
    Error,
    UpdateAllBlockNotificationDismissVariables
  >(updateAllBlockNotificationDismiss)


  const handleDismissBlockNotification = async (sk: string) => {
    await blockNotificationDismiss(
      { pk: userStore.flexData?.pk, sk: sk },
      {
        onSuccess(data) {
          if (!data.success) {
            props.refetch()
            return
          }
          props.refetch()
          props.handleClose()
        },
        onError(error, variables) {
          props.refetch()
          props.handleClose()
        },
      }
    )
  }

  const handleAllBlockNotificationDismiss = async () => {
    await allBlockNotificationDismiss(
      { pk: userStore.flexData?.pk },
      {
        onSuccess(data) {
          if (!data.success) {
            props.refetch()
            return
          }
          props.refetch()
          props.handleClose()
        },
        onError(error, variables) {
          props.refetch()
          props.handleClose()
        },
      }
    )
  }

  const handleInvoiceNotificationClick:
    | React.MouseEventHandler<HTMLLIElement>
    | undefined = e => {
      e.stopPropagation()
      navigate(routes.subscription)
    }

  return (
    <StyledFullscreenMenuNotifications>
      <StyledFullscreenMenuNotificationsUpperContainer>
        <IconButton
          size="small"
          onClick={props.handleClose}
          sx={{ mr: rem("24px") }}
        >
          <BackIcon sx={{ fontSize: 24, color: theme.palette.grey6 }} />
        </IconButton>
        <StyledFullscreenMenuNotificationsUpperContainerTitle>
          Notifications
        </StyledFullscreenMenuNotificationsUpperContainerTitle>
        <StyledFullscreenMenuNotificationsUpperContainerDismissButton onClick={handleAllBlockNotificationDismiss}>
          Dismiss all
        </StyledFullscreenMenuNotificationsUpperContainerDismissButton>
      </StyledFullscreenMenuNotificationsUpperContainer>
      <StyledFullscreenMenuNotificationsList>
        <StyledFullscreenMenuNotificationsListItem>
          {props.allNotification?.invoiceNotificationData?.map(item => {
            return (
              <Box onClick={handleInvoiceNotificationClick}>
                <InvoiceNotification
                  invoiceId="someInvoiceId"
                  invoiceNumber={item.invID}
                  fromNow={new Date(
                    item.sk.split("#")[item.sk.split("#").length - 2] * 1000
                  ).toDateString()}
                />
              </Box>
            )
          })}
        </StyledFullscreenMenuNotificationsListItem>
        <Divider />
        <StyledFullscreenMenuNotificationsListItem>
          {props.allNotification?.blockNotificationData?.map(item => {
            return (
              <BlockAcceptNotification
                location={item.stationName}
                date={new Date(item.bStartTimeU * 1000).toDateString()}
                time={`${new Date(item.sessionTimeU * 1000).getHours()}`}
                pay={item.price}
                fromNow={new Date(
                  item.sk.split("#")[item.sk.split("#").length - 2] * 1000
                ).toDateString()}
                onDismiss={() => handleDismissBlockNotification(item.sk)}
              />
            )
          })}
        </StyledFullscreenMenuNotificationsListItem>
      </StyledFullscreenMenuNotificationsList>
    </StyledFullscreenMenuNotifications>
  )
}

export default FullscreenMenuNotifications
