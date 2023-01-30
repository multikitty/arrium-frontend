import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const landingContactSchema = Yup.object().shape({
  fullName: Yup.string().required("The Full Name field must not be empty"),
  email: Yup.string()
    .required("Please enter a valid email address")
    .email("Please enter a valid email address"),
  question: Yup.string().required("This field must not be empty"),
})

const landingContactOptions = {
  resolver: yupResolver(landingContactSchema),
  defaultValues: {
    fullName: "",
    email: "",
    question: "",
  },
}

export default landingContactOptions
