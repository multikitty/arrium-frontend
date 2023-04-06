import React, { useEffect, useState } from "react"
import { useLocation } from "@reach/router"
import { Avatar, Badge, Box } from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import { rem } from "polished"

import theme from "@/theme"
import {
  StyledFullscreenMenu,
  StyledFullscreenMenuBottomContainer,
  StyledFullscreenMenuBottomContainerItem,
  StyledFullscreenMenuBottomContainerItemIcon,
  StyledFullscreenMenuBottomContainerItemText,
  StyledFullscreenMenuUpperContainer,
  StyledFullscreenMenuUpperContainerItem,
  StyledFullscreenMenuUpperContainerItemText,
  StyledFullscreenMenuUpperContainerNotificationIcon,
} from "./FullscreenMenu.styled"
import { ContainedButton } from "../commons/Button"
import { useStore } from "@/store"
import FullscreenMenuNotifications from "./FullscreenMenuNotifications"
import { driverNavigationData } from "./FullscreenMenu.data"
import { Settings } from "@mui/icons-material"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import { updateNotificationView, useAllNotifications } from "@/agent/notification"
import { WebSocketURL } from "@/agent/axios"
import { BlockNotificationData, GetAllNotificationResult, InvoiceNotificationData, UpdateNotificationViewStatusResult, UpdateNotificationViewStatusVariables } from "@/lib/interfaces/notification"
import { useMutation } from "react-query"
import { localStorageUtils } from "@/utils"
import { UserType } from "@/types/auth"
import { USER } from "@/constants/localStorage"

export interface FullscreenMenuProps extends PageProps {
  open: boolean
  handleFullscreenMenuClose: () => void
}

const FullscreenMenu = ({
  open,
  handleFullscreenMenuClose,
  country_code,
}: FullscreenMenuProps) => {
  const userDetails = JSON.parse(localStorageUtils.get(USER) as string) as UserType
  const { navigate } = useNavigate({ country_code })
  const { userStore } = useStore()
  const { pathname } = useLocation()
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)

  const {
    data: allNotification,
    isLoading,
    refetch,
  } = useAllNotifications({
    pk: userStore.flexData?.pk,
  })
  const [notificationPing, setNotificationPing] = React.useState<Boolean>(false)

  const { mutate: updateNotificationViewStatus } = useMutation<
    UpdateNotificationViewStatusResult,
    Error,
    UpdateNotificationViewStatusVariables
  >(updateNotificationView)

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


  const handleNotificationsMenuOpen = () => setIsNotificationsMenuOpen(true)
  const handleNotificationsMenuClose = () => setIsNotificationsMenuOpen(false)

  const handleLogoutButtonClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = e => {
      e.stopPropagation()
      userStore.logout()
      navigate(routes.home)
      handleFullscreenMenuClose()
    }

  const handleProfileItemClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
      e.stopPropagation()
      navigate(routes.profile)
      handleFullscreenMenuClose()
    }

  const handleNotificationsItemClick:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
      e.stopPropagation()
      handleNotificationsMenuOpen()
      handleNotificationsIconClick()
    }

  const handleNavigationItemClick = (href: string) => {
    handleFullscreenMenuClose()
    navigate(href)
  }

  const navigationItemsJSX = driverNavigationData.map(data => (
    <StyledFullscreenMenuBottomContainerItem
      key={data.href}
      active={pathname.includes(data.href)}
      onClick={() => handleNavigationItemClick(`/${data.href}`)}
    >
      <StyledFullscreenMenuBottomContainerItemIcon
        active={pathname.includes(data.href)}
      >
        {<data.icon />}
      </StyledFullscreenMenuBottomContainerItemIcon>
      <StyledFullscreenMenuBottomContainerItemText>
        {data.label}
      </StyledFullscreenMenuBottomContainerItemText>
    </StyledFullscreenMenuBottomContainerItem>
  ))

  const handleNotificationsIconClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
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

  return (
    <StyledFullscreenMenu visible={open}>
      {isNotificationsMenuOpen ? (
        <FullscreenMenuNotifications
          handleClose={handleNotificationsMenuClose}
          allNotification={notifications}
          refetch={refetch}
        />
      ) : (
        <React.Fragment>
          <StyledFullscreenMenuUpperContainer>
            <StyledFullscreenMenuUpperContainerItem
              active={pathname.includes("profile")}
              onClick={handleProfileItemClick}
            >
              <Box mr={rem("12px")}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                >
                  {userDetails ? `${userDetails.firstname?.[0].toUpperCase() || ""}${userDetails.lastname?.[0] || ""
                    }` : ""}
                </Avatar>
              </Box>
              <StyledFullscreenMenuUpperContainerItemText>
                {userDetails ? `${userDetails.firstname} ${userDetails.lastname
                  }` : ""}
              </StyledFullscreenMenuUpperContainerItemText>
              <Settings
                sx={{
                  ml: 1,
                  color: pathname.includes("profile")
                    ? theme.palette.main
                    : theme.palette.grey6,
                  cursor: "pointer",
                }}
              />
            </StyledFullscreenMenuUpperContainerItem>
            <StyledFullscreenMenuUpperContainerItem
              last
              onClick={handleNotificationsItemClick}
            >
              <Box mr={rem("12px")}>
                {notificationPing ?
                  <Badge
                    color="error"
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                  >
                    <StyledFullscreenMenuUpperContainerNotificationIcon>
                      <NotificationsNoneIcon
                        sx={{ fontSize: 24, color: theme.palette.main }}
                      />
                    </StyledFullscreenMenuUpperContainerNotificationIcon>
                  </Badge> : (<StyledFullscreenMenuUpperContainerNotificationIcon>
                    <NotificationsNoneIcon
                      sx={{ fontSize: 24, color: theme.palette.main }}
                    />
                  </StyledFullscreenMenuUpperContainerNotificationIcon>)}
              </Box>
              <StyledFullscreenMenuUpperContainerItemText>
                Notifications
              </StyledFullscreenMenuUpperContainerItemText>
            </StyledFullscreenMenuUpperContainerItem>
          </StyledFullscreenMenuUpperContainer>
          <StyledFullscreenMenuBottomContainer>
            {navigationItemsJSX}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <ContainedButton onClick={handleLogoutButtonClick}>
                Logout
              </ContainedButton>
            </Box>
          </StyledFullscreenMenuBottomContainer>
        </React.Fragment>
      )}
    </StyledFullscreenMenu>
  )
}

export default FullscreenMenu
