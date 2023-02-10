import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Please enter valid password"),
  confirmPassword: Yup.string()
    .required("Please enter valid password")
    .oneOf(
      [Yup.ref("password"), null],
      "The password entered in both fields does not match"
    ),
})

const resetPasswordOptions = {
  resolver: yupResolver(resetPasswordSchema),
  defaultValues: {
    password: "",
    confirmPassword: "",
  },
}

export default resetPasswordOptions
