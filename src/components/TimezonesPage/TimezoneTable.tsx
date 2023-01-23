import formattedHour from "@/utils/formattedHour"
import { Delete, Edit } from "@mui/icons-material"
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useTheme,
} from "@mui/material"
import { rem } from "polished"
import React from "react"
import { MockTimezone } from "./TimezonePage.mock"

interface TimezoneTableProps {
  timezones: MockTimezone[]
  handleEditTimezoneModalOpen: (tz: MockTimezone) => void
  handleDeleteTimezoneModalOpen: (tz: MockTimezone) => void
}

const TimezoneTable = (props: TimezoneTableProps) => {
  const theme = useTheme()

  const noData = !props.timezones.length

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderRadius: noData
          ? `${rem("20px")} ${rem("20px")} 0 0`
          : rem("20px"),
        mt: 4,
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="timezone table"
        padding="normal"
      >
        <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
                paddingLeft: rem("32px"),
              }}
            >
              Timezone Name
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              Country
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              UTC Offset
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              Timezone Start
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              Timezone End
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.timezones.map(tz => (
            <TableRow
              sx={{
                // "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                  paddingLeft: rem("32px"),
                }}
              >
                {tz.zoneName}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                }}
                align="left"
              >
                {tz.countryName}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                }}
                align="left"
              >
                {formattedHour(tz.gmtOffset)}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                }}
                align="left"
              >
                {`${new Date(
                  tz.zoneStart * 1000
                ).toLocaleDateString()} ${new Date(
                  tz.zoneStart
                ).toLocaleTimeString()}`}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                }}
                align="left"
              >
                {`${new Date(
                  tz.zoneEnd * 1000
                ).toLocaleDateString()} ${new Date(
                  tz.zoneEnd
                ).toLocaleTimeString()}`}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                }}
                align="left"
              >
                <Box display="flex">
                  <Tooltip title="Edit">
                    <IconButton
                      sx={{ mr: 1 }}
                      onClick={() => props.handleEditTimezoneModalOpen(tz)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => props.handleDeleteTimezoneModalOpen(tz)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TimezoneTable
