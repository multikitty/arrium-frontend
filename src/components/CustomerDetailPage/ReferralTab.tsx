import * as React from "react"
import {
  Grid,
  MenuItem,
  Select,
  TextFieldProps,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined"
import { rem } from "polished"
import {
  StyledAccountInformationTabDateField,
  StyledReferralTab,
  StyledReferralTabForm,
  StyledReferralTabFormActions,
  StyledReferralTabFormField,
  StyledReferralTabFormItem,
  StyledReferralTabFormItemText,
  StyledReferralTabFormItemTitle,
  StyledReferralTabFormLabel,
} from "./CustomerDetailPage.styled"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { TabProps } from "./AccountInformationTab"
import { subDays } from "date-fns"
import { useStore } from "@/store"
import { useReferralsByCreator } from "@/agent/referrals"
import { ReferralListByCreatorResultData } from "@/lib/interfaces/referrals"

const ReferralTab = (props: TabProps) => {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const [dateGenerated, setDateGenerated] = React.useState<Date>(
    subDays(new Date(), 32)
  )
  const { userStore } = useStore()
  const [refCodeDetails, setRefCodeDetails] = React.useState<ReferralListByCreatorResultData | undefined>()
  const {
    data: referralListData,
    isLoading,
    refetch,
  } = useReferralsByCreator({
    userpk: userStore.currentUser!.pk,
  })

  React.useEffect(() => {
    const findRefCodeDetails: ReferralListByCreatorResultData[] | undefined = referralListData?.data?.Items.filter(item => props?.refCode === item.refCode)
    if (findRefCodeDetails?.[0]) setRefCodeDetails(findRefCodeDetails?.[0])
  }, [referralListData?.data?.Items, props?.refCode])
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
                {props?.refCode ? props?.refCode : "-"}
              </StyledReferralTabFormItemText>
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Date generated
              </StyledReferralTabFormLabel>
              {isMdUp ? (
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={refCodeDetails?.refGen}
                  onChange={val => setRefCodeDetails({ ...refCodeDetails, refGen: val! })}
                  renderInput={(params: TextFieldProps) => (
                    <StyledAccountInformationTabDateField
                      {...params}
                      error={false}
                    />
                  )}
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                />
              ) : (
                <MobileDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={refCodeDetails?.refGen}
                  onChange={val => setRefCodeDetails({ ...refCodeDetails, refGen: val! })}
                  renderInput={(params: TextFieldProps) => (
                    <StyledAccountInformationTabDateField
                      {...params}
                      error={false}
                    />
                  )}
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                />
              )}
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Date activated
              </StyledReferralTabFormLabel>
              {isMdUp ? (
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  disabled
                  value={null}
                  onChange={() => null}
                  renderInput={(params: TextFieldProps) => (
                    <StyledAccountInformationTabDateField
                      {...params}
                      error={false}
                    />
                  )}
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                />
              ) : (
                <MobileDatePicker
                  inputFormat="dd/MM/yyyy"
                  disabled
                  value={null}
                  onChange={() => null}
                  renderInput={(params: TextFieldProps) => (
                    <StyledAccountInformationTabDateField
                      {...params}
                      error={false}
                    />
                  )}
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                />
              )}
            </StyledReferralTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormItemTitle>
                Active
              </StyledReferralTabFormItemTitle>
              <StyledReferralTabFormItemText>{refCodeDetails?.refActive === true ? "Yes" : "No"}</StyledReferralTabFormItemText>
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Generated by
              </StyledReferralTabFormLabel>
              <Select
                displayEmpty
                defaultValue=""
                input={<StyledReferralTabFormField />}
                disabled
              >
                <MenuItem disabled value="">
                  Choose from list
                </MenuItem>
              </Select>
            </StyledReferralTabFormItem>
            <StyledReferralTabFormItem>
              <StyledReferralTabFormLabel>
                Generated for
              </StyledReferralTabFormLabel>
              <Select
                displayEmpty
                defaultValue=""
                input={<StyledReferralTabFormField />}
                disabled
              >
                <MenuItem disabled value="">
                  Choose from list
                </MenuItem>
              </Select>
            </StyledReferralTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <StyledReferralTabFormActions>
          <OutlinedButton
            grey
            sx={{ mr: rem("12px") }}
            onClick={props.handleCancel}
          >
            Cancel
          </OutlinedButton>
          <ContainedButton onClick={props.handleSave}>Save</ContainedButton>
        </StyledReferralTabFormActions>
      </StyledReferralTabForm>
    </StyledReferralTab>
  )
}

export default ReferralTab
