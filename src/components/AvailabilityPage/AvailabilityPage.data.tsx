export const availabilityStatusOptions = {
  accepted: { label: "Accepted", value: "accepted" },
  ignored: { label: "Ignored", value: "ignored" },
  rejected: { label: "Rejected", value: "rejected" },
}

const createData = (
  location: string,
  day: string,
  date: string,
  time: string,
  duration: string,
  pay: string,
  status: keyof typeof availabilityStatusOptions
) => {
  return { location, day, date, time, duration, pay, status }
}

export type WeekType = {
  day: string
  active: boolean
}

const createSearchesData = (
  location: string,
  timeToArrive: string,
  startTimeToEndTime: string,
  minPay: string,
  minHourlyRate: string
) => {
  return { location, timeToArrive, startTimeToEndTime, minPay, minHourlyRate }
}

export const initialWeekData: WeekType[] = [
  { day: "Mon", active: false },
  { day: "Tue", active: false },
  { day: "Wed", active: false },
  { day: "Thu", active: false },
  { day: "Fri", active: false },
  { day: "Sat", active: false },
  { day: "Sun", active: false },
]

export const searchTableData = [
  "Manchester (CMC2) - Morrisons",
  "Leyland (DPR1) - AMZL",
  "Knowsley (DWN1) - AMZL",
  "Knowsley (DWN1) - AMZL",
]

export const rowSearches = [
  createSearchesData(
    "Manchester (CMC2) - Morrisons",
    "15 min",
    "17:45 - 21:00",
    "30",
    "10"
  ),
  createSearchesData(
    "Leyland (DPR1) - AMZL",
    "20 min",
    "17:30 - 22:00",
    "35",
    "1"
  ),
  createSearchesData(
    "Knowsley (DWN1) - AMZL",
    "32 min",
    "17:30 - 22:00",
    "40",
    "13"
  ),
]

export const rows = [
  createData(
    "Knowsley (DWN1) - AMZL",
    "Wed",
    "Sep 22",
    "17:45 - 21:15",
    "3 h 30 min",
    "54.50",
    availabilityStatusOptions.accepted
      .value as keyof typeof availabilityStatusOptions
  ),
  createData(
    "Leyland (DPR1) - AMZL",
    "Wed",
    "Sep 22",
    "17:30 - 21:00",
    "3 h 30 min",
    "45.50",
    availabilityStatusOptions.accepted
      .value as keyof typeof availabilityStatusOptions
  ),
  createData(
    "Knowsley (DWN1) - AMZL",
    "Wed",
    "Sep 22",
    "18:15 - 21:45",
    "3 h 30 min",
    "54.50",
    availabilityStatusOptions.rejected
      .value as keyof typeof availabilityStatusOptions
  ),
  createData(
    "Manchester (CMC2) - Morrisons",
    "Wed",
    "Sep 22",
    "18:00 - 20:00",
    "2 h",
    "26",
    availabilityStatusOptions.ignored
      .value as keyof typeof availabilityStatusOptions
  ),
]

export const availabilityStatusColorMap: Record<
  keyof typeof availabilityStatusOptions,
  string
> = {
  accepted: "#3DCC70",
  ignored: "#FAB11E",
  rejected: "#FA6464",
}
