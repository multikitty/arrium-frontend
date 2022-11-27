import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

interface CountryNotListedForm {
  email: string
}

const countryNotListedSchema: Yup.SchemaOf<CountryNotListedForm> =
  Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Enter your email address"),
  })

export const countryNotListedOptions = {
  resolver: yupResolver(countryNotListedSchema),
  defaultValues: {
    email: "",
  },
}

export default countryNotListedOptions
