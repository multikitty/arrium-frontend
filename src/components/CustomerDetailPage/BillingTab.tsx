import {
  Box,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { rem } from "polished"
import React from "react"
import theme from "@/theme"
import {
  StyledSubscriptionPageInvoicesContainer,
  StyledSubscriptionPageInvoicesHeader,
} from "../SubscriptionPage/SubscriptionPage.styled"
import {
  StyledBillingTab,
  StyledBillingTabUpperContainer,
  StyledBillingTabUpperContainerItem,
  StyledBillingTabUpperContainerItemText,
  StyledBillingTabUpperContainerItemTitle,
} from "./CustomerDetailPage.styled"
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"
import { useInvoicesByAdmin } from "@/agent/stripe"
import LoadingScreen from "../LoadingScreen"
import { capitalCase } from "change-case"
import getSymbolFromCurrency from "currency-symbol-map"
import {
  StyledNoSearchResultsText as StyledNoInvoicesText,
  StyledNoSearchResultsTitle as StyledNoInvoicesTitle,
} from "../AvailabilityPage/AvailabilityPage.styled"

const NoInvoices = () => (
  <Box
    display="flex"
    flexDirection="column"
    my={6}
    width="100%"
    justifyContent="center"
    alignItems="center"
  >
    <StyledNoInvoicesTitle>No invoices to show</StyledNoInvoicesTitle>
    <StyledNoInvoicesText>
      There is no billing data, so far.
    </StyledNoInvoicesText>
  </Box>
)

interface IBillingTabProps {
  sk: string
  pk: string
}

const BillingTab: React.FC<IBillingTabProps> = ({ pk, sk }) => {
  const { userStore } = useStore()
  const { data: stripeData, isLoading } = useInvoicesByAdmin({
    pk,
    sk,
  })

  if (isLoading) return <LoadingScreen />
  if (!stripeData) return <NoInvoices />

  const stripeId = stripeData.invoices.invoices_data[0].stripe_id
  const currencyCode =
    userStore.currencyCode ||
    stripeData.invoices.invoices.data[0].currency.toUpperCase()
  const currencySymbol =
    userStore.currencySymbol || getSymbolFromCurrency(currencyCode)

  return (
    <StyledBillingTab>
      <StyledBillingTabUpperContainer>
        <Grid item xs={12} lg={4}>
          <StyledBillingTabUpperContainerItem>
            <StyledBillingTabUpperContainerItemTitle>
              Stripe ID
            </StyledBillingTabUpperContainerItemTitle>
            <StyledBillingTabUpperContainerItemText>
              {stripeId}
            </StyledBillingTabUpperContainerItemText>
          </StyledBillingTabUpperContainerItem>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledBillingTabUpperContainerItem>
            <StyledBillingTabUpperContainerItemTitle>
              Currency
            </StyledBillingTabUpperContainerItemTitle>
            <StyledBillingTabUpperContainerItemText>
              {currencySymbol}
            </StyledBillingTabUpperContainerItemText>
          </StyledBillingTabUpperContainerItem>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledBillingTabUpperContainerItem>
            <StyledBillingTabUpperContainerItemTitle>
              Currency Code
            </StyledBillingTabUpperContainerItemTitle>
            <StyledBillingTabUpperContainerItemText>
              {currencyCode}
            </StyledBillingTabUpperContainerItemText>
          </StyledBillingTabUpperContainerItem>
        </Grid>
      </StyledBillingTabUpperContainer>
      <Divider />
      <StyledSubscriptionPageInvoicesContainer billingTab>
        <StyledSubscriptionPageInvoicesHeader>
          Invoices
        </StyledSubscriptionPageInvoicesHeader>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="invoices table">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {stripeData.invoices.invoices_data.map(invoice => (
                <TableRow
                  key={invoice.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    size="medium"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      fontSize: rem("16px"),
                      lineHeight: rem("20px"),
                      color: theme.palette.blackText,
                      paddingLeft: rem("32px"),
                    }}
                    scope="row"
                  >
                    {invoice.invoice_no}
                  </TableCell>
                  <TableCell
                    size="medium"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      fontSize: rem("16px"),
                      lineHeight: rem("20px"),
                      color: theme.palette.blackText,
                    }}
                    align="left"
                  >
                    {invoice.description}
                  </TableCell>
                  <TableCell
                    size="medium"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: rem("16px"),
                      lineHeight: rem("20px"),
                      color: theme.palette.blackText,
                    }}
                    align="left"
                  >
                    {currencySymbol}
                    {invoice.amount_due}
                  </TableCell>
                  <TableCell
                    size="medium"
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
                    {capitalCase(invoice.paid_status)}
                  </TableCell>
                  <TableCell
                    size="medium"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      fontSize: rem("16px"),
                      lineHeight: rem("20px"),
                      color: theme.palette.blackText,
                    }}
                    align="left"
                  >
                    {invoice.due_date}
                  </TableCell>
                  <TableCell
                    size="medium"
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      fontSize: rem("16px"),
                      lineHeight: rem("20px"),
                      color: theme.palette.blackText,
                    }}
                    align="left"
                  >
                    {invoice.paid_at}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledSubscriptionPageInvoicesContainer>
    </StyledBillingTab>
  )
}

export default observer(BillingTab)
