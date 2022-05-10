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

const emailValidationSchema = Yup.object().shape({
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

const emailAndPasswordFormOptions = {
  resolver: yupResolver(emailAndPasswordValidationSchema),
  defaultValues: {
    email: "",
    password: "",
    checkbox: false,
  },
}

const passwordFormOptions = {
  resolver: yupResolver(passwordValidationSchema),
  defaultValues: {
    password: "",
  },
}

const emailFormOptions = {
  resolver: yupResolver(emailValidationSchema),
  defaultValues: {
    email: "",
  },
}

export default {
  emailAndPasswordFormOptions,
  passwordFormOptions,
  emailFormOptions,
}
