import React from "react"
import Chip from "@mui/material/Chip"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material"
import theme from "@/theme"
import { rem } from "polished"

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
          .map((row, index) => (
            <TableRow
              key={index}
              sx={{
                height: "72px",
                "&:last-child td, &:last-child th": { border: 0 },
                "& td:first-of-type, & th:first-of-type": {
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
