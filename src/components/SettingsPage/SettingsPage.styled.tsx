import styled, { css } from "styled-components"
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
import { Paper } from "@mui/material"

export const StyledSettingsPage = styled(StyledFAQPage)``

export const StyledSettingsPageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${rem("32px")};
`

export const StyledSettingsPageHeader = styled(StyledFAQPageHeader)`
  flex-grow: 1;
  margin-bottom: 0;
`

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
)`
  margin-bottom: ${rem("18px")};
`

export const StyledSettingsColumnContentList = styled.ul`
  list-style: none;
`

export const StyledSettingsColumnContentListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${rem("10px")};
  margin-bottom: ${rem("10px")};
  border-radius: ${rem("6px")};

  background-color: ${p => p.theme.palette.common.white};

  &:hover {
    .settings__list__item__actions {
      opacity: 1;
      pointer-events: all;
    }
  }

  .settings__list__item {
    &__text {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: ${rem("16px")};
      line-height: ${rem("20px")};
      color: ${p => p.theme.palette.blackText};
      flex-grow: 1;
    }

    &__actions {
      opacity: 0;
      pointer-events: none;
    }
  }

  &:hover {
    background-color: ${p => p.theme.palette.grey1};
  }
`

export const StyledLocationsTab = styled(StyledAccountInformationTab)``

export const StyledModelsTab = styled(StyledAccountInformationTab)``

export const StyledStationTypesTab = styled(StyledAccountInformationTab)``

export const StyledAddCountryModal = styled(Paper).attrs({ elevation: 1 })`
  border-radius: ${rem("20px")};
  padding: ${rem("16px")};
  width: 100%;
  max-width: ${rem("420px")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const StyledAddCountryModalCloseIconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: ${rem("6px")};
`

export const StyledAddCountryModalTitle = styled.h3<{
  deleteConfirmation?: boolean
  selectCountry?: boolean
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("28px")};
  line-height: ${rem("32px")};
  margin-bottom: ${p => (p.deleteConfirmation ? rem("40px") : rem("16px"))};
  margin-top: ${p => (p.selectCountry ? rem("24px") : 0)};
  text-align: center;

  color: ${p => p.theme.palette.blackText};
`

export const StyledAddCountryModalForm = styled.form`
  padding: ${rem("24px")};
  padding-bottom: ${rem("28px")};
`

export const StyledAddCountryModalFormField = styled(
  StyledAccountInformatiomTabContentField
)``

export const StyledAddCountryModalFormHelperText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  margin-top: ${rem("8px")};

  color: ${p => p.theme.palette.errorText};
`

export const StyledAddCountryModalFormActions = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${rem("12px")};
`

export const StyledDeleteConfirmationModalSubTitle = styled.p<{
  saveChanges?: boolean
  updatePhoneNumber?: boolean
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};
  text-align: center;
  ${p =>
    (p.saveChanges || p.updatePhoneNumber) &&
    css`
      width: 100%;
      margin: 0 auto;
    `}
  ${p =>
    p.saveChanges &&
    css`
      max-width: ${rem("322px")};
    `}
  ${p =>
    p.updatePhoneNumber &&
    css`
      max-width: ${rem("280px")};
    `}
  margin-bottom: ${rem("32px")};

  color: ${p => p.theme.palette.blackText};
`
