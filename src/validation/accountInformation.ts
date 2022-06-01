import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { UserRoles } from "@/constants/common"
import { UserRolesType } from "@/types/common"
import { phoneRegExp } from "./personalInformation"

const accountInformationSchema = Yup.object().shape({
  firstName: Yup.string().required("The First Name field must not be empty"),
  surName: Yup.string().required("The Surname field must not be empty"),
  email: Yup.string()
    .required("The Email Address field must not be empty")
    .email("Please enter a valid email address"),
  phoneNumber: Yup.string().matches(
    phoneRegExp,
    "Please enter a valid phone number"
  ),
  isEmailVerified: Yup.boolean(),
  timezone: Yup.string().required("The Timezone field must not be empty"),
  role: Yup.string().oneOf([...Object.values(UserRoles)]),
  status: Yup.string().oneOf(["disabled", "active", "inactive"]),
  startDate: Yup.date(),
  endDate: Yup.date(),
  sendPasswordChangeRequest: Yup.boolean(),
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
    status: "active",
    startDate: "",
    endDate: "",
    sendPasswordResetEmail: false,
  },
}

export default accountInformationOptions
