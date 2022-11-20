import React, { useEffect, useState } from "react"
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
  tabsClasses,
  darken,
} from "@mui/material"
import { rem } from "polished"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { animateScroll } from "react-scroll"

import EditSearchActiveIcon from "@/assets/icons/edit_icon_active.inline.svg"
import ArrowDownIcon from "@/assets/icons/filter-arrow_down.inline.svg"
import ArrowUpIcon from "@/assets/icons/filter-arrow_up.inline.svg"
import RunningIcon from "@/assets/icons/running_ripple_icon.inline.svg"
import StoppingIcon from "@/assets/icons/stopping_ripple_icon.inline.svg"
import DeleteIcon from "@/assets/icons/delete_icon.inline.svg"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import Switch from "../commons/Switch"
import theme from "@/theme"
import TabDataOnSearch from "./ReadOnlySearchTable"
import SearchTable from "./SearchTable"
import AvailabilityTable from "./AvailabilityTable"
import { devices } from "@/constants/device"
import { content } from "@/constants/content"
import { useStore } from "@/store"

import {
  AvailabilityStatusType,
  initialWeekData,
  searchTableEmptyData,
  searchTableInitialValues,
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
  StyledAvailabilityMobile,
  StyledAvailabilityTitleMobile,
} from "./AvailabilityPage.styled"
import { availabilityResolver } from "@/validation/availability"
import { Plans } from "@/constants/common"
import routes from "@/constants/routes"
import { useSnackbar } from "notistack"

import { setPrefrences, usePreferences } from "@/agent/prefrences"
import {
  IGetPrefrencesResultData,
  ISetPrefrencesResult,
  ISetPrefrencesVariables,
} from "@/lib/interfaces/prefrences"
import { useMutation } from "react-query"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"
import { createDateInHM } from "@/utils"

export type AvailabilityTableTabType = AvailabilityStatusType | "all"

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

interface IAvailabilityPageProps extends IPageProps {}

const AvailabilityPage: React.FC<IAvailabilityPageProps> = ({
  country_code,
}) => {
  const { navigate } = useNavigate({ country_code })
  const { userStore } = useStore()
  const { enqueueSnackbar } = useSnackbar()
  const isWebView = useMediaQuery(devices.web.up)
  const [currentTab, setCurrentTab] =
    React.useState<AvailabilityTableTabType>("all")
  const [weekData, setWeekData] = useState<WeekType[]>(initialWeekData)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isSearchable, setIsSearchable] = useState<boolean>(false)
  const { data: preferenceData, isLoading } = usePreferences()

  const { handleSubmit, formState, ...methods } = useForm<FormValues>({
    defaultValues: {
      ...searchTableInitialValues,
    },
    mode: "onBlur",
    resolver: availabilityResolver,
  })

  useEffect(() => {
    if (!isLoading) {
      methods.reset({
        data: preferenceData?.data?.map((value: IGetPrefrencesResultData) => ({
          location: `${value.station.stationName} (${value.station.stationCode}) - ${value.station.regionCode}`,
          checked: value?.preference?.active === "Y" ? true : false,
          timeToArrive: value?.preference?.tta
            ? parseInt(value?.preference?.tta)
            : undefined,
          startTime: createDateInHM(
            Number(value.preference.bStartTime.split(":")[0]),
            Number(value.preference.bStartTime.split(":")[1])
          ),
          endTime: createDateInHM(
            Number(value.preference.bEndTime.split(":")[0]),
            Number(value.preference.bEndTime.split(":")[1])
          ),
          minimumPay: value.preference.minPay,
          minimumHourlyRate: value.preference.minHourlyRate,
          stationCode: value.station.stationCode,
          stationId: value.station.stationID,
          regionId: value.station.regionID,
        })),
      })
    }
  }, [isLoading, preferenceData])

  const handleClick = (item: WeekType) => {
    const activeChips = weekData.filter(data => data.active)
    const activeChipCount = activeChips.length
    let newWeekData = [...weekData]
    if (!isSearchable && activeChipCount) newWeekData = initialWeekData
    if (
      isSearchable &&
      activeChipCount === 1 &&
      activeChips[0].day === item.day
    )
      return
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

  const handleFormReset = () => {
    methods.reset(searchTableEmptyData)
  }

  const handleCancel = () => {
    setIsSearchable(false)
    methods.reset()
  }

  const handleNavigateToAutomationSchedule = () => {
    navigate(routes.automationSchedule)
  }

  const { mutate } = useMutation<
    ISetPrefrencesResult,
    Error,
    ISetPrefrencesVariables
  >(setPrefrences)

  const onSubmit = async (preferences: FormValues) => {
    const apiData = preferences.data.map(obj => {
      return {
        stationCode: obj.stationCode,
        regionId: obj.regionId,
        stationId: obj.stationId,
        day: "",
        tta: obj.timeToArrive,
        minPay: obj.minimumPay,
        minHourlyRate: obj.minimumHourlyRate,
        startTime: obj.startTime
          ? new Date(obj.startTime).toLocaleTimeString([], {
              hour12: false,
            })
          : "",
        endTime: obj.endTime
          ? new Date(obj.endTime).toLocaleTimeString([], {
              hour12: false,
            })
          : "",
        active: obj.checked ? "Y" : "N",
      }
    })
    mutate(
      {
        preferences: apiData,
      },
      {
        onSuccess({ success }) {
          if (!success) {
            enqueueSnackbar("Some Error Occured", { variant: "error" })
          } else {
            enqueueSnackbar("Search Prefrences Saved", { variant: "success" })
          }
        },
        onError() {
          enqueueSnackbar("Some Error Occured", { variant: "error" })
        },
      }
    )
    setIsSearchable(false)
    animateScroll.scrollToTop({ smooth: true, duration: 0 })
  }

  const onInvalid = (data: any) => {
    const error = data.data.find((d: any) => d?.timeToArrive?.ref)
    if (error) {
      enqueueSnackbar("Please fill all required fields", { variant: "error" })
      error.timeToArrive.ref.focus()
    }
  }

  React.useEffect(() => {
    const currentDay = new Date().getDay() - 1
    setWeekData(prev =>
      prev.map((p, idx) =>
        idx === currentDay ? { ...p, active: true } : { ...p, active: false }
      )
    )
  }, [isSearchable])

  React.useEffect(() => {
    const currentDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

    setWeekData(prev =>
      prev.map((p, idx) =>
        idx === currentDay ? { ...p, active: true } : { ...p, active: false }
      )
    )
  }, [])

  const isPremiumUser = userStore.currentUser?.plan === Plans.premium

  return (
    <FormProvider
      formState={formState}
      handleSubmit={handleSubmit}
      {...methods}
    >
      {isWebView ? (
        /* // * WEB VIEW */
        <StyledAvailabilityPage>
          <StyledAvailabilityPageHeader>
            Availability
          </StyledAvailabilityPageHeader>
          <StyledAvailablityPageWrapper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                    onClick={() => handleFormReset()}
                    startIcon={<DeleteIcon />}
                  >
                    Clear all
                  </StyledSearchButton>
                )}
              </StyledTextWrapper>
              {isPremiumUser && (
                <Stack direction="row" spacing={1}>
                  {weekData.map(item => (
                    <Chip
                      clickable
                      key={item.day}
                      label={item.day}
                      variant="filled"
                      onClick={() => handleClick(item)}
                      sx={{
                        backgroundColor: item.active
                          ? "#3DCC70"
                          : "rgba(0, 0, 0, 0.08)",
                        color: item.active ? "white" : "black",
                        "&:hover": {
                          color: "white",
                          backgroundColor: darken("#3DCC70", 0.2),
                        },
                      }}
                    />
                  ))}
                </Stack>
              )}
            </StyledHeader>
            {!isSearchable ? (
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <TabDataOnSearch />
              </Collapse>
            ) : (
              <Box>
                <SearchTable />
              </Box>
            )}
            {!isSearchable ? (
              <StyledCollapsedSearch>
                <Box
                  display="flex"
                  alignItems="center"
                  // flexDirection="column"
                  sx={{ cursor: "pointer" }}
                >
                  <Box
                    display="flex"
                    onClick={() => setIsExpanded(prev => !prev)}
                  >
                    <StyledCircle>
                      {!isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
                    </StyledCircle>
                    <StyledShowMoreText>
                      {!isExpanded ? "Show more" : "Show less"}
                    </StyledShowMoreText>
                  </Box>
                  {isPremiumUser && (
                    <ContainedButton
                      sx={{ m: 1, ml: 2 }}
                      onClick={handleNavigateToAutomationSchedule}
                    >
                      Automation Schedule
                    </ContainedButton>
                  )}
                  {/* {isPremiumUser && (
                    <Box sx={{ marginLeft: rem("20px") }}>
                      <StyledShowMoreText>
                        Autostart Search <strong>16:00</strong>
                      </StyledShowMoreText>
                    </Box>
                  )} */}
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
                    <ContainedButton
                      onClick={() => setIsSearching(prev => !prev)}
                    >
                      {isSearching ? "Stop Search" : "Start Searching"}
                    </ContainedButton>
                  </Box>
                </Box>
              </StyledCollapsedSearch>
            ) : (
              <StyledCollapsedSearch>
                <Box display="flex" alignItems="center">
                  {isPremiumUser && (
                    <ContainedButton
                      sx={{ m: 1, mr: 2 }}
                      onClick={handleNavigateToAutomationSchedule}
                    >
                      Automation Schedule
                    </ContainedButton>
                  )}
                  {content.availibility.formControlLabelForSwitches.map(
                    (label: JSX.Element, index: number) => (
                      <React.Fragment key={index}>
                        <FormControlLabel
                          control={<Switch sx={{ m: 1 }} />}
                          label={label}
                        />
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
                    onClick={handleCancel}
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
                      <Tab
                        key={index}
                        sx={tabStyles}
                        label={label}
                        value={value}
                      />
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
                    <AvailabilityTable
                      tab={value as AvailabilityTableTabType}
                    />
                  </TabPanel>
                )
              )}
            </Box>
          </StyledAvailablityPageWrapper>
        </StyledAvailabilityPage>
      ) : (
        /* MOBILE VIEW */
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
                mb={rem("20px")}
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
                    onClick={() => handleFormReset()}
                    startIcon={<DeleteIcon />}
                  >
                    Clear all
                  </StyledSearchButton>
                )}
              </Box>
              {isPremiumUser && (
                <Stack
                  width="100%"
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  {weekData.map(item => (
                    <Chip
                      key={item.day}
                      label={item.day.slice(0, 2)}
                      variant="filled"
                      onClick={() => handleClick(item)}
                      sx={{
                        backgroundColor: item.active
                          ? "#3DCC70"
                          : "rgba(0, 0, 0, 0.08)",
                        color: item.active ? "white" : "black",
                        "&:hover": {
                          color: "white",
                          backgroundColor: darken("#3DCC70", 0.2),
                        },
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Box>
            {!isSearchable ? (
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <TabDataOnSearch />
              </Collapse>
            ) : (
              <Box>
                <SearchTable isMobile />
              </Box>
            )}
            {!isSearchable ? (
              <StyledCollapsedSearch>
                <Box
                  display="flex"
                  sx={{ cursor: "pointer" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    onClick={() => setIsExpanded(prev => !prev)}
                  >
                    <StyledCircle>
                      {!isExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
                    </StyledCircle>
                    <StyledShowMoreText>
                      {!isExpanded ? "Show more" : "Show less"}
                    </StyledShowMoreText>
                  </Box>
                  <ContainedButton onClick={handleNavigateToAutomationSchedule}>
                    Automation Schedule
                  </ContainedButton>
                  {/* {isPremiumUser && (
                    <Box>
                      <StyledShowMoreText>
                        Autostart Search <strong>16:00</strong>
                      </StyledShowMoreText>
                    </Box>
                  )} */}
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
                    <ContainedButton
                      onClick={() => setIsSearching(prev => !prev)}
                    >
                      {isSearching ? "Stop Search" : "Start Searching"}
                    </ContainedButton>
                  </Box>
                </Box>
              </StyledCollapsedSearch>
            ) : (
              <StyledCollapsedSearch>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  {isPremiumUser && (
                    <ContainedButton
                      sx={{ maxWidth: 160, whiteSpace: "nowrap", mb: 1 }}
                      onClick={handleNavigateToAutomationSchedule}
                    >
                      Automation Schedule
                    </ContainedButton>
                  )}
                  {content.availibility.formControlLabelForSwitches.map(
                    (label: JSX.Element, index: number) => (
                      <Box key={index}>
                        <FormControlLabel
                          control={<Switch sx={{ m: 1 }} />}
                          label={label}
                        />
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
                    onClick={handleCancel}
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
          <Box sx={{ width: "100%", mt: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={currentTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{
                  maxWidth: "100vw",
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
              >
                {content.availibility.labelsForTabs.map(
                  ({ label, value }, index: number) => (
                    <Tab
                      key={index}
                      sx={tabStyles}
                      label={label}
                      value={value}
                    />
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
                  <AvailabilityTable tab={value as AvailabilityTableTabType} />
                </TabPanel>
              )
            )}
          </Box>
        </StyledAvailabilityMobile>
      )}
    </FormProvider>
  )
}

export default observer(AvailabilityPage)
