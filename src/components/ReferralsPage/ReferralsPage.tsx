import React, { useState } from "react"
import {
  StyledReferralsPage,
  StyledReferralsPageContent,
  StyledReferralsPageContentUpperSection,
  StyledReferralsPageContentUpperSectionRecordCount,
  StyledReferralsPageContentUpperSectionRecordCountText,
  StyledReferralsPageContentUpperSectionRecordCountTitle,
  StyledReferralsPageHeader,
} from "./ReferralsPage.styled"
import { OutlinedButton } from "../commons/Button"
import theme from "../../theme"
import {
  Box,
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
import { StyledFlexGrow } from "../FooterSection/FooterSection.styled"
import CreateReferralModal from "./CreateReferralModal"

function createData(
  referralCode: string,
  region: string,
  station: string,
  assignedTo: string,
  dateGenerated: string,
  active: "Yes" | "No"
) {
  return { referralCode, region, station, assignedTo, dateGenerated, active }
}

const rows = [
  createData(
    "123456",
    "London - Bow",
    "Canning Town",
    "John Snow",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "789012",
    "London - Bow",
    "Canning Town",
    "Mr.Bobinsky",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "098765",
    "London - Bow",
    "Dartford",
    "Phoebe Buffay",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "432109",
    "London - Bow",
    "Canning Town",
    "Monica Geller",
    "Oct 10, 2021",
    "No"
  ),
  createData(
    "321654",
    "London - Bow",
    "Dartford",
    "Rachel Green",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "876321",
    "Manchester",
    "Trafford Centre",
    "Ross Geller",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "341970",
    "Manchester",
    "Trafford Centre",
    "Elizabeth Brown",
    "Oct 10, 2021",
    "Yes"
  ),
  createData(
    "527943",
    "Manchester",
    "Trafford Centre",
    "Coraline Jones",
    "Oct 10, 2021",
    "No"
  ),
]

const ReferralsPage = () => {
  const [isCreateReferralModalOpen, setIsCreateReferralModalOpen] =
    useState(false)

  const handleCreateReferralModalClose = () =>
    setIsCreateReferralModalOpen(false)
  const handleCreateReferralModalOpen = () => setIsCreateReferralModalOpen(true)

  return (
    <StyledReferralsPage>
      <CreateReferralModal
        open={isCreateReferralModalOpen}
        handleClose={handleCreateReferralModalClose}
      />
      <StyledReferralsPageHeader>Referrals</StyledReferralsPageHeader>
      <StyledReferralsPageContent>
        <StyledReferralsPageContentUpperSection>
          <Box sx={{ mr: rem("32px") }}>
            <OutlinedButton
              startIcon={<AddIcon />}
              sx={{
                borderColor: theme.palette.grey3,
                px: rem("16px"),
                py: rem("6px"),
              }}
              onClick={handleCreateReferralModalOpen}
            >
              Create referral
            </OutlinedButton>
          </Box>
          <StyledFlexGrow />
          <StyledReferralsPageContentUpperSectionRecordCount>
            <StyledReferralsPageContentUpperSectionRecordCountTitle>
              Records:
            </StyledReferralsPageContentUpperSectionRecordCountTitle>
            <StyledReferralsPageContentUpperSectionRecordCountText>
              150
            </StyledReferralsPageContentUpperSectionRecordCountText>
          </StyledReferralsPageContentUpperSectionRecordCount>
        </StyledReferralsPageContentUpperSection>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", borderRadius: rem("20px") }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="invoices table"
            padding="normal"
          >
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
                  Referral code
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
                  Station
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
                  Assigned to
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
                  Date generated
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
                  Active
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.referralCode}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
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
                    {row.referralCode}
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
                    {row.station}
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
                    {row.assignedTo}
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
                    {row.dateGenerated}
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
                    {row.active}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledReferralsPageContent>
    </StyledReferralsPage>
  )
}

export default ReferralsPage
