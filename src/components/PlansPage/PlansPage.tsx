import * as React from "react"

import {
  StyledFAQPage as StyledPlansPage,
  StyledFAQPageHeader as StyledPlansPageHeader,
} from "@/components/FAQPage/FAQPage.styled"
import VectorMap from "@/components/VectorMap"
import {
  StyledPlansPageWrapper,
  StyledPlansPageMapWrapper,
} from "./PlansPage.styled"
import PlansTable from "./PlansTable"
import mockPlansData, {type IMockPlans} from "./__mock__"

const PlansPage = () => {
  const [selectedRegion, setSelectedRegion] = React.useState("")
  const [plansData, setPlansData] = React.useState<IMockPlans[]>([])

  React.useEffect(() => {
    if (!selectedRegion || !["ES", "GB"].includes(selectedRegion)) return
    setPlansData(mockPlansData[selectedRegion])
  }, [selectedRegion])

  return (
    <StyledPlansPage>
      <StyledPlansPageHeader>Plans</StyledPlansPageHeader>
      <StyledPlansPageWrapper>
        <StyledPlansPageMapWrapper>
          <VectorMap
            setSelectedRegion={setSelectedRegion}
            zoomOnScroll={false}
          />
        </StyledPlansPageMapWrapper>
        {!!plansData.length && <PlansTable plansData={plansData} />}
      </StyledPlansPageWrapper>
    </StyledPlansPage>
  )
}

export default PlansPage
