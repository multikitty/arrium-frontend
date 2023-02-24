import React from "react"
import { MenuItem, Select, SelectProps } from "@mui/material"
import { capitalCase } from "change-case"

import { useCountryList } from "@/agent/locations"
import { StyledAccountInformatiomTabContentField as Input } from "@/components/CustomerDetailPage/CustomerDetailPage.styled"

interface CountrySelectProps extends SelectProps<string> {
  emptyLabel?: string
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  emptyLabel = "Choose Country",
  input = <Input />,
  ...props
}) => {
  const { data } = useCountryList()

  const countrySelectItemJSX = React.useMemo(
    () =>
      (data?.data?.Items || []).map(country => (
        <MenuItem value={country.countryCode} key={country.countryCode}>
          {capitalCase(country.country)}
        </MenuItem>
      )),
    [data]
  )

  return (
    <Select displayEmpty input={input} {...props}>
      <MenuItem disabled value="">
        {emptyLabel}
      </MenuItem>
      {countrySelectItemJSX}
    </Select>
  )
}

export default CountrySelect
