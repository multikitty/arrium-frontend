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
import { SearchTableProps } from "./AvailablityPage.types"
import { searchTableData } from "./AvailabilityPage.data"
import { content } from "@/constants/content"
import { observer } from "mobx-react-lite"
import {
  StyledAvailabilitySearchTableFieldContainer,
  StyledAvailabilitySearchTableFieldHelperText,
} from "./AvailabilityPage.styled"

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

const SearchTable: React.FC<SearchTableProps> = ({
  register,
  unregister,
  formState,
}) => {
  const [checkboxValues, setCheckBoxValues] = useState<boolean[]>(
    Array(searchTableData.length).fill(false)
  )

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
                    <StyledAvailabilitySearchTableFieldContainer>
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
                      {formState.errors?.timeToArrive?.[index] && (
                        <StyledAvailabilitySearchTableFieldHelperText>
                          {formState.errors.timeToArrive[index]?.message}
                        </StyledAvailabilitySearchTableFieldHelperText>
                      )}
                    </StyledAvailabilitySearchTableFieldContainer>
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
                  <StyledAvailabilitySearchTableFieldContainer>
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
                    {formState.errors?.startTime?.[index] && (
                      <StyledAvailabilitySearchTableFieldHelperText>
                        {formState.errors.startTime?.[index]?.message}
                      </StyledAvailabilitySearchTableFieldHelperText>
                    )}
                  </StyledAvailabilitySearchTableFieldContainer>
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
                  <StyledAvailabilitySearchTableFieldContainer>
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
                    {formState.errors?.endTime?.[index] && (
                      <StyledAvailabilitySearchTableFieldHelperText>
                        {formState.errors.endTime?.[index]?.message}
                      </StyledAvailabilitySearchTableFieldHelperText>
                    )}
                  </StyledAvailabilitySearchTableFieldContainer>
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
                  <StyledAvailabilitySearchTableFieldContainer>
                    <SearchTableTextField
                      placeholder="Type..."
                      type="number"
                      {...register(`minimumPay.${index}`)}
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
                    {formState.errors?.minimumPay?.[index] && (
                      <StyledAvailabilitySearchTableFieldHelperText>
                        {formState.errors.minimumPay?.[index]?.message}
                      </StyledAvailabilitySearchTableFieldHelperText>
                    )}
                  </StyledAvailabilitySearchTableFieldContainer>
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
                  <StyledAvailabilitySearchTableFieldContainer>
                    <SearchTableTextField
                      placeholder="Type..."
                      type="number"
                      {...register(`minimumHourlyRate.${index}`)}
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
                    {formState.errors?.minimumHourlyRate?.[index] && (
                      <StyledAvailabilitySearchTableFieldHelperText>
                        {formState.errors.minimumHourlyRate?.[index]?.message}
                      </StyledAvailabilitySearchTableFieldHelperText>
                    )}
                  </StyledAvailabilitySearchTableFieldContainer>
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
