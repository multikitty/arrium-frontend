const mockTimezoneData: Record<string, MockTimezone[]> = {
  ES: [
    {
      countryCode: "ES",
      countryName: "Spain",
      zoneName: "Africa/Ceuta",
      gmtOffset: 7200,
      zoneEnd: 1667091599,
      zoneStart: 1648342800,
    },
    {
      countryCode: "ES",
      countryName: "Spain",
      zoneName: "Atlantic/Canary",
      gmtOffset: 3600,
      zoneEnd: 1667091599,
      zoneStart: 1648342800,
    },
    {
      countryCode: "ES",
      countryName: "Spain",
      zoneName: "Europe/Madrid",
      gmtOffset: 7200,
      zoneEnd: 1667091599,
      zoneStart: 1648342800,
    },
  ],
  GB: [
    {
      countryCode: "GB",
      countryName: "United Kingdom of Great Britain and Northern Ireland",
      zoneName: "Europe/London",
      gmtOffset: 3600,
      zoneEnd: 1667091599,
      zoneStart: 1648342800,
    },
  ],
}

export interface MockTimezone {
  countryCode: string
  countryName: string
  zoneName: string
  gmtOffset: number
  zoneEnd: number
  zoneStart: number
}

export default mockTimezoneData
