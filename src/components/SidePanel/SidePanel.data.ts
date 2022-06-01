import AvailabilityIcon from "@/assets/icons/sidepanel_driver-search_icon.inline.svg"
import FAQIcon from "@/assets/icons/sidepanel_driver-faq_icon.inline.svg"
import SubscriptionIcon from "@/assets/icons/sidepanel_driver-subscription_icon.inline.svg"
import SupportIcon from "@/assets/icons/sidepanel_driver-support_icon.inline.svg"
import CustomersIcon from "@/assets/icons/sidepanel_admin-customer_icon.inline.svg"
import DashboardIcon from "@/assets/icons/sidepanel_admin-dashboard_icon.inline.svg"
import MessagesIcon from "@/assets/icons/sidepanel_admin-messages_icon.inline.svg"
import SettingsIcon from "@/assets/icons/sidepanel_admin-settings_icon.inline.svg"
import ReferralsIcon from "@/assets/icons/sidepanel_admin-referral_icon.inline.svg"
import { GrMapLocation as TimezonesIcon } from "@react-icons/all-files/gr/GrMapLocation"
import PlansIcon from "@/assets/icons/sidepanel_admin-plans_icon.inline.svg"
import { AdminPages, UserRoles } from "@/constants/common"
import { DriverPages } from "@/constants/common"

const sidePanelData = [
  {
    label: "Availability",
    icon: AvailabilityIcon,
    href: DriverPages.availability,
    roles: [UserRoles.driver],
  },
  {
    label: "Subscription",
    icon: SubscriptionIcon,
    href: DriverPages.subscription,
    roles: [UserRoles.driver],
  },
  {
    label: "FAQ",
    icon: FAQIcon,
    href: DriverPages.faq,
    roles: [UserRoles.driver],
  },
  {
    label: "Support",
    icon: SupportIcon,
    href: DriverPages.support,
    roles: [UserRoles.driver],
    isSpaceAbove: true,
  },
  {
    label: "Customers",
    icon: CustomersIcon,
    href: AdminPages.customers,
    roles: [UserRoles.admin],
  },
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: AdminPages.dashboard,
    roles: [UserRoles.admin, UserRoles.salesAgent],
  },
  {
    label: "Messages",
    icon: MessagesIcon,
    href: AdminPages.messages,
    roles: [UserRoles.admin],
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: AdminPages.settings,
    roles: [UserRoles.admin],
  },
  {
    label: "Referrals",
    icon: ReferralsIcon,
    href: AdminPages.referrals,
    roles: [UserRoles.admin, UserRoles.salesAgent],
  },
  {
    label: "Timezones",
    icon: TimezonesIcon,
    href: AdminPages.timezones,
    roles: [UserRoles.admin],
  },
  {
    label: "Plans",
    icon: PlansIcon,
    href: AdminPages.plans,
    roles: [UserRoles.admin],
  },
]

export default sidePanelData
