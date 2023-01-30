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
import theme from "@/theme"
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
import { useStore } from "@/store"
import referralsData from "./ReferralsPage.data"

const ReferralsPage = () => {
  const { userStore } = useStore()
  const [isCreateReferralModalOpen, setIsCreateReferralModalOpen] =
    useState(false)

  const handleCreateReferralModalClose = () =>
    setIsCreateReferralModalOpen(false)
  const handleCreateReferralModalOpen = () => setIsCreateReferralModalOpen(true)

  return (
    <StyledReferralsPage>
      {isCreateReferralModalOpen && userStore.currentUser?.role && (
        <CreateReferralModal
          open={isCreateReferralModalOpen}
          handleClose={handleCreateReferralModalClose}
          role={userStore.currentUser.role}
        />
      )}
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
              {referralsData.map(referral => (
                <TableRow
                  key={referral.referralCode}
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
                    {referral.referralCode}
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
                    {referral.region}
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
                    {referral.station}
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
                    {referral.assignedTo}
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
                    {referral.dateGenerated}
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
                    {referral.active}
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
