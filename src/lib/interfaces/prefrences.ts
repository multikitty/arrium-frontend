export interface SetPrefrencesVariables {
  preferences: Array<SetPrefrencesVariablesPreferences>
  days: Array<SetPrefrencesVariablesDays>
}

export interface SetPrefrencesVariablesPreferences {
  stationCode: string
  regionId: string
  stationId: string
  day: string
  tta: string
  minPay: number
  minHourlyRate: number
  startTime: string
  endTime: string
  active: string
}

export interface SetPrefrencesVariablesDays {
  label: string
  value: string
  active: boolean
}

export interface SetPrefrencesResult {
  message: string
  success: boolean
  data?: Array<any>
}

export interface GetPrefrencesResult {
  message: string
  success: boolean
  data?: Array<GetPrefrencesResultData>
}

export interface GetPrefrencesResultData {
  station: GetPreferencesStationResult
  preference: GetPreferencesPreferenceResult
}

export interface GetPreferencesStationResult {
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

export interface GetPreferencesPreferenceResult {
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

export interface GetPrefrencesScheduleResult {
  message: string
  success: boolean
  data?: Array<GetPrefrencesScheduleResultData>
}

export interface GetPrefrencesScheduleResultData {
  startTime: string
  sk: string
  active: boolean
  day: string
  pk: string
}

export interface SetPrefrencesScheduleVariables {
  schedules: Array<SetPrefrencesScheduleVariableData>
}

export interface SetPrefrencesScheduleVariableData {
  day: string
  startTime: string
  active: boolean
}

export interface UsePreferencesVariables {
  day?: string | undefined
}
