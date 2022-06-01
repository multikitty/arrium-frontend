import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

interface SupportForm {
  subject: string
  message: string
}

const supportSchema: Yup.SchemaOf<SupportForm> = Yup.object().shape({
  subject: Yup.string().required("Please enter support title"),
  message: Yup.string().required("Please enter message"),
})

export const supportOptions = {
  resolver: yupResolver(supportSchema),
  defaultValues: {
    subject: "",
    message: "",
  },
}

export default supportOptions
