import React from "react"
import { rem } from "polished"
import theme from "@/theme"
import { ContainedButton } from "../commons/Button"
import {
  StyledSubscriptionTab,
  StyledSubscriptionTabDetailsActionsSection,
  StyledSubscriptionTabDetailsContainer,
  StyledSubscriptionTabDetailsNextPaymentSection,
  StyledSubscriptionTabDetailsNextPaymentSectionText,
  StyledSubscriptionTabDetailsNextPaymentSectionTitle,
  StyledSubscriptionTabDetailsPriceSection,
  StyledSubscriptionTabDetailsPriceSectionText,
  StyledSubscriptionTabDetailsPriceSectionTitle,
  StyledSubscriptionTabInvoice,
  StyledSubscriptionTabInvoiceHeader,
  StyledSubscriptionTabInvoiceHeaderText,
  StyledSubscriptionTabInvoiceHeaderTitle,
  StyledSubscriptionTabInvoiceItem,
  StyledSubscriptionTabInvoiceItemLabel,
  StyledSubscriptionTabInvoiceItemsContainer,
  StyledSubscriptionTabInvoiceItemValue,
  StyledSubscriptionTabInvoicesContainer,
  StyledSubscriptionTabInvoicesHeader,
  StyledSubscriptionTabInvoiceTableContainedButton,
  StyledSubscriptionTabInvoiceTableOutlinedButton,
} from "./SubscriptionTab.styled"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { devices } from "@/constants/device"
import { Box, useMediaQuery } from "@mui/material"
import { capitalCase } from "change-case"
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"
import { IPageProps } from "@/lib/interfaces/common"
import getCurrencySymbolByCountryCode, {
  CountryCodes,
} from "@/utils/getCurrencySymbolByCountryCode"
import { DEFAULT_CURRENCY_SYMBOL } from "@/constants/common"

function createData(
  invoiceId: string,
  plan: string,
  amount: number,
  invoiceStatus: "pending" | "overdue" | "paid",
  dueDate: string,
  paymentDate: string
) {
  return { invoiceId, plan, amount, invoiceStatus, dueDate, paymentDate }
}

const rows = [
  createData("12345", "Plan name 3", 10, "overdue", "Sep 23, 2021", ""),
  createData(
    "67890",
    "Plan name 2",
    10,
    "paid",
    "Aug 23, 2021",
    "Aug 21, 2021"
  ),
  createData("09876", "Plan name 1", 8, "paid", "", "Jun 23, 2021"),
]

interface ISubscriptionTabProps extends IPageProps {}

const SubscriptionTab: React.FC<ISubscriptionTabProps> = ({ country_code }) => {
  const isDesktopView = useMediaQuery(devices.desktop.up)
  const { userStore } = useStore()

  const currencySymbol =
    getCurrencySymbolByCountryCode(country_code as CountryCodes) ||
    userStore.currencySymbol ||
    DEFAULT_CURRENCY_SYMBOL

  return (
    <StyledSubscriptionTab>
      <StyledSubscriptionTabDetailsContainer>
        <StyledSubscriptionTabDetailsNextPaymentSection>
          <StyledSubscriptionTabDetailsNextPaymentSectionTitle>
            Your next payment in:
          </StyledSubscriptionTabDetailsNextPaymentSectionTitle>
          <StyledSubscriptionTabDetailsNextPaymentSectionText>
            15 days
          </StyledSubscriptionTabDetailsNextPaymentSectionText>
        </StyledSubscriptionTabDetailsNextPaymentSection>
        <StyledSubscriptionTabDetailsPriceSection>
          <StyledSubscriptionTabDetailsPriceSectionTitle>
            Price:
          </StyledSubscriptionTabDetailsPriceSectionTitle>
          <StyledSubscriptionTabDetailsPriceSectionText>
            {currencySymbol}
            15.50
          </StyledSubscriptionTabDetailsPriceSectionText>
        </StyledSubscriptionTabDetailsPriceSection>
        <StyledSubscriptionTabDetailsActionsSection>
          <ContainedButton
            sx={{
              whiteSpace: "nowrap",
              mr: !isDesktopView ? 0 : rem("16px"),
              mb: isDesktopView ? 0 : rem("16px"),
            }}
          >
            Pay now
          </ContainedButton>
          <ContainedButton sx={{ whiteSpace: "nowrap" }}>
            Pay with Crypto
          </ContainedButton>
        </StyledSubscriptionTabDetailsActionsSection>
      </StyledSubscriptionTabDetailsContainer>
      {isDesktopView ? (
        <StyledSubscriptionTabInvoicesContainer>
          <StyledSubscriptionTabInvoicesHeader>
            Invoices
          </StyledSubscriptionTabInvoicesHeader>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", borderRadius: rem("20px") }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="invoices table">
              <TableHead>
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
                    Invoice ID
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
                    Plan
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
                    Amount
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
                    Invoice status
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
                    Due date
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
                    Payment date
                  </TableCell>
                  <TableCell
                    sx={{ color: theme.palette.grey6 }}
                    align="left"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    key={row.invoiceId}
                    sx={{
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
                        paddingRight: 12,
                      }}
                      scope="row"
                      align="center"
                    >
                      {row.invoiceId}
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
                      {row.plan}
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
                      {userStore.currencySymbol}
                      {row.amount}
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
                      {row.invoiceStatus}
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
                      {row.dueDate}
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
                      {row.paymentDate}
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
                      {row.invoiceStatus === "overdue" ? (
                        <Box display="flex" flexDirection="column">
                          <StyledSubscriptionTabInvoiceTableContainedButton
                            fullWidth
                            sx={{ mb: rem("16px") }}
                          >
                            Pay by Card
                          </StyledSubscriptionTabInvoiceTableContainedButton>
                          <StyledSubscriptionTabInvoiceTableContainedButton
                            fullWidth
                          >
                            Pay with Crypto
                          </StyledSubscriptionTabInvoiceTableContainedButton>
                        </Box>
                      ) : (
                        <StyledSubscriptionTabInvoiceTableOutlinedButton
                          fullWidth
                        >
                          View Invoice
                        </StyledSubscriptionTabInvoiceTableOutlinedButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledSubscriptionTabInvoicesContainer>
      ) : (
        <StyledSubscriptionTabInvoicesContainer>
          <StyledSubscriptionTabInvoicesHeader>
            Invoices
          </StyledSubscriptionTabInvoicesHeader>
          {rows.map(row => (
            <StyledSubscriptionTabInvoice key={row.invoiceId}>
              <StyledSubscriptionTabInvoiceHeader>
                <StyledSubscriptionTabInvoiceHeaderTitle>
                  Invoice ID
                </StyledSubscriptionTabInvoiceHeaderTitle>
                <StyledSubscriptionTabInvoiceHeaderText>
                  {row.invoiceId}
                </StyledSubscriptionTabInvoiceHeaderText>
              </StyledSubscriptionTabInvoiceHeader>
              <StyledSubscriptionTabInvoiceItemsContainer>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Amount
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue bold>
                    {userStore.currencySymbol}
                    {row.amount}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Plan
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {row.plan}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Invoice status
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {capitalCase(row.invoiceStatus)}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Due date
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {row.dueDate}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItemLabel>
                    Payment date
                  </StyledSubscriptionTabInvoiceItemLabel>
                  <StyledSubscriptionTabInvoiceItemValue>
                    {row.paymentDate}
                  </StyledSubscriptionTabInvoiceItemValue>
                </StyledSubscriptionTabInvoiceItem>
                <Box width="100%" display="flex">
                  {row.invoiceStatus === "overdue" ? (
                    <Box display="flex" flexDirection="column" width="100%">
                      <ContainedButton
                        sx={{
                          whiteSpace: "nowrap",
                          mb: rem("16px"),
                        }}
                      >
                        Pay with Card
                      </ContainedButton>
                      <ContainedButton sx={{ whiteSpace: "nowrap" }}>
                        Pay with Crypto
                      </ContainedButton>
                    </Box>
                  ) : (
                    <StyledSubscriptionTabInvoiceTableOutlinedButton fullWidth>
                      View Invoice
                    </StyledSubscriptionTabInvoiceTableOutlinedButton>
                  )}
                </Box>
              </StyledSubscriptionTabInvoiceItemsContainer>
            </StyledSubscriptionTabInvoice>
          ))}
        </StyledSubscriptionTabInvoicesContainer>
      )}
    </StyledSubscriptionTab>
  )
}

export default observer(SubscriptionTab)
