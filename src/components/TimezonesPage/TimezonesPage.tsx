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
import { useTimezoneByZone } from "@/api/timezone"
import TimezoneTable from "./TimezoneTable"
import mockTimezoneData, { IMockTimezone } from "./__mock__"

const TimezonesPage = () => {
  const [selectedRegion, setSelectedRegion] = React.useState("")
  const [timezoneData, setTimezoneData] = React.useState<IMockTimezone[]>([])
  // const { data: zoneListData, isSuccess: isListTimezonesSuccess } =
  //   useTimezonesByCountry(selectedRegion)
  useTimezoneByZone("Europe/London")

  React.useEffect(() => {
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
