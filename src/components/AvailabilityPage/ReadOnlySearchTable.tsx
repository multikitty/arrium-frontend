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
  StyledSubscriptionPageInvoice,
  StyledSubscriptionPageInvoiceHeader,
  StyledSubscriptionPageInvoiceHeaderTitle,
  StyledSubscriptionPageInvoiceItem,
  StyledSubscriptionPageInvoiceItemLabel,
  StyledSubscriptionPageInvoiceItemsContainer,
  StyledSubscriptionPageInvoiceItemValue,
  StyledSubscriptionPageInvoicesContainer as StyledReadOnlySearchTableContainer,
} from "../SubscriptionPage/SubscriptionPage.styled"
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
          {
            methods.getValues()?.data?.map((data: FormValues["data"][0], index: number) => {
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
                  {new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                  {new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })  || "-"}
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
                  {data.minimumHourlyRate && <React.Fragment>&#163;</React.Fragment>}
                  {data.minimumHourlyRate || "-"}
                </TableCell>
                </TableRow>      
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <StyledReadOnlySearchTableContainer>
      {
        methods.getValues()?.data?.map((data: FormValues["data"][0], index: number) => {  
          return (
            <StyledSubscriptionPageInvoice key={index}>
              <StyledSubscriptionPageInvoiceHeader>
                <StyledSubscriptionPageInvoiceHeaderTitle>
                  Location
                </StyledSubscriptionPageInvoiceHeaderTitle>
                <StyledSubscriptionPageInvoiceItemValue bold>
                  {data.location}
                </StyledSubscriptionPageInvoiceItemValue>
              </StyledSubscriptionPageInvoiceHeader>
              <StyledSubscriptionPageInvoiceItemsContainer>
                <StyledSubscriptionPageInvoiceItem>
                  <StyledSubscriptionPageInvoiceItemLabel>
                    Time to arrive
                  </StyledSubscriptionPageInvoiceItemLabel>
                  <StyledSubscriptionPageInvoiceItemValue>
                    {data.timeToArrive} min
                  </StyledSubscriptionPageInvoiceItemValue>
                </StyledSubscriptionPageInvoiceItem>
                <StyledSubscriptionPageInvoiceItem>
                  <StyledSubscriptionPageInvoiceItemLabel>
                    Start time
                  </StyledSubscriptionPageInvoiceItemLabel>
                  <StyledSubscriptionPageInvoiceItemValue>
                    {new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "-"}
                  </StyledSubscriptionPageInvoiceItemValue>
                </StyledSubscriptionPageInvoiceItem>
                <StyledSubscriptionPageInvoiceItem>
                  <StyledSubscriptionPageInvoiceItemLabel>
                    End time
                  </StyledSubscriptionPageInvoiceItemLabel>
                  <StyledSubscriptionPageInvoiceItemValue>
                    {new Date(data.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })  || "-"}
                  </StyledSubscriptionPageInvoiceItemValue>
                </StyledSubscriptionPageInvoiceItem>
                <StyledSubscriptionPageInvoiceItem>
                  <StyledSubscriptionPageInvoiceItemLabel>
                    Minimum pay
                  </StyledSubscriptionPageInvoiceItemLabel>
                  <StyledSubscriptionPageInvoiceItemValue>
                    {data.minimumPay && <React.Fragment>&#163;</React.Fragment>}
                    {data.minimumPay || "-"}
                  </StyledSubscriptionPageInvoiceItemValue>
                </StyledSubscriptionPageInvoiceItem>
                <StyledSubscriptionPageInvoiceItem>
                  <StyledSubscriptionPageInvoiceItemLabel>
                    Minimum hourly rate
                  </StyledSubscriptionPageInvoiceItemLabel>
                  <StyledSubscriptionPageInvoiceItemValue>
                    {data.minimumHourlyRate && <React.Fragment>&#163;</React.Fragment>}
                    {data.minimumHourlyRate || "-"}
                  </StyledSubscriptionPageInvoiceItemValue>
                </StyledSubscriptionPageInvoiceItem>
              </StyledSubscriptionPageInvoiceItemsContainer>
            </StyledSubscriptionPageInvoice>
          )
        })
      }
    </StyledReadOnlySearchTableContainer>
  )
}

export default ReadOnlySearchTable
