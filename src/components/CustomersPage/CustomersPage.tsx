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
import { IPageProps } from "@/lib/interfaces/common"

const statusColorMap = {
  active: "#3DCC70",
  inactive: theme.palette.common.orange,
  disabled: theme.palette.grey5,
}

interface ICustomersPageProps extends IPageProps {}

const CustomersPage: React.FC<ICustomersPageProps> = ({
  country_code,
  lang,
}) => {
  const { navigate } = useNavigate({ country_code, lang })
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
                lang={lang}
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
              <React.Fragment>
                {isLoading ||
                  customersData?.data?.Items?.map(row => (
                    <TableRow
                      hover
                      key={row.pkEmail}
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
                        {row.pkEmail}
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
                        {/* {row.country} */}
                        Great Britain
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
                        {/* {row.region} */}
                        Knowsley
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
                          label={capitalCase(row.accountStatus)}
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
                  ))}
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
