import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const amazonFlexSchema = Yup.object().shape({
  userName: Yup.string()
    .email("The User Name field must be an email")
    .required("The User Name field must not be empty"),
  password: Yup.string().required("The Password field must not be empty"),
  confirmPassword: Yup.string()
    .required("The Confirm Password field must not be empty")
    .oneOf([Yup.ref("password"), null], "Password doesn't match"),
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
