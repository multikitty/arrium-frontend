import {
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

const BillingTab = () => {
  return (
    <StyledBillingTab>
      <StyledBillingTabUpperContainer>
        <Grid item xs={12} lg={4}>
          <StyledBillingTabUpperContainerItem>
            <StyledBillingTabUpperContainerItemTitle>
              Stripe ID
            </StyledBillingTabUpperContainerItemTitle>
            <StyledBillingTabUpperContainerItemText>
              123456
            </StyledBillingTabUpperContainerItemText>
          </StyledBillingTabUpperContainerItem>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledBillingTabUpperContainerItem>
            <StyledBillingTabUpperContainerItemTitle>
              Currency
            </StyledBillingTabUpperContainerItemTitle>
            <StyledBillingTabUpperContainerItemText>
              &#163;
            </StyledBillingTabUpperContainerItemText>
          </StyledBillingTabUpperContainerItem>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledBillingTabUpperContainerItem>
            <StyledBillingTabUpperContainerItemTitle>
              Currency Code
            </StyledBillingTabUpperContainerItemTitle>
            <StyledBillingTabUpperContainerItemText>
              GBP
            </StyledBillingTabUpperContainerItemText>
          </StyledBillingTabUpperContainerItem>
        </Grid>
      </StyledBillingTabUpperContainer>
      <StyledSubscriptionPageInvoicesContainer billingTab>
        <StyledSubscriptionPageInvoicesHeader>
          Invoices
        </StyledSubscriptionPageInvoicesHeader>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.invoiceId}
                  sx={{
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
                    &#163;{row.amount}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledSubscriptionPageInvoicesContainer>
    </StyledBillingTab>
  )
}

export default BillingTab
