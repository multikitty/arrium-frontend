import React from "react"
import { MenuItem, Select, SelectProps } from "@mui/material"
import { capitalCase } from "change-case"

import { useRegionList } from "@/agent/locations"
import { StyledAccountInformatiomTabContentField as Input } from "@/components/CustomerDetailPage/CustomerDetailPage.styled"

interface RegionSelectProps extends SelectProps<string> {
  emptyLabel?: string
  countryCode: string
}

const RegionSelect: React.FC<RegionSelectProps> = ({
  countryCode,
  emptyLabel = "Choose Region",
  input = <Input />,
  ...props
}) => {
  const { data } = useRegionList(countryCode)

  const regionSelectItemJSX = React.useMemo(
    () =>
      (data?.data?.Items || []).map(region => (
        <MenuItem value={region.regionCode} key={region.regionCode}>
          {capitalCase(region.regionName)}
        </MenuItem>
      )),
    [data]
  )

  return (
    <Select displayEmpty input={input} {...props}>
      <MenuItem disabled value="">
        {emptyLabel}
      </MenuItem>
      {regionSelectItemJSX}
    </Select>
  )
}

export default RegionSelect
