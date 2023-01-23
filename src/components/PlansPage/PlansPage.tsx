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
import mockPlansData, { MockPlans } from "./PlansPage.mock"

const PlansPage = () => {
  const [selectedRegion, setSelectedRegion] = React.useState("")
  const [plansData, setPlansData] = React.useState<MockPlans[]>([])

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
        <PlansTable plansData={plansData} />
      </StyledPlansPageWrapper>
    </StyledPlansPage>
  )
}

export default PlansPage
