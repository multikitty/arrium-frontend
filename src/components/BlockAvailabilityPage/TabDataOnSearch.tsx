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
  StyledSubscriptionPageInvoicesContainer as TabSearchDataMobile,
} from "../SubscriptionPage/SubscriptionPage.styled"

export const TabDataSearch = (rowsSearches: any[]) => {
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
  ) : (
    <TabSearchDataMobile>
      {rowsSearches.map(row => (
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
                Start time - end time
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                {row.startTimeToEndTime}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
            <StyledSubscriptionPageInvoiceItem>
              <StyledSubscriptionPageInvoiceItemLabel>
                Minimum pay
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                &#163;{row.minPay}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
            <StyledSubscriptionPageInvoiceItem>
              <StyledSubscriptionPageInvoiceItemLabel>
                Minimum hourly rate
              </StyledSubscriptionPageInvoiceItemLabel>
              <StyledSubscriptionPageInvoiceItemValue>
                &#163;{row.minHourlyRate}
              </StyledSubscriptionPageInvoiceItemValue>
            </StyledSubscriptionPageInvoiceItem>
          </StyledSubscriptionPageInvoiceItemsContainer>
        </StyledSubscriptionPageInvoice>
      ))}
    </TabSearchDataMobile>
  )
}
