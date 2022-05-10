import { UserRoles } from "@/types/common"

export interface AdminLayoutProps {
  children: React.ReactNode
  roles: (keyof typeof UserRoles)[]
}
