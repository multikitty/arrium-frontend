import React, { useState } from "react"
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { rem } from "polished"

import {
  StyledReferralsPage,
  StyledReferralsPageContent,
  StyledReferralsPageContentUpperSection,
  StyledReferralsPageContentUpperSectionRecordCount,
  StyledReferralsPageContentUpperSectionRecordCountText,
  StyledReferralsPageContentUpperSectionRecordCountTitle,
  StyledReferralsPageHeader,
} from "@/components/ReferralsPage/ReferralsPage.styled"
import { OutlinedButton } from "@/components/commons/Button"
import theme from "@/theme"
import { StyledFlexGrow } from "@/components/FooterSection/FooterSection.styled"
import CreateReferralModal from "@/components/ReferralsPage/ReferralModal"
import { useStore } from "@/store"
import { useReferralsByCreator } from "@/agent/referrals"
import LoadingScreen from "@/components/LoadingScreen"
import { ReferralListByCreatorResultData } from "@/lib/interfaces/referrals"
import { useUserByRole } from "@/agent/user"
import { UserRoles } from "@/constants/common"

const ReferralsPage = () => {
  const { userStore } = useStore()
  const {
    data: referralListData,
    isLoading,
    refetch,
  } = useReferralsByCreator({
    userpk: userStore.currentUser!.pk,
  })

  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const [selectedReferral, setSelectedReferral] =
    useState<ReferralListByCreatorResultData | null>(null)

  const handleReferralModalClose = () => {
    setIsReferralModalOpen(false)
  }
  const handleReferralModalOpen = () => {
    setIsReferralModalOpen(true)
  }

  const handleEditReferralButtonClick = (
    referralData: ReferralListByCreatorResultData
  ) => {
    setSelectedReferral(referralData)
    handleReferralModalOpen()
  }

  const { data: adminList } = useUserByRole({
    role: UserRoles.admin,
  })
  const { data: salesAgentList } = useUserByRole({ role: UserRoles.sales })

  const assigneeList = React.useMemo(
    () => [
      ...(adminList?.data?.Items || []),
      ...(salesAgentList?.data?.Items || []),
    ],
    [adminList, salesAgentList]
  )

  const getAssigneeName = React.useCallback(
    (assigneePk: string) => {
      const assigneeData = assigneeList.find(
        assignee => assignee.pk === assigneePk
      )
      if (!assigneeData) return assigneePk
      return `${assigneeData.firstname} ${assigneeData.lastname}`
    },
    [assigneeList]
  )

  if (isLoading) return <LoadingScreen />

  if (!referralListData?.data) return

  return (
    <StyledReferralsPage>
      {isReferralModalOpen && userStore.currentUser?.role && (
        <CreateReferralModal
          open={isReferralModalOpen}
          handleClose={handleReferralModalClose}
          role={userStore.currentUser.role}
          referralsData={selectedReferral || undefined}
          refetchReferralsList={refetch}
        />
      )}
      <StyledReferralsPageHeader>Referrals</StyledReferralsPageHeader>
      <StyledReferralsPageContent>
        <StyledReferralsPageContentUpperSection>
          <Box sx={{ mr: "32px" }}>
            <OutlinedButton
              startIcon={<AddIcon />}
              sx={{
                borderColor: theme.palette.grey3,
                px: "16px",
                py: "6px",
              }}
              onClick={() => {
                setSelectedReferral(null)
                handleReferralModalOpen()
              }}
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
              {referralListData.data.Count || "N/A"}
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
                <TableCell width="30px"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referralListData.data.Items.map(referral => (
                <TableRow
                  key={referral.refCode}
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
                    {referral.refCode}
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
                    {getAssigneeName(referral.refGenFor)}
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
                    {new Date(referral.refGen).toLocaleString("en-CA", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
                    {referral.refActive ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleEditReferralButtonClick(referral)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
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
