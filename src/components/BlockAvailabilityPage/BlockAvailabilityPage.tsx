import React, { useState } from "react"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import {
  StyledFAQPage as StyledBlockAvailabilityPage,
  StyledFAQPageHeader as StyledBlockAvailabilityPageHeader,
} from "../FAQPage/FAQPage.styled"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
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
import { Box, TableContainer, Typography } from "@mui/material"
import { rem } from "polished"
import { ContainedButton } from "../commons/Button"
import theme from "../../theme"

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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const TabData = (rows: any[], status: string) => (
  <TableContainer>
    <Table aria-label="invoices table">
      <TableHead sx={{ backgroundColor: theme.palette.grey1 }}>
        <TableRow>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
              paddingLeft: rem("32px"),
            }}
          >
            Location
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Day
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Date
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Time
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Duration
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Pay
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Status
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .filter(row => (status === "All" ? true : row.Status === status))
          .map(row => (
            <TableRow
              key={row.Location}
              sx={{
                height: "72px",
                "&:last-child td, &:last-child th": { border: 0 },
                "& td:first-child, & th:first-child": {
                  paddingLeft: rem("32px"),
                },
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.blackText,
                }}
                component="th"
                scope="row"
              >
                {row.Location}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.blackText,
                }}
                align="left"
              >
                {row.Day}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.blackText,
                }}
                align="left"
              >
                {row.Date}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.blackText,
                  textTransform: "capitalize",
                }}
                align="left"
              >
                {row.Time}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.blackText,
                }}
                align="left"
              >
                {row.Duration}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.blackText,
                }}
                align="left"
              >
                &#163;{row.Pay}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.blackText,
                }}
                align="left"
              >
                {row.Status === "Accepted" ? (
                  <Chip
                    label="Accepted"
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "white",
                      background: "#3DCC70",
                    }}
                  />
                ) : (
                  <Chip
                    label="Ignored"
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "white",
                      background: "#FAB11E",
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const TabDataSearch = (rowsSearches: any[]) => (
  <TableContainer>
    <Table aria-label="invoices table">
      <TableHead sx={{ backgroundColor: theme.palette.grey1 }}>
        <TableRow>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
              paddingLeft: rem("32px"),
            }}
          >
            Location
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Time to arrive
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Start time - end time
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Minimum Pay
          </TableCell>
          <TableCell
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: rem("16px"),
              lineHeight: rem("20px"),
              color: theme.palette.grey6,
            }}
            align="left"
          >
            Minimun Hourly Rate
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rowsSearches.map(row => (
          <TableRow
            key={row.Location}
            sx={{
              height: "72px",
              "&:last-child td, &:last-child th": { border: 0 },
              "& td:first-child, & th:first-child": {
                paddingLeft: rem("32px"),
              },
            }}
          >
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              component="th"
              scope="row"
            >
              {row.location}
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              align="left"
            >
              {row.timeToArrive}
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              align="left"
            >
              {row.startTimeToEndTime}
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
                textTransform: "capitalize",
              }}
              align="left"
            >
              &#163;{row.minPay}
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              align="left"
            >
              &#163;{row.minHourlyRate}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const BlockAvailabilityPage = () => {
  const handleClick = () => console.log("hi")
  const [value, setValue] = React.useState(0)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const createData = (
    Location: string,
    Day: string,
    Date: string,
    Time: string,
    Duration: string,
    Pay: string,
    Status: "Accepted" | "Ignored"
  ) => {
    return { Location, Day, Date, Time, Duration, Pay, Status }
  }

  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const createSearchesData = (
    location: string,
    timeToArrive: string,
    startTimeToEndTime: string,
    minPay: string,
    minHourlyRate: string
  ) => {
    return { location, timeToArrive, startTimeToEndTime, minPay, minHourlyRate }
  }

  const rowSearches = [
    createSearchesData(
      "Manchester (CMC2) - Morrisons",
      "15 min",
      "17:45 - 21:00",
      "30",
      "10"
    ),
    createSearchesData(
      "Leyland (DPR1) - AMZL",
      "20 min",
      "17:30 - 22:00",
      "35",
      "1"
    ),
    createSearchesData(
      "Knowsley (DWN1) - AMZL",
      "32 min",
      "17:30 - 22:00",
      "40",
      "13"
    ),
  ]

  const rows = [
    createData(
      "Knowsley (DWN1) - AMZL",
      "Wed",
      "Sep 22",
      "17:45 - 21:15",
      "3 h 30 min",
      "54.50",
      "Accepted"
    ),
    createData(
      "Leyland (DPR1) - AMZL",
      "Wed",
      "Sep 22",
      "17:30 - 21:00",
      "3 h 30 min",
      "45.50",
      "Accepted"
    ),
    createData(
      "Knowsley (DWN1) - AMZL",
      "Wed",
      "Sep 22",
      "18:15 - 21:45",
      "3 h 30 min",
      "54.50",
      "Accepted"
    ),
    createData(
      "Manchester (CMC2) - Morrisons",
      "Wed",
      "Sep 22",
      "18:00 - 20:00",
      "2 h",
      "26",
      "Ignored"
    ),
  ]

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
                {...a11yProps(0)}
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
                {...a11yProps(1)}
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
                {...a11yProps(2)}
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
