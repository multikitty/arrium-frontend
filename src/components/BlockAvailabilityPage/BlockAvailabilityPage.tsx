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
} from "./BlockAvailabilityPage.styled"
import EditSearchIcon from "../../assets/icons/edit_icon.inline.svg"
import ArrowDownIcon from "../../assets/icons/filter-arrow_down.inline.svg"
import ArrowUpIcon from "../../assets/icons/filter-arrow_up.inline.svg"
import RunningIcon from "../../assets/icons/running_ripple_icon.inline.svg"
import StoppingIcon from "../../assets/icons/stopping_ripple_icon.inline.svg"
import { Box, Typography } from "@mui/material"
import { rem } from "polished"
import { ContainedButton } from "../commons/Button"
import { rows, rowSearches, week } from "./BlockAvailabilityPage.data"
import { TabData, TabDataSearch } from "../commons/commonComponents"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

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
  const handleClick = () => console.log("hi")
  const [value, setValue] = React.useState(0)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <StyledBlockAvailabilityPage>
      <StyledBlockAvailabilityPageHeader>
        Block availability
      </StyledBlockAvailabilityPageHeader>

      <StyledBlockAvailablityPageWrapper>
        <StyledBlockHeader>
          <StyledTextWrapper>
            <StyledBlockSearchText>Search preferences</StyledBlockSearchText>
            <StyledSearchButton startIcon={<EditSearchIcon />}>
              Edit Search
            </StyledSearchButton>
          </StyledTextWrapper>
          <Stack direction="row" spacing={1}>
            {week.map(day => (
              <Chip label={day} variant="outlined" onClick={handleClick} />
            ))}
          </Stack>
        </StyledBlockHeader>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          {TabDataSearch(rowSearches)}
        </Collapse>

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
                {isSearching ? "Cooling" : "Stopped"}
              </StyledShowMoreText>
            </Box>
            <Box>
              <ContainedButton onClick={() => setIsSearching(prev => !prev)}>
                {isSearching ? "Stop Search" : "Start Searching"}
              </ContainedButton>
            </Box>
          </Box>
        </StyledCollapsedSearch>
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
              s
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
        </Box>
      </StyledBlockAvailablityPageWrapper>
    </StyledBlockAvailabilityPage>
  )
}

export default BlockAvailabilityPage
