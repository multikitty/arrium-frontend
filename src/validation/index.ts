import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const EmailAndPasswordValidationSchema = Yup.object().shape({
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

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "minimum 8 characters")
    .matches(/[a-z]/, "1 lowercase")
    .matches(/[A-Z]/, "1 uppercase")
    .matches(/\d/, "1 number"),
})

const emailValidation = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email!")
    .email("Please enter valid email!"),
})

export const emailAndPasswordFormOptions = {
  resolver: yupResolver(EmailAndPasswordValidationSchema),
}
export const passwordFormOptions = {
  resolver: yupResolver(passwordValidationSchema),
}
export const emailFormOptions = {
  resolver: yupResolver(emailValidation),
}
