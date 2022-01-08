import React from "react"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  InputAdornment,
} from "@mui/material"
import theme from "../../theme"
import { rem } from "polished"
import { SearchTextField } from "../commons/commonComponents"
import CheckBox from "../commons/CheckBox"

export const SearchTable = () => {
  return (
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
              Start time
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
              End time
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
          <TableRow
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
              <CheckBox />
              Manchester (CMC2) - Morrisons
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              align="justify"
            >
              <SearchTextField type="number" />
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              align="justify"
            >
              <SearchTextField type="time" />
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
              align="justify"
            >
              <SearchTextField type="time" />
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              align="justify"
            >
              <SearchTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">&#8356;</InputAdornment>
                  ),
                }}
              />
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: "normal",
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.blackText,
              }}
              align="justify"
            >
              <SearchTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">&#8356;</InputAdornment>
                  ),
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
