import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const landingContactFormValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("The First Name field must not be empty"),
  surName: Yup.string().required("The Surname field must not be empty"),
  email: Yup.string()
    .required("The Email Address field must not be empty")
    .email("Please enter a valid email address"),
  question: Yup.string().required("This field must not be empty"),
})

export const landingContactFormOptions = {
  resolver: yupResolver(landingContactFormValidationSchema),
  defaultValues: {
    fullName: "",
    email: "",
    question: "",
  },
}

export default landingContactFormOptions
