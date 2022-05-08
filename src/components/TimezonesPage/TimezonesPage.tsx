import * as React from "react"

import {
  StyledFAQPage as StyledTimezonesPage,
  StyledFAQPageHeader as StyledTimezonesPageHeader,
} from "@/components/FAQPage/FAQPage.styled"
import VectorMap from "@/components/VectorMap"
import {
  StyledTimezonesPageWrapper,
  StyledTimezonesPageMapWrapper,
} from "./TimezonesPage.styled"
import {
  fetchTimezoneByZone,
  useTimezoneByZone,
  useTimezonesByCountry,
} from "@/api/timezone"
import TimezoneTable from "./TimezoneTable"
import mockTimezoneData, { IMockTimezone } from "./__mock__"

const TimezonesPage = () => {
  const [selectedRegion, setSelectedRegion] = React.useState("")
  const [timezoneData, setTimezoneData] = React.useState<IMockTimezone[]>([])
  // const { data: zoneListData, isSuccess: isListTimezonesSuccess } =
  //   useTimezonesByCountry(selectedRegion)
  const { data: zoneData } = useTimezoneByZone("Europe/London")

  React.useEffect(() => {
    console.log(selectedRegion)
    console.log(!selectedRegion)
    console.log(!["ES", "GB"].includes(selectedRegion))
    console.log(!selectedRegion || !["ES", "GB"].includes(selectedRegion))
    if (!selectedRegion || !["ES", "GB"].includes(selectedRegion)) return
    setTimezoneData(mockTimezoneData[selectedRegion])
  }, [selectedRegion])

  return (
    <StyledTimezonesPage>
      <StyledTimezonesPageHeader>Timezones</StyledTimezonesPageHeader>
      <StyledTimezonesPageWrapper>
        <StyledTimezonesPageMapWrapper>
          <VectorMap
            setSelectedRegion={setSelectedRegion}
            zoomOnScroll={false}
          />
        </StyledTimezonesPageMapWrapper>
        {!!timezoneData.length && <TimezoneTable timezones={timezoneData} />}
      </StyledTimezonesPageWrapper>
    </StyledTimezonesPage>
  )
}

export default TimezonesPage
