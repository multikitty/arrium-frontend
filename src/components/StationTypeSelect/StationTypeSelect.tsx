import React from "react"
import { MenuItem, Select, SelectProps } from "@mui/material"
import { capitalCase } from "change-case"

import { useStationTypeList } from "@/agent/stationTypes"
import { StyledAccountInformatiomTabContentField as Input } from "@/components/CustomerDetailPage/CustomerDetailPage.styled"

interface StationTypeProps extends SelectProps<string> {
  emptyLabel?: string
}

const StationType: React.FC<StationTypeProps> = ({
  emptyLabel = "Choose Station type",
  input = <Input />,
  ...props
}) => {
  const { data } = useStationTypeList()

  const stationTypeItemJSX = React.useMemo(
    () =>
      (data?.data?.Items || []).map(stationType => (
        <MenuItem value={stationType.stationType}>
          {capitalCase(stationType.stationType)}
        </MenuItem>
      )),
    [data]
  )

  return (
    <Select displayEmpty input={input} {...props}>
      <MenuItem disabled value="">
        {emptyLabel}
      </MenuItem>
      {stationTypeItemJSX}
    </Select>
  )
}

export default StationType
