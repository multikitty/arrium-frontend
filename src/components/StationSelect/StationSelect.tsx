import React from "react"
import { MenuItem, Select, SelectProps } from "@mui/material"
import { capitalCase } from "change-case"

import { useStationList } from "@/agent/locations"
import { StyledAccountInformatiomTabContentField as Input } from "@/components/CustomerDetailPage/CustomerDetailPage.styled"

interface StationSelectProps extends SelectProps<string> {
  emptyLabel?: string
  countryCode: string
  regionCode: string
}

const StationSelect: React.FC<StationSelectProps> = ({
  countryCode,
  regionCode,
  emptyLabel = "Choose Station",
  input = <Input />,
  ...props
}) => {
  const { data } = useStationList(countryCode, regionCode)

  const stationSelectItemJSX = React.useMemo(
    () =>
      (data?.data?.Items || []).map(station => (
        <MenuItem value={station.stationCode} key={station.stationCode}>
          {capitalCase(station.stationName)}
        </MenuItem>
      )),
    [data]
  )

  return (
    <Select displayEmpty input={input} {...props}>
      <MenuItem disabled value="">
        {emptyLabel}
      </MenuItem>
      {stationSelectItemJSX}
    </Select>
  )
}

export default StationSelect
