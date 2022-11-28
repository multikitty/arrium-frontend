import React, { useEffect, useState } from "react"
import Chip from "@mui/material/Chip"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  useMediaQuery,
  Box,
} from "@mui/material"
import theme from "@/theme"
import { rem } from "polished"
import { AvailabilityTableTabType } from "./AvailabilityPage"
import { availabilityStatusColorMap } from "./AvailabilityPage.data"
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
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"
import noResultsImage from "@/assets/images/no-search-results.svg"
import {
  StyledNoSearchResultsText,
  StyledNoSearchResultsTitle,
} from "./AvailabilityPage.styled"
import { useSearchedBlocks } from "@/agent/availability"
import socketIOClient from "socket.io-client"
import currencyCodeToCurrencySymbol from "@/utils/currencyCodeToCurrencySymbol"

interface IProps {
  tab: AvailabilityTableTabType
}

const AvailabilityTable: React.FC<IProps> = ({ tab }) => {
  const isWebView = useMediaQuery(devices.web.up)
  const { userStore } = useStore()
  const { data: searchedBlocksData } = useSearchedBlocks()
  const [rows, setRows] = useState<any[]>([])
  let socket = socketIOClient("https://api.arrium.io/")

  socket.on("block-data-updated", socketData => {
    if (socketData.userPk === userStore.currentUser?.pk) {
      let socketRowData = socketData.data
      setRows(rows => [...socketRowData, ...rows])
    }
  })

  useEffect(() => {
    if (searchedBlocksData?.data !== undefined) {
      setRows(searchedBlocksData?.data)
    }
  }, [searchedBlocksData])

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
            .filter(row => (tab === "all" ? true : row.Status === tab))
            .map((row: any, index) => (
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
                  scope="row"
                >
                  {row.stationName} ({row.stationCode})
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
                  {row.bDay}
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
                  {row.bDate}
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
                  {row.bStartTime} - {row.bEndTime}
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
                  {currencyCodeToCurrencySymbol(row?.currency)}
                  {row.price}
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
                    label={[row.Status]}
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "white",
                      background: availabilityStatusColorMap[row.Status],
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {rows.length || (
        <Box
          display="flex"
          flexDirection="column"
          my={6}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <img src={noResultsImage} />
          <StyledNoSearchResultsTitle>
            No search results
          </StyledNoSearchResultsTitle>
          <StyledNoSearchResultsText>
            Set up search preferences and press <strong>Start Searching</strong>{" "}
            button
          </StyledNoSearchResultsText>
        </Box>
      )}
    </TableContainer>
  ) : (
    /* // *  MOBILE VIEW */
    <React.Fragment>
      <StyledAvailabilityTableContainer>
        {rows
          .filter(row => (tab === "all" ? true : row.Status === tab))
          .map((row: any) => (
            <StyledAvailabilityTable key={row.bStartTime}>
              <StyledAvailabilityTableHeader>
                <StyledAvailabilityTableHeaderTitle>
                  Location
                </StyledAvailabilityTableHeaderTitle>
                <StyledAvailabilityTableHeaderText>
                  {row.stationName} ({row.stationCode})
                </StyledAvailabilityTableHeaderText>
              </StyledAvailabilityTableHeader>
              <StyledAvailabilityTableItemsContainer>
                <StyledAvailabilityTableItem>
                  <StyledAvailabilityTableItemLabel>
                    Day
                  </StyledAvailabilityTableItemLabel>
                  <StyledAvailabilityTableItemValue>
                    {row.bDay}
                  </StyledAvailabilityTableItemValue>
                </StyledAvailabilityTableItem>
                <StyledAvailabilityTableItem>
                  <StyledAvailabilityTableItemLabel>
                    Date
                  </StyledAvailabilityTableItemLabel>
                  <StyledAvailabilityTableItemValue>
                    {row.bDate}
                  </StyledAvailabilityTableItemValue>
                </StyledAvailabilityTableItem>
                <StyledAvailabilityTableItem>
                  <StyledAvailabilityTableItemLabel>
                    Time
                  </StyledAvailabilityTableItemLabel>
                  <StyledAvailabilityTableItemValue>
                    {row.bStartTime} - {row.bEndTime}
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
                    {currencyCodeToCurrencySymbol(row?.currency)}
                    {row.price}
                  </StyledAvailabilityTableItemValue>
                </StyledAvailabilityTableItem>
                <StyledAvailabilityTableItem>
                  <StyledAvailabilityTableItemLabel>
                    Status
                  </StyledAvailabilityTableItemLabel>
                  <StyledAvailabilityTableItemValue>
                    <Chip
                      component="span"
                      label={[row.Status]}
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                        color: "white",
                        background: availabilityStatusColorMap[row.Status],
                      }}
                    />
                  </StyledAvailabilityTableItemValue>
                </StyledAvailabilityTableItem>
              </StyledAvailabilityTableItemsContainer>
            </StyledAvailabilityTable>
          ))}
      </StyledAvailabilityTableContainer>
      {rows.length || (
        <Box
          display="flex"
          flexDirection="column"
          my={6}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <img src={noResultsImage} />
          <StyledNoSearchResultsTitle>
            No search results
          </StyledNoSearchResultsTitle>
          <StyledNoSearchResultsText>
            Set up search preferences and press <strong>Start Searching</strong>{" "}
            button
          </StyledNoSearchResultsText>
        </Box>
      )}
    </React.Fragment>
  )
}

export default observer(AvailabilityTable)
