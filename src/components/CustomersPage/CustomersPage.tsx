import React from "react"
import {
  StyledCustomersPage,
  StyledCustomersPageContent,
  StyledCustomersPageContentUpperSection,
  StyledCustomersPageContentUpperSectionRecordCount,
  StyledCustomersPageContentUpperSectionRecordCountText,
  StyledCustomersPageContentUpperSectionRecordCountTitle,
  StyledCustomersPageContentUpperSectionSearchField,
  StyledCustomersPageHeader,
} from "./CustomersPage.styled"
import { OutlinedButton } from "../commons/Button"
import theme from "../../theme"
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { rem } from "polished"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import { capitalCase } from "change-case"
import { navigate } from "gatsby-link"

function createData(
  firstName: string,
  surName: string,
  emailAddress: string,
  country: string,
  region: string,
  status: "active" | "inactive" | "disabled"
) {
  return { firstName, surName, emailAddress, country, region, status }
}

const rows = [
  createData(
    "John",
    "Snow",
    "johnsnow@gmail.com",
    "Great Britain",
    "Knowsley",
    "active"
  ),
  createData(
    "Fred",
    "Bobinsky",
    "fredbobinsk@gmail.com",
    "Great Britain",
    "Knowsley",
    "active"
  ),
  createData(
    "Phoebe",
    "Buffay",
    "phoebe@yahoo.com",
    "USA",
    "Los Angeles",
    "active"
  ),
  createData(
    "Monica",
    "Geller",
    "m.geller@gmail.com",
    "USA",
    "New York",
    "inactive"
  ),
  createData(
    "Rachel",
    "Green",
    "rachel123@gmail.com",
    "USA",
    "New York",
    "active"
  ),
  createData("Ross", "Geller", "ross@gmail.com", "USA", "New York", "inactive"),
  createData(
    "Elizabeth",
    "Brown",
    "beth.brown@gmail.com",
    "Great Britain",
    "Leyland",
    "disabled"
  ),
  createData("Joey", "Tribbiani", "joeyt@yahoo.com", "Italy", "Rome", "active"),
  createData(
    "Coraline",
    "Jones",
    "coraline@gmail.com",
    "Great Britain",
    "Manchester",
    "active"
  ),
]

const statusColorMap = {
  active: "#3DCC70",
  inactive: theme.palette.common.orange,
  disabled: theme.palette.grey5,
}

const CustomersPage = () => {
  return (
    <StyledCustomersPage>
      <StyledCustomersPageHeader>Customers</StyledCustomersPageHeader>
      <StyledCustomersPageContent>
        <StyledCustomersPageContentUpperSection>
          <Box sx={{ mr: rem("32px") }}>
            <OutlinedButton
              startIcon={<AddIcon />}
              sx={{
                borderColor: theme.palette.grey3,
                px: rem("16px"),
                py: rem("6px"),
              }}
            >
              Add customer
            </OutlinedButton>
          </Box>
          <StyledCustomersPageContentUpperSectionSearchField
            endAdornment={
              <SearchIcon
                sx={{
                  fontSize: 24,
                  color: theme.palette.grey5,
                  mr: rem("8px"),
                }}
              />
            }
            placeholder="Type ..."
          />
          <StyledFlexGrow />
          <StyledCustomersPageContentUpperSectionRecordCount>
            <StyledCustomersPageContentUpperSectionRecordCountTitle>
              Records:
            </StyledCustomersPageContentUpperSectionRecordCountTitle>
            <StyledCustomersPageContentUpperSectionRecordCountText>
              150
            </StyledCustomersPageContentUpperSectionRecordCountText>
          </StyledCustomersPageContentUpperSectionRecordCount>
        </StyledCustomersPageContentUpperSection>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", borderRadius: rem("20px") }}
        >
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
                  First name
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
                  Surname
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
                  Email address
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
                  Country
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
                  Region
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
              {rows.map(row => (
                <TableRow
                  hover
                  key={row.emailAddress}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/customers/detail/some_id")}
                >
                  <TableCell
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: rem("16px"),
                      lineHeight: rem("20px"),
                      color: theme.palette.blackText,
                      paddingLeft: rem("32px"),
                    }}
                  >
                    {row.firstName}
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
                    {row.surName}
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
                    {row.emailAddress}
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
                    {row.country}
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
                    {row.region}
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
                      label={capitalCase(row.status)}
                      sx={{
                        backgroundColor: statusColorMap[row.status],
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: rem("14px"),
                        lineHeight: rem("20px"),
                        color: theme.palette.common.white,
                        padding: `${rem("4px")} ${rem("16px")}`,
                        borderRadius: rem("16px"),
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledCustomersPageContent>
    </StyledCustomersPage>
  )
}

export default CustomersPage
