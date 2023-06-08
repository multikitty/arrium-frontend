import * as React from "react"
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"
import { capitalCase } from "change-case"

import theme from "@/theme"
import { OutlinedButton } from "@/components/commons/Button"
import { StyledFlexGrow } from "@/components/FooterSection/FooterSection.styled"
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
import AddDropdown from "./AddDropdown"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { useCustomersList } from "@/agent/customers"
import { PageProps } from "@/lib/interfaces/common"
import { CustomerAccountStatus } from "@/lib/interfaces/customers"
import { getCountryNameByCode } from "@/utils/getCountryNameByCode"

const statusColorMap: Record<CustomerAccountStatus, string> = {
  active: "#3DCC70",
  inActive: theme.palette.common.orange,
  disabled: theme.palette.grey5,
}

interface CustomersPageProps extends PageProps {}

const CustomersPage: React.FC<CustomersPageProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const { data: customersData, isLoading } = useCustomersList({})
  const [searchQuery, setSearchQuery] = React.useState("")
  const [addDropdownAnchorEl, setAddDropdownAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const isAddDropdownOpen = Boolean(addDropdownAnchorEl)

  const handleAddButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAddDropdownAnchorEl(event.currentTarget)
  }

  const handleAddDropdownClose = () => {
    setAddDropdownAnchorEl(null)
  }

  React.useEffect(() => {}, [])

  const customerList = React.useMemo(
    () =>
      (customersData?.data?.Items || []).filter(
        c =>
          c?.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c?.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, customersData]
  )

  if (!customersData?.data) return null

  console.log("Dasgsdcyef6yedc", customerList)

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
              onClick={handleAddButtonClick}
            >
              Add ...
            </OutlinedButton>
            {isAddDropdownOpen && (
              <AddDropdown
                anchorEl={addDropdownAnchorEl}
                open={isAddDropdownOpen}
                handleClose={handleAddDropdownClose}
                country_code={country_code}
              />
            )}
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
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <StyledFlexGrow />
          <StyledCustomersPageContentUpperSectionRecordCount>
            <StyledCustomersPageContentUpperSectionRecordCountTitle>
              Records:
            </StyledCustomersPageContentUpperSectionRecordCountTitle>
            <StyledCustomersPageContentUpperSectionRecordCountText>
              {customerList?.length}
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
              <React.Fragment>
                {isLoading || customerList?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{ border: 0, paddingTop: "100px" }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h1 style={{ color: "rgb(98 94 94)" }}>
                          No Record Found
                        </h1>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  (customerList || []).map((row, index) => {
                    return (
                      <TableRow
                        hover
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(
                            routes.customersDetail(
                              row.pk,
                              row.sk.replace("#", "%23")
                            )
                          )
                        }
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
                          {row.firstname}
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
                          {row.lastname}
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
                          {row.email}
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
                          {getCountryNameByCode(row.country)}
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
                            label={
                              row.accountStatus === "inActive"
                                ? "Inactive"
                                : capitalCase(row.accountStatus)
                            }
                            sx={{
                              backgroundColor:
                                statusColorMap[
                                  row.accountStatus as keyof typeof statusColorMap
                                ],
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
                    )
                  })
                )}
              </React.Fragment>
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={6}
            width="100%"
          >
            <CircularProgress size={32} />
          </Box>
        )}
      </StyledCustomersPageContent>
    </StyledCustomersPage>
  )
}

export default CustomersPage
