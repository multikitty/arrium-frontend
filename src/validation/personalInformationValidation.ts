import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const personalInformationFormValidationSchema = Yup.object().shape({
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

const personalInformationFormOptions = {
  resolver: yupResolver(personalInformationFormValidationSchema),
  defaultValues: {
    name: "Eliza",
    surName: "Doolittle",
    email: "eliza.doolittle@gmail.com",
    phoneNumber: "+44 020 123 4567",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    password: "password",
  },
}

export default personalInformationFormOptions
