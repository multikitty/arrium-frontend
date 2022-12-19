import * as React from "react"
import { rem } from "polished"
import theme from "@/theme"
import { ContainedButton, OutlinedButton } from "../commons/Button"
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
import { useInvoicesByDriver } from "@/agent/stripe"
import LoadingScreen from "../LoadingScreen"
import PaginationButton from "../commons/Button/PaginationButton"
import useFeatureFlags from "@/hooks/useFeatureFlags"

interface ISubscriptionTabProps extends IPageProps {}

const SubscriptionTab: React.FC<ISubscriptionTabProps> = ({ country_code }) => {
  const isDesktopView = useMediaQuery(devices.desktop.up)
  const [startAfter, setStartAfter] = React.useState("")
  const { userStore } = useStore()
  const { data: invoicesData, isLoading } = useInvoicesByDriver({
    start_after: startAfter,
  })
  const flags = useFeatureFlags()

  const currencySymbol =
    getCurrencySymbolByCountryCode(country_code as CountryCodes) ||
    userStore.currencySymbol ||
    DEFAULT_CURRENCY_SYMBOL

  if (isLoading) return <LoadingScreen />
  if (!invoicesData?.data || invoicesData?.data?.length === 0) return null

  return (
    <StyledSubscriptionTab>
      {flags.FEATURE_SUBSCRIPTION_SUMMARY && (
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
              fullWidth={!isDesktopView}
              sx={{
                whiteSpace: "nowrap",
                mr: flags.FEATURE_PAY_WITH_CRYPTO_BUTTON
                  ? isDesktopView
                    ? rem("16px")
                    : 0
                  : 0,
                mb: isDesktopView ? 0 : rem("16px"),
                maxWidth: rem("375px"),
              }}
            >
              Pay now
            </ContainedButton>
            {flags.FEATURE_PAY_WITH_CRYPTO_BUTTON && (
              <ContainedButton
                fullWidth={!isDesktopView}
                sx={{ whiteSpace: "nowrap", maxWidth: rem("375px") }}
              >
                Pay with Crypto
              </ContainedButton>
            )}
          </StyledSubscriptionTabDetailsActionsSection>
        </StyledSubscriptionTabDetailsContainer>
      )}
      <Box mt={flags.FEATURE_SUBSCRIPTION_SUMMARY ? undefined : 1}>
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
                  {invoicesData.data.map(row => (
                    <TableRow
                      key={row.id}
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
                        {row.invoice_no}
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
                        {row.description}
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
                        {currencySymbol}
                        {row.amount_due}
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
                        {capitalCase(row.paid_status)}
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
                        {row.due_date}
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
                        {row.paid_at}
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
                        {row.paid_status === "overdue" ||
                        row.paid_status === "due" ? (
                          <Box display="flex" flexDirection="column">
                            <StyledSubscriptionTabInvoiceTableContainedButton
                              fullWidth
                              sx={{
                                mb: flags.FEATURE_PAY_WITH_CRYPTO_BUTTON
                                  ? rem("16px")
                                  : 0,
                              }}
                            >
                              Pay by Card
                            </StyledSubscriptionTabInvoiceTableContainedButton>
                            {flags.FEATURE_PAY_WITH_CRYPTO_BUTTON && (
                              <StyledSubscriptionTabInvoiceTableContainedButton
                                fullWidth
                              >
                                Pay with Crypto
                              </StyledSubscriptionTabInvoiceTableContainedButton>
                            )}
                          </Box>
                        ) : (
                          <StyledSubscriptionTabInvoiceTableOutlinedButton
                            fullWidth
                            onClick={() =>
                              window.open(row.invoice_url, "_blank")
                            }
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
            {invoicesData.data.map(row => (
              <StyledSubscriptionTabInvoice key={row.id}>
                <StyledSubscriptionTabInvoiceHeader>
                  <StyledSubscriptionTabInvoiceHeaderTitle>
                    Invoice ID
                  </StyledSubscriptionTabInvoiceHeaderTitle>
                  <StyledSubscriptionTabInvoiceHeaderText>
                    {row.invoice_no}
                  </StyledSubscriptionTabInvoiceHeaderText>
                </StyledSubscriptionTabInvoiceHeader>
                <StyledSubscriptionTabInvoiceItemsContainer>
                  <StyledSubscriptionTabInvoiceItem>
                    <StyledSubscriptionTabInvoiceItemLabel>
                      Amount
                    </StyledSubscriptionTabInvoiceItemLabel>
                    <StyledSubscriptionTabInvoiceItemValue bold>
                      {currencySymbol}
                      {row.amount_due}
                    </StyledSubscriptionTabInvoiceItemValue>
                  </StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItem>
                    <StyledSubscriptionTabInvoiceItemLabel>
                      Plan
                    </StyledSubscriptionTabInvoiceItemLabel>
                    <StyledSubscriptionTabInvoiceItemValue>
                      {row.description}
                    </StyledSubscriptionTabInvoiceItemValue>
                  </StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItem>
                    <StyledSubscriptionTabInvoiceItemLabel>
                      Invoice status
                    </StyledSubscriptionTabInvoiceItemLabel>
                    <StyledSubscriptionTabInvoiceItemValue>
                      {capitalCase(row.paid_status)}
                    </StyledSubscriptionTabInvoiceItemValue>
                  </StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItem>
                    <StyledSubscriptionTabInvoiceItemLabel>
                      Due date
                    </StyledSubscriptionTabInvoiceItemLabel>
                    <StyledSubscriptionTabInvoiceItemValue>
                      {row.due_date}
                    </StyledSubscriptionTabInvoiceItemValue>
                  </StyledSubscriptionTabInvoiceItem>
                  <StyledSubscriptionTabInvoiceItem>
                    <StyledSubscriptionTabInvoiceItemLabel>
                      Payment date
                    </StyledSubscriptionTabInvoiceItemLabel>
                    <StyledSubscriptionTabInvoiceItemValue>
                      {row.paid_at}
                    </StyledSubscriptionTabInvoiceItemValue>
                  </StyledSubscriptionTabInvoiceItem>
                  <Box
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    mt={2}
                  >
                    {row.paid_status === "overdue" ||
                    row.paid_status === "due" ? (
                      <React.Fragment>
                        <ContainedButton
                          fullWidth
                          sx={{
                            whiteSpace: "nowrap",
                            mx: "auto",
                            mb: flags.FEATURE_PAY_WITH_CRYPTO_BUTTON
                              ? rem("16px")
                              : 0,
                            maxWidth: rem("375px"),
                          }}
                        >
                          Pay with Card
                        </ContainedButton>
                        {flags.FEATURE_PAY_WITH_CRYPTO_BUTTON && (
                          <ContainedButton
                            fullWidth
                            sx={{
                              whiteSpace: "nowrap",
                              mx: "auto",
                              maxWidth: rem("375px"),
                            }}
                          >
                            Pay with Crypto
                          </ContainedButton>
                        )}
                      </React.Fragment>
                    ) : (
                      <OutlinedButton
                        fullWidth
                        grey
                        sx={{
                          whiteSpace: "nowrap",
                          mx: "auto",
                          maxWidth: rem("375px"),
                        }}
                        onClick={() => window.open(row.invoice_url, "_blank")}
                      >
                        View Invoice
                      </OutlinedButton>
                    )}
                  </Box>
                </StyledSubscriptionTabInvoiceItemsContainer>
              </StyledSubscriptionTabInvoice>
            ))}
          </StyledSubscriptionTabInvoicesContainer>
        )}
      </Box>
      <Box display="flex" justifyContent="center" my={2}>
        <PaginationButton
          grey
          size="small"
          disabled={!invoicesData.has_more || !invoicesData.starting_after}
          onClick={() =>
            setStartAfter(
              invoicesData.starting_after === null
                ? ""
                : invoicesData.starting_after
            )
          }
        >
          Load more
        </PaginationButton>
      </Box>
    </StyledSubscriptionTab>
  )
}

export default observer(SubscriptionTab)
