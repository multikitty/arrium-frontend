import { WeekType } from "@/components/AvailabilityPage/AvailabilityPage.data"

export interface ISetPrefrencesVariables {
  preferences: Array<ISetPrefrencesVariableData>
  days: WeekType[]
}

export interface ISetPrefrencesVariableData {
  stationCode: string
  regionId: string
  stationId: string
  day: string
  tta: string
  minPay: string
  minHourlyRate: string
  startTime: string
  endTime: string
  active: string
}

export interface ISetPrefrencesResult {
  message: string
  success: boolean
  data?: Array<any>
}

export interface IGetPrefrencesResult {
  message: string
  success: boolean
  data?: Array<IGetPrefrencesResultData>
}

export interface IGetPrefrencesResultData {
  station: IGetPreferencesStationResult
  preference: IGetPreferencesPreferenceResult
}

export interface IGetPreferencesStationResult {
  stationCode: string
  stationType: string
  stationID: string
  stationName: string
  sk: string
  regionCode: string
  pk: string
  regionName: string
  regionID: string
}

export interface IGetPreferencesPreferenceResult {
  bDay: string
  tta: string
  active: string
  bEndTime: string
  minPay: number
  bStartTime: string
  stationID: string
  sk: string
  minHourlyRate: number
  pk: string
  regionID: string
}

export interface IGetPrefrencesScheduleResult {
  message: string
  success: boolean
  data?: Array<IGetPrefrencesScheduleResultData>
}

export interface IGetPrefrencesScheduleResultData {
  startTime: string
  sk: string
  active: boolean
  day: string
  pk: string
}

export interface ISetPrefrencesScheduleVariables {
  schedules: Array<ISetPrefrencesScheduleVariableData>
}

export interface ISetPrefrencesScheduleVariableData {
  day: string
  startTime: string
  active: boolean
}
