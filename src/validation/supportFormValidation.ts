import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const supportFormValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Please enter support title"),
  message: Yup.string().required("Please enter message"),
})

export const supportFormOptions = {
  resolver: yupResolver(supportFormValidationSchema),
}

export default supportFormOptions
