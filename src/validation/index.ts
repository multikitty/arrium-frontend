import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

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

export const emailAndPasswordFormOptions = {
  resolver: yupResolver(emailAndPasswordValidationSchema),
}
export const landingContactFormFormOptions = {
  resolver: yupResolver(landingContactFormValidationSchema),
  defaultValues: {
    firstName: "",
    surName: "",
    email: "",
    question: "",
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
