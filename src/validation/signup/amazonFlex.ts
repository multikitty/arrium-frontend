import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const amazonFlexSchema = Yup.object().shape({
  userName: Yup.string()
    .email("Please enter valid amazon flex username.")
    .required("Please enter valid amazon flex username."),
  password: Yup.string().required("Please enter valid password"),
  confirmPassword: Yup.string()
    .required("The Confirm Password field must not be empty")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
})

const amazonFlexOptions = {
  resolver: yupResolver(amazonFlexSchema),
  defaultValues: {
    userName: "",
    password: "",
    confirmPassword: "",
  },
}

export default amazonFlexOptions
