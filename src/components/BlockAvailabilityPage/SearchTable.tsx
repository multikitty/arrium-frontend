import React, { useState } from "react"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  InputAdornment,
  Box,
} from "@mui/material"
import theme from "@/theme"
import { rem } from "polished"
import { SearchTableTextField } from "../commons/commonComponents"
import { BpCheckbox as Checkbox } from "../commons/CheckBox"
import { SearchTableProps } from "./BlockAvailablityPage.types"
import { searchTableData } from "./BlockAvailabilityPage.data"
import { content } from "@/constants/content"
import { observer } from "mobx-react-lite"

const SearchTable: React.FC<SearchTableProps> = ({ register, unregister }) => {
  const [checkboxValues, setCheckBoxValues] = useState<Array<boolean>>(
    Array(searchTableData.length).fill(false)
  )

  const tableHeaderGreyTextStyles = {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: rem("16px"),
    lineHeight: rem("20px"),
    color: theme.palette.grey6,
  }

  const tableHeaderBlackTextStyles = {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: rem("16px"),
    lineHeight: rem("20px"),
    color: theme.palette.blackText,
  }

  const handleCheckboxChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    index: number
  ) => {
    let values = [...checkboxValues]
    values[index] = checked
    if (!values[index]) {
      unregister(`timeToArrive.${index}`)
      unregister(`startTime.${index}`)
      unregister(`endTime.${index}`)
      unregister(`minimumPay.${index}`)
      unregister(`minimumHourlyRate.${index}`)
    }
    setCheckBoxValues(values)
  }

  return (
    <TableContainer>
      <Table aria-label="invoices table">
        <TableHead sx={{ backgroundColor: theme.palette.grey1 }}>
          <TableRow>
            {content.searchTable.tableHeadLabel.map(
              (label: string, index: number) => (
                <TableCell
                  key={index}
                  sx={
                    index === 0
                      ? {
                          ...tableHeaderGreyTextStyles,
                          paddingLeft: rem("32px"),
                        }
                      : tableHeaderGreyTextStyles
                  }
                >
                  {label}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {searchTableData.map((loc: string, index: number) => (
            <TableRow
              key={index}
              sx={{
                height: "90px",
                "&:last-child td, &:last-child th": { border: 0 },
                "& td:first-of-type, & th:first-of-type": {
                  paddingLeft: rem("16px"),
                },
              }}
            >
              <TableCell
                sx={tableHeaderBlackTextStyles}
                component="th"
                scope="row"
              >
                <Box display="flex" alignItems="center">
                  <Checkbox
                    id={`checkbox-location-${index}`}
                    value={checkboxValues[index]}
                    onChange={(e, checked) =>
                      handleCheckboxChange(e, checked, index)
                    }
                  />
                  <label htmlFor={`checkbox-location-${index}`}>{loc}</label>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  ...tableHeaderBlackTextStyles,
                  fontWeight: "normal",
                }}
                align="left"
              >
                <Box>
                  {checkboxValues[index] ? (
                    <SearchTableTextField
                      placeholder="Type..."
                      {...register(`timeToArrive.${index}`, {
                        required: true,
                      })}
                      disabled={!checkboxValues[index]}
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 180,
                      }}
                    />
                  ) : (
                    <SearchTableTextField
                      placeholder="Type..."
                      disabled={!checkboxValues[index]}
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 180,
                      }}
                    />
                  )}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  ...tableHeaderBlackTextStyles,
                  fontWeight: "normal",
                }}
                align="left"
              >
                {checkboxValues[index] ? (
                  <SearchTableTextField
                    type="time"
                    {...register(`startTime.${index}`, {
                      required: true,
                    })}
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      step: 300,
                    }}
                  />
                ) : (
                  <SearchTableTextField
                    type="time"
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      step: 300,
                    }}
                  />
                )}
              </TableCell>
              <TableCell
                sx={{
                  ...tableHeaderBlackTextStyles,
                  fontWeight: "normal",
                  textTransform: "capitalize",
                }}
                align="left"
              >
                {checkboxValues[index] ? (
                  <SearchTableTextField
                    type="time"
                    {...register(`endTime.${index}`, {
                      required: true,
                    })}
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      step: 300,
                    }}
                  />
                ) : (
                  <SearchTableTextField
                    type="time"
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      step: 300,
                    }}
                  />
                )}
              </TableCell>
              <TableCell
                sx={{
                  ...tableHeaderBlackTextStyles,
                  fontWeight: "normal",
                }}
                align="left"
              >
                {checkboxValues[index] ? (
                  <SearchTableTextField
                    placeholder="Type..."
                    type="number"
                    {...register(`minimumPay.${index}`, {
                      required: true,
                    })}
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      min: 0,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8356;
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <SearchTableTextField
                    placeholder="Type..."
                    type="number"
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      min: 0,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8356;
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </TableCell>
              <TableCell
                sx={{
                  ...tableHeaderBlackTextStyles,
                  fontWeight: "normal",
                }}
                align="left"
              >
                {checkboxValues[index] ? (
                  <SearchTableTextField
                    placeholder="Type..."
                    type="number"
                    {...register(`minimumHourlyRate.${index}`, {
                      required: true,
                    })}
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      min: 0,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8356;
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <SearchTableTextField
                    placeholder="Type..."
                    type="number"
                    disabled={!checkboxValues[index]}
                    inputProps={{
                      min: 0,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8356;
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default observer(SearchTable)
