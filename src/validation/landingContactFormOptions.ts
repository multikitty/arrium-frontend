import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const landingContactFormValidationSchema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string()
    .required("The Email Address field must not be empty")
    .email("Please enter a valid email address"),
  question: Yup.string().required("This field must not be empty"),
})

const landingContactFormOptions = {
  resolver: yupResolver(landingContactFormValidationSchema),
  defaultValues: {
    fullName: "",
    email: "",
    question: "",
  },
}

export default landingContactFormOptions
