import styled from "styled-components"
import {
  StyledAccountInformatiomTabContentField,
  StyledAccountInformationTab,
} from "../CustomerDetailPage/CustomerDetailPage.styled"
import {
  StyledFAQPage,
  StyledFAQPageHeader,
  StyledFAQPageContent,
} from "../FAQPage/FAQPage.styled"
import { rem } from "polished"

export const StyledSettingsPage = styled(StyledFAQPage)``

export const StyledSettingsPageHeader = styled(StyledFAQPageHeader)``

export const StyledSettingsPageContent = styled(StyledFAQPageContent)``

export const StyledSettingsColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

export const StyledSettingsColumnContent = styled.div<{ last?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-right: ${p => (p.last ? 0 : rem("24px"))};
`

export const StyledSettingsColumnContentHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${rem("20px")};
`

export const StyledSettingsColumnContentHeaderText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};

  color: ${p => p.theme.palette.blackText};
`

export const StyledSettingsColumnContentSearchField = styled(
  StyledAccountInformatiomTabContentField
)``

export const StyledSettingsColumnContentList = styled.ul`
  list-style: none;
`

export const StyledLocationsTab = styled(StyledAccountInformationTab)``

export const StyledModelsTab = styled(StyledAccountInformationTab)``

export const StyledStationTypesTab = styled(StyledAccountInformationTab)``
