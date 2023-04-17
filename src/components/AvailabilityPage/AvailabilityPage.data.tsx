import React from "react"
import { InputAdornment, TextFieldProps } from "@mui/material"
import {
  FormValues,
  FormValuesDataKey,
} from "@/components/AvailabilityPage/AvailablityPage.types"
import { MobileTimePicker, MobileTimePickerProps } from "@mui/x-date-pickers"
import { createDateInHM } from "@/utils"
import { store } from "@/store"
import { StyledSearchTableTextField } from "@/components/AvailabilityPage/AvailabilityPage.styled"

export const availabilityStatusOptions = {
  Accepted: { label: "Accepted", value: "accepted" },
  Ignored: { label: "Ignored", value: "ignored" },
  Rejected: { label: "Rejected", value: "rejected" },
}

export type AvailabilityStatusType = keyof typeof availabilityStatusOptions

const createData = (
  location: string,
  day: string,
  date: string,
  time: string,
  duration: string,
  pay: string,
  status: string
) => {
  return { location, day, date, time, duration, pay, status }
}

export interface AvailabilityTableData {
  location: string
  day: string
  date: string
  time: string
  duration: string
  pay: string
  status: AvailabilityStatusType
}

export type WeekType = {
  label: string
  value: string
  active: boolean
}

export const initialWeekData: WeekType[] = [
  { label: "Mon", value: "mon", active: false },
  { label: "Tue", value: "tue", active: false },
  { label: "Wed", value: "wed", active: false },
  { label: "Thu", value: "thu", active: false },
  { label: "Fri", value: "fri", active: false },
  { label: "Sat", value: "sat", active: false },
  { label: "Sun", value: "sat", active: false },
]

export const searchTableInitialValues: FormValues = {
  data: [
    {
      location: "Manchester (CMC2) - Morrisons",
      checked: true,
      timeToArrive: "120",
      startTime: createDateInHM(12, 0),
      endTime: createDateInHM(13, 0),
      minimumPay: 80,
      minimumHourlyRate: 20,
      stationCode: "",
      stationId: "",
      regionId: "",
    },
    {
      location: "Leyland (DPR1) - AMZL",
      checked: false,
      timeToArrive: "",
      startTime: null,
      endTime: null,
      minimumPay: "",
      minimumHourlyRate: "",
      stationCode: "",
      stationId: "",
      regionId: "",
    },
    {
      location: "Knowsley (DWN1) - AMZL",
      checked: false,
      timeToArrive: "",
      startTime: null,
      endTime: null,
      minimumPay: "",
      minimumHourlyRate: "",
      stationCode: "",
      stationId: "",
      regionId: "",
    },
    {
      location: "Wakefield (DLS4)",
      checked: false,
      timeToArrive: "",
      startTime: null,
      endTime: null,
      minimumPay: "",
      minimumHourlyRate: "",
      stationCode: "",
      stationId: "",
      regionId: "",
    },
  ],
}

export const searchTableEmptyData: FormValues = {
  data: searchTableInitialValues.data.map(({ location }) => ({
    location: location,
    checked: false,
    timeToArrive: "",
    startTime: null,
    endTime: null,
    minimumPay: "",
    minimumHourlyRate: "",
    stationCode: "",
    stationId: "",
    regionId: "",
  })),
}

interface TimePickerProps
  extends Omit<MobileTimePickerProps<any, any>, "renderInput"> {
  fullWidth?: boolean
}

export const searchTableShape: (
  | {
    label: string
    name: FormValuesDataKey
    renderInput(props: TextFieldProps): JSX.Element
  }
  | {
    label: string
    name: FormValuesDataKey
    renderInput(props: TimePickerProps): JSX.Element
  }
)[] = [
    {
      label: "Time to arrive",
      name: "timeToArrive",
      renderInput(props: TextFieldProps) {
        props.error = props.error || false
        return (
          <StyledSearchTableTextField
            type="number"
            inputProps={{
              min: 0,
              max: 180,
            }}
            {...props}
            {...(props.fullWidth && { sx: { width: "100% !important" } })}
          />
        )
      },
    },
    {
      label: "Start time",
      name: "startTime",
      renderInput(props: TimePickerProps) {
        return (
          <MobileTimePicker
            {...props}
            mask="__:__"
            views={["hours", "minutes"]}
            value={props.value}
            onChange={props.onChange}
            renderInput={(params: TextFieldProps) => (
              <StyledSearchTableTextField
                {...params}
                {...(props.fullWidth && {
                  sx: { width: "100% !important", textAlign: "center" },
                })}
              />
            )}
          />
        )
      },
    },
    {
      label: "End time",
      name: "endTime",
      renderInput(props: TimePickerProps) {
        return (
          <MobileTimePicker
            {...props}
            minTime={props.minTime}
            mask="__:__"
            views={["hours", "minutes"]}
            value={props.value}
            onChange={props.onChange}
            renderInput={(params: TextFieldProps) => (
              <StyledSearchTableTextField
                {...params}
                {...(props.fullWidth && {
                  sx: { width: "100% !important", textAlign: "center" },
                })}
              />
            )}
          />
        )
      },
    },
    {
      label: "Minimum pay",
      name: "minimumPay",
      renderInput(props: TextFieldProps) {
        return (
          <StyledSearchTableTextField
            type="number"
            inputProps={{
              min: 0,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {store.userStore.currencySymbol}
                </InputAdornment>
              ),
            }}
            {...props}
            {...(props.fullWidth && { sx: { width: "100% !important" } })}
          />
        )
      },
    },
    {
      label: "Minimum hourly rate",
      name: "minimumHourlyRate",
      renderInput(props: TextFieldProps) {
        return (
          <StyledSearchTableTextField
            type="number"
            inputProps={{
              min: 0,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {store.userStore.currencySymbol}
                </InputAdornment>
              ),
            }}
            {...props}
            {...(props.fullWidth && { sx: { width: "100% !important" } })}
          />
        )
      },
    },
  ]

// export const rowSearches = [
//   createSearchesData(
//     "Manchester (CMC2) - Morrisons",
//     "15 min",
//     "17:45",
//     "21:00",
//     30,
//     10
//   ),
//   createSearchesData("Leyland (DPR1) - AMZL", "20 min", "17:30", "", 35, 1),
//   createSearchesData("Knowsley (DWN1) - AMZL", "32 min", "", "22:00", 40),
//   createSearchesData("Wakefield (DLS4)", "32 min"),
// ]

// export const rows: AvailabilityTableData[] = []

export const rows = [
  createData(
    "Knowsley (DWN1) - AMZL",
    "Wed",
    "Sep 22",
    "17:45 - 21:15",
    "3 h 30 min",
    "54.50",
    "Accepted"
  ),
  createData(
    "Leyland (DPR1) - AMZL",
    "Wed",
    "Sep 22",
    "17:30 - 21:00",
    "3 h 30 min",
    "45.50",
    "Accepted"
  ),
  createData(
    "Knowsley (DWN1) - AMZL",
    "Wed",
    "Sep 22",
    "18:15 - 21:45",
    "3 h 30 min",
    "54.50",
    "Rejected"
  ),
  createData(
    "Manchester (CMC2) - Morrisons",
    "Wed",
    "Sep 22",
    "18:00 - 20:00",
    "2 h",
    "26",
    "Ignored"
  ),
]

export const availabilityStatusColorMap: Record<
  AvailabilityStatusType | string,
  string
> = {
  Running: "#3DCC70",
  Cooling: "#FAB11E",
  Stopped: "#FA6464",
}
