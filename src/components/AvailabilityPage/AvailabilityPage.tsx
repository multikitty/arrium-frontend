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
  tabsClasses,
  darken,
} from "@mui/material"
import { rem } from "polished"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { animateScroll } from "react-scroll"

import EditSearchActiveIcon from "@/assets/icons/edit_icon_active.inline.svg"
import EditSearchInActiveIcon from "@/assets/icons/edit_icon_inactive.inline.svg"
import ArrowDownIcon from "@/assets/icons/filter-arrow_down.inline.svg"
import ArrowUpIcon from "@/assets/icons/filter-arrow_up.inline.svg"
import RunningIcon from "@/assets/icons/running_ripple_icon.inline.svg"
import StoppingIcon from "@/assets/icons/stopping_ripple_icon.inline.svg"
import DeleteIcon from "@/assets/icons/delete_icon.inline.svg"
import noSearchPreferencesImage from "@/assets/icons/no_search_preferences_icon.svg"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import Switch from "@/components/commons/Switch"
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
  WeekType,
} from "./AvailabilityPage.data"
import { FormValues, TabPanelProps } from "./AvailablityPage.types"
import {
  StyledFAQPage as StyledAvailabilityPage,
  StyledFAQPageHeader as StyledAvailabilityPageHeader,
} from "@/components/FAQPage/FAQPage.styled"
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
  StyledNoSearchResultsTitle,
} from "./AvailabilityPage.styled"
import { availabilityResolver } from "@/validation/availability"
import { Plans } from "@/constants/common"
import { useSnackbar } from "notistack"
import { setPrefrences, usePreferences } from "@/agent/prefrences"
import {
  GetPrefrencesResultData,
  SetPrefrencesResult,
  SetPrefrencesVariables,
} from "@/lib/interfaces/prefrences"
import { useMutation } from "react-query"
import { PageProps } from "@/lib/interfaces/common"
import { createDateInHM, localStorageUtils } from "@/utils"
import AvailabilityAutomationModal from "./AvailabilityAutomationModal"
import { setBlockStartSearch, setBlockStopSearch } from "@/agent/availability"
import { TASK_ID } from "@/constants/localStorage"
import { setLocalStorage } from "@/utils/localStorage"
import isBrowser from "@/utils/isBrowser"
import { Script } from "gatsby"
import LoadingScreen from "@/components/LoadingScreen"

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

interface AvailabilityPageProps extends PageProps {}

const AvailabilityPage: React.FC<AvailabilityPageProps> = ({
  country_code,
}) => {
  const { userStore } = useStore()
  const { enqueueSnackbar } = useSnackbar()
  const isWebView = useMediaQuery(devices.web.up)
  const [currentTab, setCurrentTab] =
    React.useState<AvailabilityTableTabType>("all")
  const [weekData, setWeekData] = useState<WeekType[]>(initialWeekData)
  const [taskId, setTaskId] = useState(localStorageUtils.get(TASK_ID) || "")
  const [isExpanded, setIsExpanded] = useState(true)
  const [isSearching, setIsSearching] = useState(taskId ? true : false)
  const [isSearchable, setIsSearchable] = useState(false)
  const { data: preferenceData, isLoading, refetch } = usePreferences()
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false)
  const isPremiumUser = userStore.currentUser?.plan === Plans.premium

  const isEnableIdentityScript =
    userStore.currentUser &&
    userStore.currentUser.id &&
    userStore.currentUser.firstName &&
    userStore.currentUser?.lastName &&
    userStore.currentUser.email &&
    userStore.currentUser.isEmailVerified &&
    userStore.currentUser.tzName &&
    userStore.currentUser.plan &&
    userStore.flexData &&
    userStore.flexData.region

  const { handleSubmit, formState, ...methods } = useForm<FormValues>({
    defaultValues: {
      data: [],
    },
    mode: "onBlur",
    resolver: availabilityResolver,
  })

  React.useEffect(() => {
    if (!preferenceData?.data) return
    methods.reset({
      data: preferenceData.data.map((value: GetPrefrencesResultData) => ({
        location: `${value.station.stationName} (${value.station.stationCode}) - ${value.station.regionCode}`,
        checked: value?.preference?.active === "Y" ? true : false,
        timeToArrive: value?.preference?.tta,
        startTime:
          value.preference?.bStartTime !== ""
            ? createDateInHM(
                Number(value.preference?.bStartTime?.split(":")[0]),
                Number(value.preference?.bStartTime?.split(":")[1])
              )
            : null,
        endTime:
          value.preference?.bEndTime !== ""
            ? createDateInHM(
                Number(value.preference?.bEndTime?.split(":")[0]),
                Number(value.preference?.bEndTime?.split(":")[1])
              )
            : null,
        minimumPay: value.preference.minPay,
        minimumHourlyRate: value.preference.minHourlyRate,
        stationCode: value.station.stationCode,
        stationId: value.station.stationID,
        regionId: value.station.regionID,
      })),
    })
  }, [preferenceData])

  const handleClick = (item: WeekType) => {
    const activeChips = weekData.filter(data => data.active)
    const activeChipCount = activeChips.length
    let newWeekData = [...weekData]
    if (!isSearchable && activeChipCount) newWeekData = initialWeekData
    if (
      isSearchable &&
      activeChipCount === 1 &&
      activeChips[0].label === item.label
    )
      return
    setWeekData(
      newWeekData.map(d =>
        d.label === item.label ? { ...d, active: !d.active } : d
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
    methods.reset({
      data:
        preferenceData?.data?.map((value: GetPrefrencesResultData) => ({
          location: `${value.station.stationName} (${value.station.stationCode}) - ${value.station.regionCode}`,
          checked: false,
          timeToArrive: value.preference.tta,
          startTime: null,
          endTime: null,
          stationCode: value.station.stationCode,
          stationId: value.station.stationID,
          regionId: value.station.regionID,
        })) || [],
    })
  }

  const handleCancel = () => {
    setIsSearchable(false)
    handleFormReset()
  }

  const { mutate } = useMutation<
    SetPrefrencesResult,
    Error,
    SetPrefrencesVariables
  >(setPrefrences)

  const onSubmit = async (preferences: FormValues) => {
    const apiData: SetPrefrencesVariables["preferences"] = preferences.data.map(
      obj => {
        return {
          stationCode: obj.stationCode,
          regionId: obj.regionId,
          stationId: obj.stationId,
          day: "",
          tta: obj.timeToArrive,
          minPay: parseInt(obj.minimumPay?.toString() || ""),
          minHourlyRate: parseInt(obj.minimumHourlyRate?.toString() || ""),
          startTime:
            obj.startTime && obj.startTime.toString() !== "Invalid Date"
              ? new Date(obj.startTime).toLocaleTimeString([], {
                  hour12: false,
                })
              : "",
          endTime:
            obj.endTime && obj.endTime.toString() !== "Invalid Date"
              ? new Date(obj.endTime).toLocaleTimeString([], {
                  hour12: false,
                })
              : "",
          active: obj.checked ? "Y" : "N",
        }
      }
    )
    mutate(
      {
        preferences: apiData,
        days: isPremiumUser ? weekData : [],
      },
      {
        onSuccess({ success }) {
          if (!success) {
            enqueueSnackbar("Some Error Occured", { variant: "error" })
          } else {
            enqueueSnackbar("Search Prefrences Saved", { variant: "success" })
            refetch()
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

  const handleAutomationClick = () => {
    setIsAutomationModalOpen(true)
  }

  const handleAutomationModalClose = () => {
    setIsAutomationModalOpen(false)
  }

  const { mutate: blockStartSearchMutate } = useMutation<any, Error, any>(
    setBlockStartSearch
  )

  const handleBlockStartSearch = () => {
    blockStartSearchMutate(
      {},
      {
        onSuccess(response) {
          if (!response?.success) {
            enqueueSnackbar(
              "Something went wrong, please try after sometime.",
              {
                variant: "error",
              }
            )
            return
          }
          enqueueSnackbar(response?.message, { variant: "success" })
          setIsSearching(true)
          setTaskId(response?.taskId)
          setLocalStorage(TASK_ID, response?.taskId)
        },
        onError(error) {
          enqueueSnackbar(error.message, { variant: "error" })
        },
      }
    )
  }

  const { mutate: blockStopSearchMutate } = useMutation<any, Error, any>(
    setBlockStopSearch
  )

  const handleBlockStopSearch = () => {
    blockStopSearchMutate(
      { taskId: taskId },
      {
        onSuccess(response) {
          if (!response?.success) {
            enqueueSnackbar(
              "Something went wrong, please try after sometime.",
              {
                variant: "error",
              }
            )
            return
          }
          enqueueSnackbar(response?.message, { variant: "success" })
          setIsSearching(false)
          localStorageUtils.remove(TASK_ID)
        },
        onError(error) {
          enqueueSnackbar(error.message, { variant: "error" })
        },
      }
    )
  }

  const isNoSearchPreferences = !(preferenceData?.data || []).filter(
    d => d.preference.active === "Y"
  ).length

  if (isLoading) return <LoadingScreen />

  return (
    <FormProvider
      formState={formState}
      handleSubmit={handleSubmit}
      {...methods}
    >
      {isBrowser() && isEnableIdentityScript && (
        <Script
          type="text/javascript"
          id="user-guiding-identify-complete"
          dangerouslySetInnerHTML={{
            __html: `
          // example with attributes
          window.userGuiding.identify('${userStore.currentUser.pk}', {
            customerID: '${userStore.currentUser.id}',
            firstName: '${userStore.currentUser.firstName}',
            lastName: '${userStore.currentUser?.lastName}',
            email: '${userStore.currentUser.email}',
            emailVerified: ${userStore.currentUser.isEmailVerified},
            tzName: '${userStore.currentUser.tzName}',
            role: '${userStore.currentUser?.role}',
            accountStatus: '${userStore.currentUser.accountStatus}',
            flexCountry: '${userStore.currentUser?.flexCountry}',
            region: '${userStore.flexData.region}',
            planType: '${userStore.currentUser.plan}',
            stationType: '${userStore.currentUser?.stationType}',
            PricingPlanEnabled: true,
            startDate: '${userStore.currentUser?.startDate}',
            endDate: '${userStore.currentUser?.endDate}'

          })
          `,
          }}
        ></Script>
      )}

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
                    startIcon={
                      isNoSearchPreferences ? (
                        <EditSearchInActiveIcon />
                      ) : (
                        <EditSearchActiveIcon />
                      )
                    }
                    disabled={isNoSearchPreferences}
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
                      key={item.label}
                      label={item.label}
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
              !isNoSearchPreferences && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <TabDataOnSearch />
                </Collapse>
              )
            ) : (
              <Box>
                <SearchTable />
              </Box>
            )}
            {isNoSearchPreferences && !isSearchable ? (
              <Box
                display="flex"
                flexDirection="column"
                my={6}
                width="100%"
                justifyContent="center"
                alignItems="center"
              >
                <img src={noSearchPreferencesImage} />
                <StyledNoSearchResultsTitle>
                  No Search Prefrences
                </StyledNoSearchResultsTitle>
                <ContainedButton
                  color="primary"
                  onClick={() => setIsSearchable(true)}
                >
                  + Search Prefrences
                </ContainedButton>
              </Box>
            ) : !isSearchable ? (
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
                      onClick={handleAutomationClick}
                    >
                      Automation
                    </ContainedButton>
                  )}
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
                      onClick={() => {
                        isSearching
                          ? handleBlockStopSearch()
                          : handleBlockStartSearch()
                      }}
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
                      onClick={handleAutomationClick}
                    >
                      Automation
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                    startIcon={
                      isNoSearchPreferences ? (
                        <EditSearchInActiveIcon />
                      ) : (
                        <EditSearchActiveIcon />
                      )
                    }
                    disabled={isNoSearchPreferences}
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
                      key={item.label}
                      label={item.label.slice(0, 2)}
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
              !isNoSearchPreferences && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <TabDataOnSearch />
                </Collapse>
              )
            ) : (
              <Box>
                <SearchTable isMobile />
              </Box>
            )}
            {isNoSearchPreferences && !isSearchable ? (
              <Box
                display="flex"
                flexDirection="column"
                my={6}
                width="100%"
                justifyContent="center"
                alignItems="center"
              >
                <img src={noSearchPreferencesImage} />
                <StyledNoSearchResultsTitle>
                  No Search Prefrences
                </StyledNoSearchResultsTitle>
                <ContainedButton
                  color="primary"
                  onClick={() => setIsSearchable(true)}
                >
                  + Search Prefrences
                </ContainedButton>
              </Box>
            ) : !isSearchable ? (
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
                  {/* <ContainedButton onClick={handleNavigateToAutomationSchedule}>
                    Automation Schedule
                  </ContainedButton> */}
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
                      sx={{ m: 1, mr: 2 }}
                      onClick={handleAutomationClick}
                    >
                      Automation
                    </ContainedButton>
                  )}
                  {/* {content.availibility.formControlLabelForSwitches.map(
                    (label: JSX.Element, index: number) => (
                      <Box key={index}>
                        <FormControlLabel
                          control={<Switch sx={{ m: 1 }} />}
                          label={label}
                        />
                      </Box>
                    )
                  )} */}
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={
                    isNoSearchPreferences ? "center" : "space-between"
                  }
                  mt="16px"
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
                  {!isNoSearchPreferences && (
                    <ContainedButton sx={{ width: rem("159px") }} type="submit">
                      Save
                    </ContainedButton>
                  )}
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
      {isAutomationModalOpen && (
        <AvailabilityAutomationModal
          open={isAutomationModalOpen}
          handleClose={handleAutomationModalClose}
          country_code={country_code}
        />
      )}
    </FormProvider>
  )
}

export default observer(AvailabilityPage)
