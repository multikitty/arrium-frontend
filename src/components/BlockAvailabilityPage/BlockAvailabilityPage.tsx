import React, { useEffect, useState } from "react"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import {
  StyledFAQPage as StyledBlockAvailabilityPage,
  StyledFAQPageHeader as StyledBlockAvailabilityPageHeader,
} from "../FAQPage/FAQPage.styled"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Collapse from "@mui/material/Collapse"
import {
  StyledBlockAvailablityPageWrapper,
  StyledBlockHeader,
  StyledBlockSearchText,
  StyledCircle,
  StyledCollapsedSearch,
  StyledSearchButton,
  StyledTextWrapper,
  StyledShowMoreText,
  StyledTimePickerField,
} from "./BlockAvailabilityPage.styled"
import EditSearchActiveIcon from "@/assets/icons/edit_icon_active.inline.svg"
import ArrowDownIcon from "@/assets/icons/filter-arrow_down.inline.svg"
import ArrowUpIcon from "@/assets/icons/filter-arrow_up.inline.svg"
import RunningIcon from "@/assets/icons/running_ripple_icon.inline.svg"
import StoppingIcon from "@/assets/icons/stopping_ripple_icon.inline.svg"
import DeleteIcon from "@/assets/icons/delete_icon.inline.svg"
import { Box, FormControlLabel, Typography, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import {
  rows,
  rowSearches,
  week,
  weekProps,
} from "./BlockAvailabilityPage.data"
import Switch from "../commons/Switch"
import theme from "@/theme"
import { FormValues, TabPanelProps } from "./BlockAvailablityPage.types"
import { TabDataSearch } from "./TabDataOnSearch"
import SearchTable from "./SearchTable"
import { TabData } from "./TabContent"
import { useForm } from "react-hook-form"
import { devices } from "@/constants/device"
import { content } from "@/constants/content"
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
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

const BlockAvailabilityPage = () => {
  const { availibilityStore } = useStore()
  const isWebView = useMediaQuery(devices.web.up)
  const [tabIndex, setTabIndex] = React.useState(0)
  const [weekData, setWeekData] = useState<Array<weekProps>>(week)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isSearchable, setIsSearchable] = useState<boolean>(true)

  const handleClick = (item: weekProps) => {
    setWeekData(data =>
      data.map(d =>
        d.day === item.day ? { ...d, isSelected: !d.isSelected } : d
      )
    )
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const { register, handleSubmit, reset, unregister } = useForm<FormValues>({
    defaultValues: {
      timeToArrive: [],
      startTime: [],
      endTime: [],
      minimumPay: [],
      minimumHourlyRate: [],
    },
    mode: "onBlur",
  })

  useEffect(() => {}, [weekData])

  const onSubmit = (data: FormValues) => {
    availibilityStore.setInitialState(data)
    console.log("onSubmit", data)
  }

  const onInvalid = (data: any) => {
    console.log("Invalid", data)
  }

  return isWebView ? (
    <StyledBlockAvailabilityPage>
      <StyledBlockAvailabilityPageHeader>
        Availability
      </StyledBlockAvailabilityPageHeader>
      <StyledBlockAvailablityPageWrapper
        component="form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <StyledBlockHeader>
          <StyledTextWrapper>
            <StyledBlockSearchText>Search preferences</StyledBlockSearchText>
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
                startIcon={<DeleteIcon />}
              >
                Clear all
              </StyledSearchButton>
            )}
          </StyledTextWrapper>
          <Stack direction="row" spacing={1}>
            {weekData.map(item => (
              <Chip
                key={item.day}
                label={item.day}
                variant="outlined"
                onClick={() => handleClick(item)}
                color={item.isSelected ? "success" : "default"}
              />
            ))}
          </Stack>
        </StyledBlockHeader>

        {!isSearchable ? (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            {TabDataSearch(rowSearches)}
          </Collapse>
        ) : (
          <Box>
            <SearchTable register={register} unregister={unregister} />
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
              {content.blockAvailibility.formControlLabelForSwitches.map(
                (label: string, index: number) => (
                  <React.Fragment key={index}>
                    <FormControlLabel
                      control={<Switch sx={{ m: 1 }} />}
                      label={label}
                    />
                    {index === 0 && (
                      <StyledTimePickerField sx={{ mr: rem("32px") }} />
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
              >
                Cancel
              </OutlinedButton>
              <ContainedButton type="submit">Save</ContainedButton>
            </Box>
          </StyledCollapsedSearch>
        )}
      </StyledBlockAvailablityPageWrapper>
      <StyledBlockAvailablityPageWrapper style={{ marginTop: "16px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabIndex} onChange={handleChange}>
              {content.blockAvailibility.labelsForTabs.map(
                (label: string, index: number) => (
                  <Tab key={index} sx={tabStyles} label={label} />
                )
              )}
            </Tabs>
          </Box>
          {content.blockAvailibility.labelsForTabs.map(
            (label: string, index: number) => (
              <TabPanel key={index} value={tabIndex} index={index}>
                {TabData(rows, label)}
              </TabPanel>
            )
          )}
        </Box>
      </StyledBlockAvailablityPageWrapper>
    </StyledBlockAvailabilityPage>
  ) : (
    <div>LOL</div>
  )
}

export default observer(BlockAvailabilityPage)
