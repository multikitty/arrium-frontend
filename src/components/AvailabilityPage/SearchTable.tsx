import * as React from "react"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box,
  Collapse,
} from "@mui/material"
import { MobileTimePickerProps } from "@mui/x-date-pickers"
import { rem } from "polished"
import { Controller, useFormContext, useWatch } from "react-hook-form"

import theme from "@/theme"
import { BpCheckbox as Checkbox } from "../commons/CheckBox"
import { searchTableShape } from "./AvailabilityPage.data"
import { content } from "@/constants/content"
import {
  StyledAvailabilitySearchTableFieldContainer,
  StyledAvailabilitySearchTableFieldHelperText,
} from "./AvailabilityPage.styled"
import { FormValues } from "./AvailablityPage.types"
import {
  StyledSubscriptionPageInvoicesContainer as StyledSearchTableContainer,
  StyledSubscriptionPageInvoice as StyledSearchTable,
  StyledSubscriptionPageInvoiceHeader as StyledSearchTableHeader,
  StyledSubscriptionPageInvoiceHeaderText as StyledSearchTableHeaderText,
  StyledSubscriptionPageInvoiceHeaderTitle as StyledSearchTableHeaderTitle,
  StyledSubscriptionPageInvoiceItem as StyledSearchTableItem,
  StyledSubscriptionPageInvoiceItemLabel as StyledSearchTableItemLabel,
  StyledSubscriptionPageInvoiceItemsContainer as StyledSearchTableItemsContainer,
  StyledSubscriptionPageInvoiceItemValue as StyledSearchTableItemValue,
} from "../SubscriptionPage/SubscriptionPage.styled"

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

interface IProps {
  isMobile?: boolean
}

const SearchTable: React.FC<IProps> = ({ isMobile }) => {
  const { formState, control, ...methods } = useFormContext()
  useWatch({ name: "data", control })

  const renderTableCells = React.useCallback(
    (index: number, disabled: boolean) =>
      searchTableShape.map(({ name, renderInput }) => (
        <TableCell
          key={`${name}.${index}`}
          sx={{
            ...tableHeaderBlackTextStyles,
            fontWeight: "normal",
          }}
          align="left"
        >
          <Box>
            <StyledAvailabilitySearchTableFieldContainer>
              <Controller
                name={`data.${index}.${name}`}
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) =>
                  renderInput({
                    value,
                    onChange,
                    onBlur,
                    ref,
                    disabled,
                    error: !!formState.errors?.data?.[index]?.[name],
                  })
                }
              />
              {formState.errors?.data?.[index]?.[name] && (
                <StyledAvailabilitySearchTableFieldHelperText>
                  {formState.errors.data[index][name]?.message}
                </StyledAvailabilitySearchTableFieldHelperText>
              )}
            </StyledAvailabilitySearchTableFieldContainer>
          </Box>
        </TableCell>
      )),
    [formState, control]
  )

  const renderTableCellsMobile = React.useCallback(
    (index: number, disabled: boolean) =>
      searchTableShape.map(({ label, name, renderInput }) => (
        <StyledSearchTableItem>
          <StyledSearchTableItemLabel>
            {label} {label === "Time to arrive" && <span>*</span>}
          </StyledSearchTableItemLabel>
          <StyledSearchTableItemValue>
            <StyledAvailabilitySearchTableFieldContainer>
              <Controller
                name={`data.${index}.${name}`}
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) =>
                  name === "startTime" || name === "endTime"
                    ? renderInput({
                        value: value as Date | null,
                        onChange: onChange as MobileTimePickerProps["onChange"],
                        disabled,
                        error: !!formState.errors?.data?.[index]?.[name],
                        fullWidth: true,
                        variant: "outlined",
                        minTime:
                          name === "endTime"
                            ? methods.getValues(`data.${index}.startTime`)
                            : null,
                      })
                    : renderInput({
                        value,
                        onChange,
                        onBlur,
                        ref,
                        disabled,
                        error: !!formState.errors?.data?.[index]?.[name],
                        fullWidth: true,
                      })
                }
              />
              {formState.errors?.data?.[index]?.[name] && (
                <StyledAvailabilitySearchTableFieldHelperText>
                  {formState.errors.data[index][name]?.message}
                </StyledAvailabilitySearchTableFieldHelperText>
              )}
            </StyledAvailabilitySearchTableFieldContainer>
          </StyledSearchTableItemValue>
        </StyledSearchTableItem>
      )),
    [formState, control]
  )

  const renderTableRows = React.useMemo(
    () =>
      methods
        .getValues()
        .data.map((data: FormValues["data"][0], index: number) => {
          return (
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
              {/* // * Checkbox Column */}
              <TableCell
                sx={tableHeaderBlackTextStyles}
                component="th"
                scope="row"
              >
                <Box display="flex" alignItems="center">
                  <StyledAvailabilitySearchTableFieldContainer>
                    <Controller
                      name={`data.${index}.checked`}
                      control={control}
                      render={({ field: { value, onChange, onBlur, ref } }) => (
                        <Checkbox
                          id={`checkbox-location-${index}`}
                          checked={!!value}
                          onBlur={onBlur}
                          ref={ref}
                          onChange={onChange}
                        />
                      )}
                    />
                    <label htmlFor={`checkbox-location-${index}`}>
                      {data.location}
                    </label>
                  </StyledAvailabilitySearchTableFieldContainer>
                </Box>
              </TableCell>
              {renderTableCells(index, !data.checked)}
            </TableRow>
          )
        }),
    [control, methods, renderTableCells]
  )

  const renderTableRowsMobile = React.useMemo(
    () =>
      methods
        .getValues()
        .data.map((data: FormValues["data"][0], index: number) => (
          <StyledSearchTable key={data.location}>
            <StyledSearchTableHeader searchTable>
              <StyledSearchTableHeaderTitle isSubHeaderBelow>
                Location
              </StyledSearchTableHeaderTitle>
              <StyledSearchTableHeaderText>
                <Box display="flex" alignItems="center" ml={-1}>
                  <StyledAvailabilitySearchTableFieldContainer>
                    <Controller
                      name={`data.${index}.checked`}
                      control={control}
                      render={({ field: { value, onChange, onBlur, ref } }) => (
                        <Checkbox
                          id={`checkbox-location-${index}`}
                          checked={!!value}
                          onBlur={onBlur}
                          ref={ref}
                          onChange={onChange}
                        />
                      )}
                    />
                    <label htmlFor={`checkbox-location-${index}`}>
                      {data.location}
                    </label>
                  </StyledAvailabilitySearchTableFieldContainer>
                </Box>
              </StyledSearchTableHeaderText>
            </StyledSearchTableHeader>
            <Collapse in={data.checked}>
              <StyledSearchTableItemsContainer searchTable>
                {renderTableCellsMobile(index, !data.checked)}
              </StyledSearchTableItemsContainer>
            </Collapse>
          </StyledSearchTable>
        )),
    [control, methods, renderTableCellsMobile]
  )

  return !isMobile ? (
    <TableContainer>
      <Table aria-label="Search Preferences table">
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
                  {label}{" "}
                  {label === "Time to arrive" && (
                    <span className="clr--main">*</span>
                  )}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>{renderTableRows}</TableBody>
      </Table>
    </TableContainer>
  ) : (
    <StyledSearchTableContainer>
      {renderTableRowsMobile}
    </StyledSearchTableContainer>
  )
}

export default SearchTable
