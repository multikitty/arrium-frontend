import * as React from "react"
import { MenuItem, Select, SelectProps } from "@mui/material"

import { daysInAutomationSchedule } from "@/constants/common"
import { rem } from "polished"

export interface DaySelectAutomationScheduleProps extends SelectProps {
  isMobile?: boolean
}

const DaySelectAutomationSchedule = (
  props: DaySelectAutomationScheduleProps
) => {
  const renderDayOptions = daysInAutomationSchedule.map((day, index) => (
    <MenuItem value={day.value} divider={index === 6 ? true : false}>
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

export default DaySelectAutomationSchedule
