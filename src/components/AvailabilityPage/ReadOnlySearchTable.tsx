import React from "react"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  useMediaQuery,
} from "@mui/material"
import theme from "@/theme"
import { rem } from "polished"
import { devices } from "@/constants/device"
import {
  StyledSubscriptionPageInvoice,
  StyledSubscriptionPageInvoiceHeader,
  StyledSubscriptionPageInvoiceHeaderTitle,
  StyledSubscriptionPageInvoiceItem,
  StyledSubscriptionPageInvoiceItemLabel,
  StyledSubscriptionPageInvoiceItemsContainer,
  StyledSubscriptionPageInvoiceItemValue,
  StyledSubscriptionPageInvoicesContainer as StyledReadOnlySearchTableContainer,
} from "../SubscriptionPage/SubscriptionPage.styled"
import { rowSearches } from "./AvailabilityPage.data"

const ReadOnlySearchTable = () => {
  const isWebView = useMediaQuery(devices.web.up)

  return isWebView ? (
    <TableContainer>
      <Table>
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
          {rowSearches.map(row => (
            <TableRow
              key={row.location}
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
                {row.startTime || "-"}
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
                {row.endTime || "-"}
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
                {row.minPay && <React.Fragment>&#163;</React.Fragment>}
                {row.minPay || "-"}
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
                {row.minHourlyRate && <React.Fragment>&#163;</React.Fragment>}
                {row.minHourlyRate || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <StyledReadOnlySearchTableContainer>
      {rowSearches.map(row => (
        <StyledSubscriptionPageInvoice key={row.location}>
          <StyledSubscriptionPageInvoiceHeader>
            <StyledSubscriptionPageInvoiceHeaderTitle>
              Location
            </StyledSubscriptionPageInvoiceHeaderTitle>
            <StyledSubscriptionPageInvoiceItemValue bold>
              {row.location}
            </StyledSubscriptionPageInvoiceItemValue>
          </StyledSubscriptionPageInvoiceHeader>
          <StyledSubscriptionPageInvoiceItemsContainer>
            <StyledSubscriptionPageInvoiceItem>
              <StyledSubscriptionPageInvoiceItemLabel>
                Time to arrive
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                {row.timeToArrive}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
            <StyledSubscriptionPageInvoiceItem>
              <StyledSubscriptionPageInvoiceItemLabel>
                Start time
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                {row.startTime || "-"}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
            <StyledSubscriptionPageInvoiceItem>
              <StyledSubscriptionPageInvoiceItemLabel>
                End time
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                {row.endTime || "-"}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
            <StyledSubscriptionPageInvoiceItem>
              <StyledSubscriptionPageInvoiceItemLabel>
                Minimum pay
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                {row.minPay && <React.Fragment>&#163;</React.Fragment>}
                {row.minPay || "-"}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
            <StyledSubscriptionPageInvoiceItem>
              <StyledSubscriptionPageInvoiceItemLabel>
                Minimum hourly rate
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                {row.minHourlyRate && <React.Fragment>&#163;</React.Fragment>}
                {row.minHourlyRate || "-"}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
          </StyledSubscriptionPageInvoiceItemsContainer>
        </StyledSubscriptionPageInvoice>
      ))}
    </StyledReadOnlySearchTableContainer>
  )
}

export default ReadOnlySearchTable
