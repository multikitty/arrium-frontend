import React, { useState } from "react"
import {
  Box,
  FormControlLabel,
  Typography,
  useMediaQuery,
  Chip,
  Stack,
  Tabs,
  Tab,
  Collapse,
} from "@mui/material"
import { rem } from "polished"
import { observer } from "mobx-react-lite"
import { useForm } from "react-hook-form"

import EditSearchActiveIcon from "@/assets/icons/edit_icon_active.inline.svg"
import ArrowDownIcon from "@/assets/icons/filter-arrow_down.inline.svg"
import ArrowUpIcon from "@/assets/icons/filter-arrow_up.inline.svg"
import RunningIcon from "@/assets/icons/running_ripple_icon.inline.svg"
import StoppingIcon from "@/assets/icons/stopping_ripple_icon.inline.svg"
import DeleteIcon from "@/assets/icons/delete_icon.inline.svg"
import DeleteDisabledIcon from "@/assets/icons/delete_icon_disabled.inline.svg"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import Switch from "../commons/Switch"
import theme from "@/theme"
import TabDataOnSearch from "./TabDataOnSearch"
import SearchTable from "./SearchTable"
import AvailabilityTable from "./AvailabilityTable"
import { devices } from "@/constants/device"
import { content } from "@/constants/content"
import { useStore } from "@/store"

import {
  availabilityStatusOptions,
  initialWeekData,
  WeekType,
} from "./AvailabilityPage.data"
import { FormValues, TabPanelProps } from "./AvailablityPage.types"
import {
  StyledFAQPage as StyledAvailabilityPage,
  StyledFAQPageHeader as StyledAvailabilityPageHeader,
} from "../FAQPage/FAQPage.styled"
import {
  StyledAvailablityPageWrapper,
  StyledHeader,
  StyledSearchText,
  StyledCircle,
  StyledCollapsedSearch,
  StyledSearchButton,
  StyledTextWrapper,
  StyledShowMoreText,
  StyledTimePickerField,
  StyledAvailabilityMobile,
  StyledAvailabilityTitleMobile,
} from "./AvailabilityPage.styled"
import { availabilityFormResolver } from "@/validation/availabilityFormValidation"

export type AvailabilityTableTabType =
  | keyof typeof availabilityStatusOptions
  | "all"
interface CustomTabPanelProps extends Omit<TabPanelProps, "value"> {
  value: AvailabilityTableTabType
  currentTab: AvailabilityTableTabType
}

function TabPanel({
  children,
  value,
  index,
  currentTab,
  ...other
}: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== currentTab}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === currentTab && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const tabStyles = {
  fontSize: rem("20px"),
  fontWeight: 500,
  lineHeight: rem("20px"),
  textTransform: "capitalize",
  padding: rem("32px"),
}

const AvailabilityPage = () => {
  const { availibilityStore } = useStore()
  const isWebView = useMediaQuery(devices.web.up)
  const [currentTab, setCurrentTab] =
    React.useState<AvailabilityTableTabType>("all")
  const [weekData, setWeekData] = useState<WeekType[]>(initialWeekData)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isSearchable, setIsSearchable] = useState<boolean>(false)

  const handleClick = (item: WeekType) => {
    const isAnySelected = weekData.find(data => data.active)
    let newWeekData = [...weekData]
    if (!isSearchable && isAnySelected) newWeekData = initialWeekData
    setWeekData(
      newWeekData.map(d =>
        d.day === item.day ? { ...d, active: !d.active } : d
      )
    )
  }

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: AvailabilityTableTabType
  ) => {
    setCurrentTab(newValue)
  }

  const { register, handleSubmit, reset, unregister, watch, formState } =
    useForm<FormValues>({
      defaultValues: {
        timeToArrive: [],
        startTime: [],
        endTime: [],
        minimumPay: [],
        minimumHourlyRate: [],
      },
      mode: "onBlur",
      resolver: availabilityFormResolver,
    })

  const onSubmit = (data: FormValues) => {
    availibilityStore.setInitialState(data)
    console.log("onSubmit", data)
  }

  const onInvalid = (data: any) => {
    console.log("Invalid", data)
  }

  console.log(watch())
  console.log(formState.errors)

  React.useEffect(() => {
    setWeekData(initialWeekData)
  }, [isSearchable])

  React.useEffect(() => {
    const currentDay = new Date().getDay() - 1
    setWeekData(prev =>
      prev.map((p, idx) => (idx === currentDay ? { ...p, active: true } : p))
    )
  }, [])

  return isWebView ? (
    <StyledAvailabilityPage>
      <StyledAvailabilityPageHeader>Availability</StyledAvailabilityPageHeader>
      <StyledAvailablityPageWrapper
        component="form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <StyledHeader>
          <StyledTextWrapper>
            <StyledSearchText>Search preferences</StyledSearchText>
            {!isSearchable ? (
              <StyledSearchButton
                onClick={() => setIsSearchable(true)}
                startIcon={<EditSearchActiveIcon />}
              >
                Edit Search
              </StyledSearchButton>
            ) : (
              <StyledSearchButton
                type="reset"
                onClick={() => reset()}
                startIcon={
                  !formState.isDirty ? <DeleteDisabledIcon /> : <DeleteIcon />
                }
                disabled={!formState.isDirty}
              >
                Clear all
              </StyledSearchButton>
            )}
          </StyledTextWrapper>
          <Stack direction="row" spacing={1}>
            {weekData.map((item, idx) => (
              <Chip
                clickable
                key={item.day}
                disabled={idx + 1 < new Date().getDay()}
                label={item.day}
                variant="outlined"
                onClick={() => handleClick(item)}
                color={item.active ? "success" : "default"}
              />
            ))}
          </Stack>
        </StyledHeader>
        {!isSearchable ? (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <TabDataOnSearch />
          </Collapse>
        ) : (
          <Box>
            <SearchTable
              register={register}
              unregister={unregister}
              formState={formState}
            />
          </Box>
        )}
        {!isSearchable ? (
          <StyledCollapsedSearch>
            <Box display="flex" sx={{ cursor: "pointer" }}>
              <Box display="flex" onClick={() => setIsExpanded(prev => !prev)}>
                <StyledCircle>
                  {!isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </StyledCircle>
                <StyledShowMoreText>
                  {!isExpanded ? "Show more" : "Show less"}
                </StyledShowMoreText>
              </Box>
              <Box sx={{ marginLeft: rem("20px") }}>
                <StyledShowMoreText>
                  Autostart Search <strong>16:00</strong>
                </StyledShowMoreText>
              </Box>
            </Box>
            <Box display="flex">
              <Box
                display="flex"
                alignItems="center"
                sx={{ marginRight: rem("32px") }}
              >
                {isSearching ? <RunningIcon /> : <StoppingIcon />}
                <StyledShowMoreText>
                  {isSearching ? "Running" : "Stopped"}
                </StyledShowMoreText>
              </Box>
              <Box>
                <ContainedButton onClick={() => setIsSearching(prev => !prev)}>
                  {isSearching ? "Stop Search" : "Start Searching"}
                </ContainedButton>
              </Box>
            </Box>
          </StyledCollapsedSearch>
        ) : (
          <StyledCollapsedSearch>
            <Box display="flex" alignItems="center">
              {content.availibility.formControlLabelForSwitches.map(
                (label: string, index: number) => (
                  <React.Fragment key={index}>
                    <FormControlLabel
                      control={<Switch sx={{ m: 1 }} />}
                      label={label}
                    />
                    {index === 0 && (
                      <StyledTimePickerField
                        type="time"
                        sx={{ mr: rem("32px") }}
                        inputProps={{
                          step: 300,
                        }}
                      />
                    )}
                  </React.Fragment>
                )
              )}
            </Box>
            <Box display="flex" alignItems="center">
              <OutlinedButton
                sx={{
                  whiteSpace: "nowrap",
                  color: theme.palette.grey7,
                  borderColor: theme.palette.grey3,
                  marginRight: rem("10px"),
                }}
                onClick={() => setIsSearchable(false)}
              >
                Cancel
              </OutlinedButton>
              <ContainedButton type="submit">Save</ContainedButton>
            </Box>
          </StyledCollapsedSearch>
        )}
      </StyledAvailablityPageWrapper>
      <StyledAvailablityPageWrapper style={{ marginTop: "16px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTab} onChange={handleChange}>
              {content.availibility.labelsForTabs.map(
                ({ label, value }, index: number) => (
                  <Tab key={index} sx={tabStyles} label={label} value={value} />
                )
              )}
            </Tabs>
          </Box>
          {content.availibility.labelsForTabs.map(
            ({ value }, index: number) => (
              <TabPanel
                key={index}
                value={value as AvailabilityTableTabType}
                index={index}
                currentTab={currentTab}
              >
                <AvailabilityTable status={value as AvailabilityTableTabType} />
              </TabPanel>
            )
          )}
        </Box>
      </StyledAvailablityPageWrapper>
    </StyledAvailabilityPage>
  ) : (
    <StyledAvailabilityMobile>
      <StyledAvailabilityTitleMobile>
        Availability
      </StyledAvailabilityTitleMobile>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <Box display="flex" flexDirection="column" p={rem("20px")}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={rem("16px")}
          >
            <StyledSearchText>Search preferences</StyledSearchText>
            {!isSearchable ? (
              <StyledSearchButton
                onClick={() => setIsSearchable(true)}
                startIcon={<EditSearchActiveIcon />}
              >
                Edit Search
              </StyledSearchButton>
            ) : (
              <StyledSearchButton
                type="reset"
                onClick={() => reset()}
                startIcon={
                  !formState.isDirty ? <DeleteDisabledIcon /> : <DeleteIcon />
                }
                disabled={!formState.isDirty}
              >
                Clear all
              </StyledSearchButton>
            )}
          </Box>
          <Stack direction="row" spacing={1}>
            {weekData.map(item => (
              <Chip
                key={item.day}
                label={item.day.slice(0, 2)}
                variant="outlined"
                onClick={() => handleClick(item)}
                color={item.active ? "success" : "default"}
              />
            ))}
          </Stack>
        </Box>
        {!isSearchable ? (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <TabDataOnSearch />
          </Collapse>
        ) : (
          <Box>
            <SearchTable
              register={register}
              unregister={unregister}
              formState={formState}
            />
          </Box>
        )}
        {!isSearchable ? (
          <StyledCollapsedSearch>
            <Box
              display="flex"
              sx={{ cursor: "pointer" }}
              justifyContent="space-between"
            >
              <Box display="flex" onClick={() => setIsExpanded(prev => !prev)}>
                <StyledCircle>
                  {!isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </StyledCircle>
                <StyledShowMoreText>
                  {!isExpanded ? "Show more" : "Show less"}
                </StyledShowMoreText>
              </Box>
              <Box>
                <StyledShowMoreText>
                  Autostart Search <strong>16:00</strong>
                </StyledShowMoreText>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={rem("24px")}
            >
              <Box display="flex" alignItems="center">
                {isSearching ? <RunningIcon /> : <StoppingIcon />}
                <StyledShowMoreText>
                  {isSearching ? "Running" : "Stopped"}
                </StyledShowMoreText>
              </Box>
              <Box>
                <ContainedButton onClick={() => setIsSearching(prev => !prev)}>
                  {isSearching ? "Stop Search" : "Start Searching"}
                </ContainedButton>
              </Box>
            </Box>
          </StyledCollapsedSearch>
        ) : (
          <StyledCollapsedSearch>
            <Box display="flex" flexDirection="column" justifyContent="center">
              {content.availibility.formControlLabelForSwitches.map(
                (label: string, index: number) => (
                  <Box key={index}>
                    <FormControlLabel
                      control={<Switch sx={{ m: 1 }} />}
                      label={label}
                    />
                    {index === 0 && (
                      <StyledTimePickerField
                        type="time"
                        sx={{ mr: rem("32px") }}
                        inputProps={{
                          step: 300,
                        }}
                      />
                    )}
                  </Box>
                )
              )}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              mt={rem("16px")}
            >
              <OutlinedButton
                sx={{
                  whiteSpace: "nowrap",
                  color: theme.palette.grey7,
                  borderColor: theme.palette.grey3,
                  width: rem("159px"),
                }}
                onClick={() => setIsSearchable(false)}
              >
                Cancel
              </OutlinedButton>
              <ContainedButton sx={{ width: rem("159px") }} type="submit">
                Save
              </ContainedButton>
            </Box>
          </StyledCollapsedSearch>
        )}
      </Box>
    </StyledAvailabilityMobile>
  )
}

export default observer(AvailabilityPage)
