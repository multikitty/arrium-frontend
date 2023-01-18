import React from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material"
import { rem } from "polished"

import { MockPlans } from "./PlansPage.mock"
import getCurrencySymbolByCountryCode, {
  CountryCodes,
} from "@/utils/getCurrencySymbolByCountryCode"

interface PlansTableProps {
  plansData: MockPlans[]
}

const PlansTable = (props: PlansTableProps) => {
  const theme = useTheme()

  const noData = !props.plansData.length

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderRadius: noData
          ? `${rem("20px")} ${rem("20px")} 0 0`
          : rem("20px"),
        mt: 4,
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="timezone table"
        padding="normal"
      >
        <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
                paddingLeft: rem("32px"),
              }}
            >
              Product Name
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              Country
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              Currency
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: rem("16px"),
                lineHeight: rem("20px"),
                color: theme.palette.grey[600],
              }}
              align="left"
            >
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.plansData.map(plan => (
            <TableRow
              sx={{
                // "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
            >
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                  paddingLeft: rem("32px"),
                }}
              >
                {plan.productName}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                }}
                align="left"
              >
                {plan.countryName}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                }}
                align="left"
              >
                {`${plan.currency} (${getCurrencySymbolByCountryCode(
                  plan.countryCode as CountryCodes
                )})`}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "normal",
                  fontSize: rem("16px"),
                  lineHeight: rem("20px"),
                  color: theme.palette.text.secondary,
                  textTransform: "capitalize",
                }}
                align="left"
              >
                {`${getCurrencySymbolByCountryCode(
                  plan.countryCode as CountryCodes
                )}${plan.price}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PlansTable
