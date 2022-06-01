import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const flexAccountSchema = Yup.object().shape({
  userName: Yup.string().required("The First Name field must not be empty"),
  password: Yup.string().required("The Password field must not be empty"),
})

const flexAccountOptions = {
  resolver: yupResolver(flexAccountSchema),
  defaultValues: {
    userName: "eliza.doolittle@gmail.com",
    password: "",
  },
}

export default flexAccountOptions
