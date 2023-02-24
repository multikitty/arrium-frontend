import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { UserRoles } from "@/constants/common"
import { PlanType, UserRolesType } from "@/types/common"
import {
  CUSTOMER_ACCOUNT_STATUS,
  CustomerAccountStatus,
} from "@/lib/interfaces/customers"

const accountInformationSchema = Yup.object().shape({
  firstName: Yup.string().required("The First Name field must not be empty"),
  surName: Yup.string().required("The Surname field must not be empty"),
  email: Yup.string()
    .required("The Email Address field must not be empty")
    .email("Please enter a valid email address"),
  phoneNumber: Yup.string().required("Phone number field must not be empty"),
  isEmailVerified: Yup.boolean(),
  timezone: Yup.string().required("The Timezone field must not be empty"),
  role: Yup.string().oneOf([...Object.values(UserRoles)]),
  status: Yup.string().oneOf([...Object.values(CUSTOMER_ACCOUNT_STATUS)]),
  country: Yup.string(),
  region: Yup.string(),
  sendAccountApprovedEmail: Yup.boolean(),
  planType: Yup.string().required("Plan type field must not be empty"),
  stationType: Yup.string().required("Station type field must not be empty"),
  enablePricingPlan: Yup.boolean(),
  startDate: Yup.date().nullable(),
  endDate: Yup.date().nullable(),
})

const accountInformationOptions = {
  resolver: yupResolver(accountInformationSchema),
  defaultValues: {
    firstName: "",
    surName: "",
    email: "",
    phoneNumber: "",
    isEmailVerified: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    role: UserRoles.driver as UserRolesType,
    status: "active" as CustomerAccountStatus,
    country: "",
    region: "",
    sendAccountApprovedEmail: false,
    planType: "basic" as PlanType,
    stationType: "",
    enablePricingPlan: false,
    startDate: null as number | null,
    endDate: null as number | null,
  },
}

export default accountInformationOptions
