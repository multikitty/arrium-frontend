import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { UserRoles } from "../types/common"

const emailAndPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "minimum 8 characters")
    .matches(/[a-z]/, "1 lowercase")
    .matches(/[A-Z]/, "1 uppercase")
    .matches(/\d/, "1 number"),

  email: Yup.string()
    .required("Please enter email!")
    .email("Please enter valid email!"),
})

const supportFormValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Please enter support title"),
  message: Yup.string().required("Please enter message"),
})

const landingContactFormValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("The First Name field must not be empty"),
  surName: Yup.string().required("The Surname field must not be empty"),
  email: Yup.string()
    .required("The Email Address field must not be empty")
    .email("Please enter a valid email address"),
  question: Yup.string().required("This field must not be empty"),
})

const phoneRegExp =
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

export const flexAccountFormValidationSchema = Yup.object().shape({
  userName: Yup.string().required("The First Name field must not be empty"),
  password: Yup.string().required("The Password field must not be empty"),
})

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "minimum 8 characters")
    .matches(/[a-z]/, "1 lowercase")
    .matches(/[A-Z]/, "1 uppercase")
    .matches(/\d/, "1 number"),
})

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email!")
    .email("Please enter valid email!"),
})

export const accountInformationFormValidationSchema = Yup.object().shape({
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
})

export const timeToArriveFormValidationSchema = Yup.object().shape({
  timeToArrive: Yup.string()
    .required()
    .min(0, "Value must be 1 to 180")
    .max(180, "value must be 1 to 180"),
})

export const emailAndPasswordFormOptions = {
  resolver: yupResolver(emailAndPasswordValidationSchema),
}

export const landingContactFormFormOptions = {
  resolver: yupResolver(landingContactFormValidationSchema),
  defaultValues: {
    fullName: "",
    email: "",
    question: "",
  },
}

export const personalInformationFormOptions = {
  resolver: yupResolver(personalInformationFormValidationSchema),
  defaultValues: {
    name: "Eliza",
    surName: "Doolittle",
    email: "eliza.doolittle@gmail.com",
    phoneNumber: "+44 020 123 4567",
    timezone: "",
    password: "password",
  },
}

export const flexAccountFormOptions = {
  resolver: yupResolver(flexAccountFormValidationSchema),
  defaultValues: {
    userName: "eliza.doolittle@gmail.com",
    password: "",
  },
}

export const passwordFormOptions = {
  resolver: yupResolver(passwordValidationSchema),
}

export const emailFormOptions = {
  resolver: yupResolver(emailValidationSchema),
}
export const supportFormOptions = {
  resolver: yupResolver(supportFormValidationSchema),
}

export const accountInformationFormOptions = {
  resolver: yupResolver(accountInformationFormValidationSchema),
  defaultValues: {
    firstName: "",
    surName: "",
    email: "",
    phoneNumber: "",
    isEmailVerified: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    role: UserRoles.driver,
    status: "active",
    startDate: "",
    endDate: "",
  },
}

export const timeToArriveInputFormOptions = {
  resolver: yupResolver(timeToArriveFormValidationSchema),
  defaultValus: {
    timeToArrive: 0,
  },
}
