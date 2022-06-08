import * as React from "react"
import { MenuItem, Select, SelectProps } from "@mui/material"

import { daysInWeek } from "@/constants/common"
import { rem } from "polished"

export interface DaySelectProps extends SelectProps {
  isMobile?: boolean
}

const DaySelect = (props: DaySelectProps) => {
  const renderDayOptions = daysInWeek.map(day => (
    <MenuItem value={day.short}>
      {props.isMobile ? day.short : day.long}
    </MenuItem>
  ))

  return (
    <Select
      displayEmpty={props.displayEmpty}
      fullWidth
      sx={{ minWidth: props.isMobile ? rem("80px") : rem("140px") }}
      {...props}
    >
      {props.displayEmpty && <MenuItem value={""}>&nbsp;</MenuItem>}
      {renderDayOptions}
    </Select>
  )
}

export default DaySelect
