import { UserRoles } from "@/constants/common"
import sidePanelData from "../SidePanel/SidePanel.data"

export const driverNavigationData = sidePanelData.filter(data =>
  data.roles.includes(UserRoles.driver as never)
)
