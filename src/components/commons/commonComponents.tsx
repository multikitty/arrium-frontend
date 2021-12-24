import { Box, Button, TextField } from "@mui/material"
import { rem } from "polished"
import styled, { css } from "styled-components"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material"
import theme from "../../theme"
import Chip from "@mui/material/Chip"
import * as React from "react"
import CheckBox from "./CheckBox"

export const StyledInputField = styled(TextField)<{ mb?: string }>`
  &&& {
    background-color: #ffffff;
    width: 100%;
    height: ${rem("48px")};
    border: none;
    outline: none;
    ${p =>
      p.mb
        ? css`
            margin-bottom: ${p.mb};
          `
        : css`
            margin-bottom: ${rem("16px")};
          `};
    border-radius: ${rem("10px")};

    & > .MuiOutlinedInput-root {
      max-width: ${rem("378px")};
      height: ${rem("48px")};
      min-width: ${rem("250px")};
      border-radius: ${rem("10px")};
    }
  }
`
export const StyledTitle = styled.p`
  font-weight: 700;
  font-size: ${rem("34px")};
  color: #2453b2;
  line-height: ${rem("32px")};
  letter-spacing: 1.6px;
  margin-top: ${rem("80px")};
  margin-bottom: ${rem("118px")};
  text-transform: uppercase;
`
export const StyledLoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${rem("20px")};
  background-color: #f2f3f7;
  padding: ${rem("40px")};
  width: ${rem("458px")};
`
export const StyledLoginText = styled.h4`
  font-size: ${rem("28px")};
  font-weight: 400;
  text-align: center;
  color: #0a0a0a;
  padding: 0 ${rem("40px")} ${rem("40px")} ${rem("40px")};
  line-height: ${rem("32px")};
`
export const StyledRemeberMeText = styled.label`
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  color: #888a95;
`
export const StyledCheckBox = styled.input`
  margin-right: ${rem("8px")};
  width: ${rem("16px")};
  height: ${rem("16px")};
`
export const StyledForgotPassword = styled(Box)`
  cursor: pointer;
  font-weight: 500;
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
  & > a {
    color: #888a95;
    text-decoration: none;
  }
`
export const StyledButton = styled(Button)<{ margintop?: string }>`
  &&& {
    color: white;
    text-transform: none;
    border-radius: 10px;
    padding: ${rem("14px")} ${rem("28px")};
    margin-top: ${p => p.margintop};
    & > a {
      color: #ffffff;
      text-decoration: none;
    }
  }
`
export const StyledButtonText = styled.h5`
  font-size: ${rem("16px")};
  font-weight: 500;
  line-height: ${rem("20px")};
  width: 100%;
`
export const StyledSignUpText = styled.h5`
  margin-top: ${rem("16px")};
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("20px")};
  color: #888a95;
`

export const StyledSignUpButton = styled.span`
  font-size: ${rem("16px")};
  font-weight: 600;
  color: #0a0a0a;
  line-height: ${rem("20px")};
  & > a {
    color: #0a0a0a;
    text-decoration: none;
  }
`
export const StyledInstructionsText = styled.p`
  font-size: ${rem("16px")};
  font-weight: 400;
  line-height: ${rem("24px")};
  margin-bottom: ${rem("16px")};
  text-align: center;
`
export const StyledTitleMobile = styled.div`
  font-weight: 800;
  font-size: ${rem("24px")};
  color: #2453b2;
  text-align: center;
  line-height: ${rem("32px")};
  letter-spacing: 1.6px;
  text-transform: uppercase;
  margin: ${rem("16px")} auto ${rem("16px")} ${rem("20px")};
`

export const StyledLoginContainerMobile = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  background-color: #f2f3f7;
  width: 100%;
  min-width: ${rem("300px")};
  min-height: 92vh;
  padding: ${rem("20px")};
`
export const StyledWarningText = styled.p<{
  marginbottom?: string
  marginTop?: string
}>`
  color: #f25555;
  font-size: ${rem("16px")};
  font-weight: 500;
  line-height: ${rem("20px")};
  margin-bottom: ${p => p.marginbottom};
  margin-top: ${p => p.marginTop};
`

export const SearchTextField = styled(TextField)`
  &&& {
    width: ${rem("130px")};
    & > div > input {
      padding: ${rem("8px")};
      height: ${rem("24px")};
    }
  }
`

export const TabData = (rows: any[], status: string) => (
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

export const SearchTable = () => (
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
            <SearchTextField />
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
            <SearchTextField />
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
            <SearchTextField />
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
            <SearchTextField />
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
            <SearchTextField />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
)
