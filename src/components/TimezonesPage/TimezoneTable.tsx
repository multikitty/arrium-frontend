import formattedHour from "@/utils/formattedHour"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material"
import { rem } from "polished"
import React from "react"
import { IMockTimezone } from "./__mock__"

interface ITimezoneTableProps {
  timezones: IMockTimezone[]
}

const TimezoneTable = (props: ITimezoneTableProps) => {
  const theme = useTheme()

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderRadius: rem("20px"),
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
                {`${new Date(tz.zoneStart).toLocaleDateString()} ${new Date(
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
                {`${new Date(tz.zoneEnd).toLocaleDateString()} ${new Date(
                  tz.zoneEnd
                ).toLocaleTimeString()}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TimezoneTable
