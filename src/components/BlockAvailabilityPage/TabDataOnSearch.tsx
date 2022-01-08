import React from "react"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material"
import theme from "../../theme"
import { rem } from "polished"

export const TabDataSearch = (rowsSearches: any[]) => (
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
