import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const emailAndPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "minimum 8 characters"),

  email: Yup.string()
    .required("Please enter email!")
    .email("Please enter valid email!"),
})

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email!")
    .email("Please enter valid email!"),
})

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "minimum 8 characters"),
})

export const emailAndPasswordOptions = {
  resolver: yupResolver(emailAndPasswordSchema),
  defaultValues: {
    email: "",
    password: "",
    checkbox: false,
  },
}

export const passwordOptions = {
  resolver: yupResolver(passwordSchema),
  defaultValues: {
    password: "",
  },
}

export const emailOptions = {
  resolver: yupResolver(emailSchema),
  defaultValues: {
    email: "",
  },
}

export default emailAndPasswordOptions
