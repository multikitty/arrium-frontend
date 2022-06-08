import * as React from "react"
import Chip from "@mui/material/Chip"
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
import { AvailabilityTableTabType } from "./AvailabilityPage"
import {
  availabilityStatusColorMap,
  availabilityStatusOptions,
  rows,
} from "./AvailabilityPage.data"
import { devices } from "@/constants/device"
import {
  StyledSubscriptionPageInvoicesContainer as StyledAvailabilityTableContainer,
  StyledSubscriptionPageInvoice as StyledAvailabilityTable,
  StyledSubscriptionPageInvoiceHeader as StyledAvailabilityTableHeader,
  StyledSubscriptionPageInvoiceHeaderText as StyledAvailabilityTableHeaderText,
  StyledSubscriptionPageInvoiceHeaderTitle as StyledAvailabilityTableHeaderTitle,
  StyledSubscriptionPageInvoiceItem as StyledAvailabilityTableItem,
  StyledSubscriptionPageInvoiceItemLabel as StyledAvailabilityTableItemLabel,
  StyledSubscriptionPageInvoiceItemsContainer as StyledAvailabilityTableItemsContainer,
  StyledSubscriptionPageInvoiceItemValue as StyledAvailabilityTableItemValue,
} from "../SubscriptionPage/SubscriptionPage.styled"

interface IProps {
  tab: AvailabilityTableTabType
}

const AvailabilityTable: React.FC<IProps> = ({ tab }) => {
  const isWebView = useMediaQuery(devices.web.up)

  return isWebView ? (
    /* // * DESKTOP VIEW */
    <TableContainer>
      <Table aria-label="availability table">
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
            .filter(row => (tab === "all" ? true : row.status === tab))
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  height: "72px",
                  "&:last-child td, &:last-child th": { border: 0 },
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
                  {row.day}
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
                  {row.date}
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
                  {row.time}
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
                  {row.duration}
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
                  &#163;{row.pay}
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
                  <Chip
                    label={availabilityStatusOptions[row.status].label}
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "white",
                      background: availabilityStatusColorMap[row.status],
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    /* // *  MOBILE VIEW */
    <StyledAvailabilityTableContainer>
      {rows
        .filter(row => (tab === "all" ? true : row.status === tab))
        .map(row => (
          <StyledAvailabilityTable key={row.time}>
            <StyledAvailabilityTableHeader>
              <StyledAvailabilityTableHeaderTitle>
                Location
              </StyledAvailabilityTableHeaderTitle>
              <StyledAvailabilityTableHeaderText>
                {row.location}
              </StyledAvailabilityTableHeaderText>
            </StyledAvailabilityTableHeader>
            <StyledAvailabilityTableItemsContainer>
              <StyledAvailabilityTableItem>
                <StyledAvailabilityTableItemLabel>
                  Day
                </StyledAvailabilityTableItemLabel>
                <StyledAvailabilityTableItemValue>
                  {row.day}
                </StyledAvailabilityTableItemValue>
              </StyledAvailabilityTableItem>
              <StyledAvailabilityTableItem>
                <StyledAvailabilityTableItemLabel>
                  Date
                </StyledAvailabilityTableItemLabel>
                <StyledAvailabilityTableItemValue>
                  {row.date}
                </StyledAvailabilityTableItemValue>
              </StyledAvailabilityTableItem>
              <StyledAvailabilityTableItem>
                <StyledAvailabilityTableItemLabel>
                  Time
                </StyledAvailabilityTableItemLabel>
                <StyledAvailabilityTableItemValue>
                  {row.time}
                </StyledAvailabilityTableItemValue>
              </StyledAvailabilityTableItem>
              <StyledAvailabilityTableItem>
                <StyledAvailabilityTableItemLabel>
                  Duration
                </StyledAvailabilityTableItemLabel>
                <StyledAvailabilityTableItemValue>
                  {row.duration}
                </StyledAvailabilityTableItemValue>
              </StyledAvailabilityTableItem>
              <StyledAvailabilityTableItem>
                <StyledAvailabilityTableItemLabel>
                  Pay
                </StyledAvailabilityTableItemLabel>
                <StyledAvailabilityTableItemValue>
                  &#163;{row.pay}
                </StyledAvailabilityTableItemValue>
              </StyledAvailabilityTableItem>
              <StyledAvailabilityTableItem>
                <StyledAvailabilityTableItemLabel>
                  Status
                </StyledAvailabilityTableItemLabel>
                <StyledAvailabilityTableItemValue>
                  <Chip
                    component="span"
                    label={availabilityStatusOptions[row.status].label}
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "white",
                      background: availabilityStatusColorMap[row.status],
                    }}
                  />
                </StyledAvailabilityTableItemValue>
              </StyledAvailabilityTableItem>
            </StyledAvailabilityTableItemsContainer>
          </StyledAvailabilityTable>
        ))}
    </StyledAvailabilityTableContainer>
  )
}

export default AvailabilityTable
