import React, { useState } from "react"
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
import EditSearchActiveIcon from "../../assets/icons/edit_icon_active.inline.svg"
import ArrowDownIcon from "../../assets/icons/filter-arrow_down.inline.svg"
import ArrowUpIcon from "../../assets/icons/filter-arrow_up.inline.svg"
import RunningIcon from "../../assets/icons/running_ripple_icon.inline.svg"
import StoppingIcon from "../../assets/icons/stopping_ripple_icon.inline.svg"
import DeleteIcon from "../../assets/icons/delete_icon.inline.svg"
import DeleteDisabledIcon from "../../assets/icons/delete_icon_disabled.inline.svg"
import { Box, FormControlLabel, Typography } from "@mui/material"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { rows, rowSearches, week } from "./BlockAvailabilityPage.data"
import Switch from "../commons/Switch"
import theme from "../../theme"
import { Fields, TabPanelProps } from "./BlockAvailablityPage.types"
import { TabDataSearch } from "./TabDataOnSearch"
import { SearchTable } from "./SearchTable"
import { TabData } from "./TabContent"
import { timeToArriveInputFormOptions } from "../../validation"
import { useForm } from "react-hook-form"

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const BlockAvailabilityPage = () => {
  const [value, setValue] = React.useState(0)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isSearchable, setIsSearchable] = useState<boolean>(true)
  const [fields, setFields] = useState<Fields>({
    timeToArrive: "",
    minimunPay: "",
    startTime: "",
    endTime: "",
    minimunHourlyPay: "",
  })
  const [error, setError] = useState<boolean>(false)
  const [isDisable, _] = useState<boolean>(true)

  const handleClick = () => console.log("Clicked")
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const {
    handleSubmit,
    formState: { errors },
  } = useForm(timeToArriveInputFormOptions)

  const onSubmit = (data: any) => {
    console.log(data)
    console.log(errors)
  }

  return (
    <StyledBlockAvailabilityPage>
      <StyledBlockAvailabilityPageHeader>
        Block availability
      </StyledBlockAvailabilityPageHeader>
      <StyledBlockAvailablityPageWrapper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
                disabled={isDisable}
                startIcon={isDisable ? <DeleteDisabledIcon /> : <DeleteIcon />}
              >
                Clear all
              </StyledSearchButton>
            )}
          </StyledTextWrapper>
          <Stack direction="row" spacing={1}>
            {week.map(day => (
              <Chip
                key={day}
                label={day}
                variant="outlined"
                onClick={handleClick}
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
            <SearchTable
              error={error}
              setError={setError}
              fields={fields}
              setFields={setFields}
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
                {isSearching ? <StoppingIcon /> : <RunningIcon />}
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
              <FormControlLabel
                control={<Switch sx={{ m: 1 }} />}
                label="AutoStart Search"
              />
              <StyledTimePickerField sx={{ mr: rem("32px") }} />
              <FormControlLabel
                control={<Switch sx={{ m: 1 }} />}
                label="Send notifications on start"
              />
              <FormControlLabel
                control={<Switch sx={{ m: 1 }} />}
                label="Reject offers from ‘unticked’ locations"
              />
            </Box>
            <Box display="flex" alignItems="center">
              <OutlinedButton
                type="reset"
                sx={{
                  whiteSpace: "nowrap",
                  color: theme.palette.grey7,
                  borderColor: theme.palette.grey3,
                  marginRight: rem("10px"),
                }}
              >
                Cancel
              </OutlinedButton>
              <ContainedButton
                type="submit"
                onClick={() => setIsSearchable(false)}
              >
                Save
              </ContainedButton>
            </Box>
          </StyledCollapsedSearch>
        )}
      </StyledBlockAvailablityPageWrapper>
      <StyledBlockAvailablityPageWrapper style={{ marginTop: "16px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                sx={{
                  fontSize: rem("20px"),
                  fontWeight: 500,
                  lineHeight: rem("20px"),
                  textTransform: "capitalize",
                  padding: rem("32px"),
                }}
                label="All"
              />
              <Tab
                sx={{
                  fontSize: rem("20px"),
                  fontWeight: 500,
                  lineHeight: rem("20px"),
                  textTransform: "capitalize",
                  padding: rem("32px"),
                }}
                label="Accepted"
              />
              <Tab
                sx={{
                  fontSize: rem("20px"),
                  fontWeight: 500,
                  lineHeight: rem("20px"),
                  textTransform: "capitalize",
                  paddingX: rem("32px"),
                  paddingY: rem("30px"),
                }}
                label="Ignored"
              />
              <Tab
                sx={{
                  fontSize: rem("20px"),
                  fontWeight: 500,
                  lineHeight: rem("20px"),
                  textTransform: "capitalize",
                  paddingX: rem("32px"),
                  paddingY: rem("30px"),
                }}
                label="Rejected"
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {TabData(rows, "All")}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {TabData(rows, "Accepted")}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {TabData(rows, "Ignored")}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {TabData(rows, "Rejected")}
          </TabPanel>
        </Box>
      </StyledBlockAvailablityPageWrapper>
    </StyledBlockAvailabilityPage>
  )
}

export default BlockAvailabilityPage
