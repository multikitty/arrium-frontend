import React, { useEffect, useState } from "react"
import { Avatar, Badge, IconButton, Tooltip } from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import { observer } from "mobx-react-lite"
import { rem } from "polished"

import { StyledTopbar, StyledTopbarNotificationButton } from "./Topbar.styled"
import theme from "@/theme"
import ProfileDropdown from "@/components/ProfileDropdown"
import NotificationsDropdown from "@/components/NotificationsDropdown"
import { useStore } from "@/store"
import { PageProps } from "@/lib/interfaces/common"
import { useMutation } from "react-query"
import {
  updateNotificationView,
  useAllNotifications,
} from "@/agent/notification"
import {
  BlockNotificationData,
  GetAllNotificationResult,
  InvoiceNotificationData,
  UpdateNotificationViewStatusResult,
  UpdateNotificationViewStatusVariables,
} from "@/lib/interfaces/notification"
import { WebSocketURL } from "@/agent/axios"
import { localStorageUtils } from "@/utils"
import { USER } from "@/constants/localStorage"
import { UserType } from "@/types/auth"

interface ITopbarProps extends PageProps { }

const Topbar: React.FC<ITopbarProps> = ({ country_code }) => {
  const { userStore } = useStore()
  const [profileDropdownAnchorEl, setProfileDropdownAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const profileDropdownOpen = Boolean(profileDropdownAnchorEl)
  const [notificationsDropdownAnchorEl, setNotificationsDropdownAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const [notificationPing, setNotificationPing] = React.useState<Boolean>(false)
  const notificationsDropdownOpen = Boolean(notificationsDropdownAnchorEl)

  const { mutate: updateNotificationViewStatus } = useMutation<
    UpdateNotificationViewStatusResult,
    Error,
    UpdateNotificationViewStatusVariables
  >(updateNotificationView)

  const {
    data: allNotification,
    isLoading,
    refetch,
  } = useAllNotifications({
    pk: userStore.flexData?.pk,
  })


  const [notifications, setNotifications] = useState<GetAllNotificationResult>(allNotification)


  React.useEffect(() => {
    if (
      notifications?.blockNotificationData &&
      notifications?.invoiceNotificationData
    ) {
      setNotificationPing(
        [
          ...notifications?.blockNotificationData,
          ...notifications?.invoiceNotificationData,
        ].some(el => el.notifViewed === false)
      )
    }
  }, [notifications])

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileDropdownAnchorEl(event.currentTarget)
  }

  const handleNotificationsIconClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setNotificationsDropdownAnchorEl(event.currentTarget)
    if (notificationPing) {
      await updateNotificationViewStatus(
        { pk: userStore.flexData?.pk },
        {
          onSuccess(data) {
            if (!data.success) {
              return
            }
            refetch()
          },
          onError(error, variables) {
            console.error("ERROR:", error)
            console.log("VARIABLES USED:", variables)
          },
        }
      )
    } else {
      refetch()
    }
  }

  const handleProfileDropdownClose = () => {
    setProfileDropdownAnchorEl(null)
  }

  const handleNotificationsDropdownClose = () => {
    setNotificationsDropdownAnchorEl(null)
  }

  const socket = new WebSocket(`${WebSocketURL}?pk=${userStore.flexData?.pk}`);
  // Listen for messages
  socket.onmessage = function (event) {
    if (JSON.parse(event?.data).notifType === "block") {
      const newBlockNotificationData: Array<BlockNotificationData> = notifications?.blockNotificationData ?? []
      newBlockNotificationData.push(JSON.parse(event?.data))
      setNotifications({ ...notifications, blockNotificationData: newBlockNotificationData })
    } else {
      const newInvoiceNotificationData: Array<InvoiceNotificationData> = notifications?.invoiceNotificationData ?? []
      newInvoiceNotificationData.push(JSON.parse(event?.data))
      setNotifications({ ...notifications, invoiceNotificationData: newInvoiceNotificationData })
    }
  };

  useEffect(() => {
    setNotifications(allNotification)
  }, [allNotification])
  const userDetails = JSON.parse(localStorageUtils.get(USER) as string) as UserType
  return (
    <StyledTopbar>
      <Tooltip title="Notifications">
        <IconButton
          disableRipple
          size="small"
          sx={{ mr: rem("16px") }}
          onClick={handleNotificationsIconClick}
        >
          {notificationPing ? (
            <Badge
              color="error"
              overlap="circular"
              badgeContent=" "
              variant="dot"
            >
              <StyledTopbarNotificationButton
                active={notificationsDropdownOpen}
              >
                <NotificationsNoneIcon
                  sx={{ fontSize: 24, color: theme.palette.main }}
                />
              </StyledTopbarNotificationButton>
            </Badge>
          ) : (
            <StyledTopbarNotificationButton active={notificationsDropdownOpen}>
              <NotificationsNoneIcon
                sx={{ fontSize: 24, color: theme.palette.main }}
              />
            </StyledTopbarNotificationButton>
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Account details">
        <IconButton disableRipple onClick={handleAvatarClick} size="small">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              border: "1px solid transparent",
              borderColor: profileDropdownOpen
                ? theme.palette.main
                : "transparent",
              fontSize: 16,
            }}
          >
            {userDetails ? `${userDetails.firstname?.[0].toUpperCase() || ""}${userDetails.lastname?.[0].toUpperCase() || ""
              }` : ""}
          </Avatar>
        </IconButton>
      </Tooltip>
      {profileDropdownOpen && (
        <ProfileDropdown
          anchorEl={profileDropdownAnchorEl}
          open={profileDropdownOpen}
          handleClose={handleProfileDropdownClose}
          country_code={country_code}
        />
      )}
      {notificationsDropdownOpen && (
        <NotificationsDropdown
          pk={userStore.flexData?.pk}
          anchorEl={notificationsDropdownAnchorEl}
          open={notificationsDropdownOpen}
          handleClose={handleNotificationsDropdownClose}
          allNotification={notifications}
          isLoading={isLoading}
          refetch={refetch}
        />
      )}
    </StyledTopbar>
  )
}

export default observer(Topbar)
