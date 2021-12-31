import { Grid, IconButton, MenuItem, Select } from "@mui/material"
import React from "react"
import {
  StyledReferralTab,
  StyledReferralTabForm,
  StyledReferralTabFormActions,
  StyledReferralTabFormField,
  StyledReferralTabFormItem,
  StyledReferralTabFormItemText,
  StyledReferralTabFormItemTitle,
  StyledReferralTabFormLabel,
} from "./CustomerDetailPage.styled"
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"

const ReferralTab = () => {
  return (
    <StyledReferralTab>
      <StyledReferralTabForm>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormItemTitle>
                Referral code
              </StyledReferralTabFormItemTitle>
              <StyledReferralTabFormItemText>
                E4C11E
              </StyledReferralTabFormItemText>
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Date generated
              </StyledReferralTabFormLabel>
              <StyledReferralTabFormField
                value="07/09/2021"
                endAdornment={
                  <IconButton size="small" sx={{ mr: rem("8px") }}>
                    <CalendarIcon />
                  </IconButton>
                }
              />
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Date activated
              </StyledReferralTabFormLabel>
              <StyledReferralTabFormField
                placeholder="07/09/2021"
                endAdornment={
                  <IconButton size="small" sx={{ mr: rem("8px") }}>
                    <CalendarIcon />
                  </IconButton>
                }
              />
            </StyledReferralTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormItemTitle>
                Active
              </StyledReferralTabFormItemTitle>
              <StyledReferralTabFormItemText>Yes</StyledReferralTabFormItemText>
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Generated by
              </StyledReferralTabFormLabel>
              <Select
                defaultValue="none"
                input={<StyledReferralTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose region here
                </MenuItem>
              </Select>
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Generated for
              </StyledReferralTabFormLabel>
              <Select
                defaultValue="none"
                input={<StyledReferralTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose region here
                </MenuItem>
              </Select>
            </StyledReferralTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <StyledReferralTabFormActions>
          <OutlinedButton grey sx={{ mr: rem("12px") }}>
            Cancel
          </OutlinedButton>
          <ContainedButton>Save</ContainedButton>
        </StyledReferralTabFormActions>
      </StyledReferralTabForm>
    </StyledReferralTab>
  )
}

export default ReferralTab
