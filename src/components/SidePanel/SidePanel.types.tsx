import { UserRoles } from "@/types/common"

export interface SidePanelProps {
  role: keyof typeof UserRoles
}
