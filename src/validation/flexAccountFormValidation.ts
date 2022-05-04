import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const flexAccountFormValidationSchema = Yup.object().shape({
  userName: Yup.string().required("The First Name field must not be empty"),
  password: Yup.string().required("The Password field must not be empty"),
})

const flexAccountFormOptions = {
  resolver: yupResolver(flexAccountFormValidationSchema),
  defaultValues: {
    userName: "eliza.doolittle@gmail.com",
    password: "",
  },
}

export default flexAccountFormOptions
