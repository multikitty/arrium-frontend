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
import { useFormContext } from "react-hook-form"
import {
  StyledSubscriptionTabInvoice,
  StyledSubscriptionTabInvoiceHeader,
  StyledSubscriptionTabInvoiceHeaderTitle,
  StyledSubscriptionTabInvoiceItem,
  StyledSubscriptionTabInvoiceItemLabel,
  StyledSubscriptionTabInvoiceItemsContainer,
  StyledSubscriptionTabInvoiceItemValue,
  StyledSubscriptionTabInvoicesContainer as StyledReadOnlySearchTableContainer,
} from "../SubscriptionTab/SubscriptionTab.styled"
import { FormValues } from "./AvailablityPage.types"

const ReadOnlySearchTable = () => {
  const isWebView = useMediaQuery(devices.web.up)
  const { formState, control, ...methods } = useFormContext()

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
          {methods
            .getValues()
            ?.data?.map((data: FormValues["data"][0], index: number) => {
              return (
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
                      fontWeight: 600,
                      fontSize: rem("16px"),
                      lineHeight: rem("20px"),
                      color: theme.palette.blackText,
                    }}
                    scope="row"
                  >
                    {data.location}
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
                    {data.timeToArrive} min
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
                    {data?.startTime !== null
                      ? new Date(data?.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
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
                    {data?.endTime !== null
                      ? new Date(data.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
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
                    {data.minimumPay && <React.Fragment>&#163;</React.Fragment>}
                    {data.minimumPay || "-"}
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
                    {data.minimumHourlyRate && (
                      <React.Fragment>&#163;</React.Fragment>
                    )}
                    {data.minimumHourlyRate || "-"}
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <StyledReadOnlySearchTableContainer>
      {methods
        .getValues()
        ?.data?.map((data: FormValues["data"][0], index: number) => {
          return (
            <StyledSubscriptionTabInvoice key={index}>
              <StyledSubscriptionTabInvoiceHeader>
                <StyledSubscriptionTabInvoiceHeaderTitle>
                  Location
                </StyledSubscriptionTabInvoiceHeaderTitle>
                <StyledSubscriptionTabInvoiceItemValue bold>
                  {data.location}
                </StyledSubscriptionTabInvoiceItemValue>
              </StyledSubscriptionTabInvoiceHeader>
              <StyledSubscriptionTabInvoiceItemsContainer>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Time to arrive
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {data.timeToArrive} min
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Start time
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {data?.startTime !== null
                      ? new Date(data?.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    End time
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {data?.endTime !== null
                      ? new Date(data.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Minimum pay
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {data.minimumPay && <React.Fragment>&#163;</React.Fragment>}
                    {data.minimumPay || "-"}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Minimum hourly rate
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {data.minimumHourlyRate && (
                      <React.Fragment>&#163;</React.Fragment>
                    )}
                    {data.minimumHourlyRate || "-"}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
              </StyledSubscriptionTabInvoiceItemsContainer>
            </StyledSubscriptionTabInvoice>
          )
        })}
    </StyledReadOnlySearchTableContainer>
  )
}

export default ReadOnlySearchTable
