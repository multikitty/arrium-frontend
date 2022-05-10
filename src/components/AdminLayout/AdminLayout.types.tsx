import { UserRolesType } from "@/types/common"

export interface AdminLayoutProps {
  children: React.ReactNode
  roles: UserRolesType[]
}
