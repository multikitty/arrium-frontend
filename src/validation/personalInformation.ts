import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const personalInformationSchema = Yup.object().shape({
  name: Yup.string().required("The First Name field must not be empty"),
  surName: Yup.string().required("The Surname field must not be empty"),
  email: Yup.string()
    .required("The Email Address field must not be empty")
    .email("Please enter a valid email address"),
  phoneNumber: Yup.string().matches(
    phoneRegExp,
    "Please enter a valid phone number"
  ),
  timezone: Yup.string().required("The Timezone field must not be empty"),
  password: Yup.string().required("The Password field must not be empty"),
})

const personalInformationOptions = {
  resolver: yupResolver(personalInformationSchema),
  defaultValues: {
    name: "",
    surName: "",
    email: "",
    phoneNumber: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    password: "niceetry",
  },
}

export default personalInformationOptions
