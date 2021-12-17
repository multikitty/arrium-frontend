import React from "react"
import { rem } from "polished"
import theme from "../../theme"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import {
  StyledSubscriptionPage,
  StyledSubscriptionPageDetailsActionsSection,
  StyledSubscriptionPageDetailsContainer,
  StyledSubscriptionPageDetailsNextPaymentSection,
  StyledSubscriptionPageDetailsNextPaymentSectionText,
  StyledSubscriptionPageDetailsNextPaymentSectionTitle,
  StyledSubscriptionPageDetailsPriceSection,
  StyledSubscriptionPageDetailsPriceSectionText,
  StyledSubscriptionPageDetailsPriceSectionTitle,
  StyledSubscriptionPageHeader,
  StyledSubscriptionPageInvoicesContainer,
  StyledSubscriptionPageInvoicesHeader,
} from "./SubscriptionPage.styled"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

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

const SubscriptionPage = () => {
  return (
    <StyledSubscriptionPage>
      <StyledSubscriptionPageHeader>Subscription</StyledSubscriptionPageHeader>
      <StyledSubscriptionPageDetailsContainer>
        <StyledSubscriptionPageDetailsNextPaymentSection>
          <StyledSubscriptionPageDetailsNextPaymentSectionTitle>
            Your next payment in:
          </StyledSubscriptionPageDetailsNextPaymentSectionTitle>
          <StyledSubscriptionPageDetailsNextPaymentSectionText>
            15 days
          </StyledSubscriptionPageDetailsNextPaymentSectionText>
        </StyledSubscriptionPageDetailsNextPaymentSection>
        <StyledSubscriptionPageDetailsPriceSection>
          <StyledSubscriptionPageDetailsPriceSectionTitle>
            Price:
          </StyledSubscriptionPageDetailsPriceSectionTitle>
          <StyledSubscriptionPageDetailsPriceSectionText>
            &#163;15.50
          </StyledSubscriptionPageDetailsPriceSectionText>
        </StyledSubscriptionPageDetailsPriceSection>
        <StyledSubscriptionPageDetailsActionsSection>
          <OutlinedButton
            sx={{
              whiteSpace: "nowrap",
              color: theme.palette.grey7,
              borderColor: theme.palette.grey3,
              mr: rem("16px"),
            }}
          >
            Setup Direct Debit
          </OutlinedButton>
          <ContainedButton sx={{ whiteSpace: "nowrap" }}>
            Pay now
          </ContainedButton>
        </StyledSubscriptionPageDetailsActionsSection>
      </StyledSubscriptionPageDetailsContainer>
      <StyledSubscriptionPageInvoicesContainer>
        <StyledSubscriptionPageInvoicesHeader>
          Invoices
        </StyledSubscriptionPageInvoicesHeader>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", borderRadius: rem("20px") }}
        >
          <Table
            sx={{ minWidth: 650, bgcolor: theme.palette.grey1 }}
            aria-label="invoices table"
          >
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
                    "& td:first-child, & th:first-child": {
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
                      <ContainedButton sx={{ whiteSpace: "nowrap" }}>
                        Pay Now
                      </ContainedButton>
                    ) : (
                      <OutlinedButton
                        sx={{
                          whiteSpace: "nowrap",
                          color: theme.palette.grey7,
                          borderColor: theme.palette.grey3,
                        }}
                      >
                        View Invoice
                      </OutlinedButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledSubscriptionPageInvoicesContainer>
    </StyledSubscriptionPage>
  )
}

export default SubscriptionPage