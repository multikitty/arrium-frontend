import React, { useEffect } from "react"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  InputAdornment,
  Box,
} from "@mui/material"
import theme from "../../theme"
import { rem } from "polished"
import { SearchTextField } from "../commons/commonComponents"
import CheckBox from "../commons/CheckBox"
import { StyledWarningTextSmall } from "./BlockAvailabilityPage.styled"
import { SearchTableProps } from "./BlockAvailablityPage.types"

export const SearchTable: React.FC<SearchTableProps> = ({
  error,
  fields,
  setError,
  setFields,
}) => {
  useEffect(() => {
    if (
      Number(fields.timeToArrive) >= 0 &&
      Number(fields.timeToArrive) <= 180
    ) {
      setError(false)
    } else {
      setError(true)
    }
  }, [fields.timeToArrive])

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
              "& td:first-of-type, & th:first-of-type": {
                paddingLeft: rem("16px"),
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
              align="left"
            >
              <Box>
                <SearchTextField
                  placeholder="Type..."
                  value={fields.timeToArrive}
                  onChange={e =>
                    setFields({ ...fields, timeToArrive: e.target.value })
                  }
                  error={error}
                />
                {error && (
                  <StyledWarningTextSmall>
                    Value must be 0 to 180
                  </StyledWarningTextSmall>
                )}
              </Box>
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
              align="left"
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
              align="left"
            >
              <SearchTextField
                placeholder="Type..."
                value={fields.minimunPay}
                onChange={e =>
                  setFields({ ...fields, minimunPay: e.target.value })
                }
                error={error}
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
              align="left"
            >
              <SearchTextField
                placeholder="Type..."
                value={fields.minimunHourlyPay}
                onChange={e =>
                  setFields({ ...fields, minimunHourlyPay: e.target.value })
                }
                error={error}
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
