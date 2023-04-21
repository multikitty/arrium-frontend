import * as React from "react"
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material"
import { rem } from "polished"
import { Controller, useFormContext, useWatch } from "react-hook-form"

import theme from "@/theme"
import { automationScheduleShape } from "./AutomationSchedule.data"
import { content } from "@/constants/content"
import {
  StyledAvailabilitySearchTableFieldContainer as StyledAutomationScheduleTableFieldContainer,
  StyledAvailabilitySearchTableFieldHelperText as StyledAutomationScheduleTableFieldHelperText,
} from "@/components/AvailabilityPage/AvailabilityPage.styled"
import Switch from "../commons/Switch"
import { AutomationScheduleType } from "@/validation/automationSchedule"
import { Clear } from "@mui/icons-material"
import { devices } from "@/constants/device"

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

const AutomationScheduleTable = () => {
  const isWebView = useMediaQuery(devices.web.up)
  const { formState, control, ...methods } = useFormContext()
  useWatch({ name: "data", control })

  const handleClearTime = (name: "startTime" | "endTime", idx: number) => {
    methods.setValue(`data.${idx}.${name}`, null)
  }
  const renderTableCells = React.useCallback(
    (index: number, disabled: boolean) =>
      automationScheduleShape?.map(({ name, renderInput }) => (
        <TableCell
          key={`${name}.${index}`}
          sx={{
            ...tableHeaderBlackTextStyles,
            fontWeight: "normal",
          }}
          size="small"
          align="left"
        >
          <Box>
            <StyledAutomationScheduleTableFieldContainer>
              <Controller
                name={`data.${index}.${name}`}
                control={control}
                render={({ field: { value, onChange, onBlur, ref } }) =>
                  name === "startTime" || name === "endTime" ? (
                    <React.Fragment>
                      {renderInput({
                        value,
                        onChange,
                        onBlur,
                        ref,
                        disabled,
                        error: !!formState.errors?.data?.[index]?.[name],
                        minTime:
                          name === "endTime"
                            ? methods.getValues(`data.${index}.startTime`)
                            : null,
                        fullWidth: true,
                      })}
                      {!disabled && (
                        <Tooltip title="Clear Time">
                          <span>
                            <IconButton
                              disabled={!value}
                              size="small"
                              sx={{ ml: 1 }}
                              onClick={() => handleClearTime(name, index)}
                            >
                              <Clear />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </React.Fragment>
                  ) : (
                    renderInput({
                      value,
                      onChange,
                      onBlur,
                      ref,
                      disabled,
                      error: !!formState.errors?.data?.[index]?.[name],
                      isMobile: !isWebView,
                    })
                  )
                }
              /> 
              {!disabled && formState.errors?.data?.[index]?.[name] && (
                <StyledAutomationScheduleTableFieldHelperText>
                  {formState.errors.data[index][name]?.message}
                </StyledAutomationScheduleTableFieldHelperText>
              )}
            </StyledAutomationScheduleTableFieldContainer>
          </Box>
        </TableCell>
      )),
    [formState, control, isWebView]
  )

  const renderTableRows = React.useMemo(
    () =>
      methods
        .getValues()
        .data.map((data: AutomationScheduleType["data"][0], index: number) => {
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
              {/* // * Switch Column */}
              <TableCell
                sx={tableHeaderBlackTextStyles}
                scope="row"
                size="small"
              >
                <Box display="flex" alignItems="center">
                  <StyledAutomationScheduleTableFieldContainer>
                    <Controller
                      name={`data.${index}.active`}
                      control={control}
                      render={({ field: { value, ...field } }) => (
                        <Switch
                          size="small"
                          sx={{ m: 1 }}
                          {...field}
                          checked={value}
                        />
                      )}
                    />
                  </StyledAutomationScheduleTableFieldContainer>
                </Box>
              </TableCell>
              {renderTableCells(index, !data.active)}
            </TableRow>
          )
        }),
    [control, methods, renderTableCells]
  )

  return (
    <TableContainer sx={{ borderRadius: rem("20px") }}>
      <Table aria-label="Search Preferences table">
        <TableHead sx={{ backgroundColor: theme.palette.grey1 }}>
          <TableRow>
            {content.automationScheduleModal.tableHeadLabels.map(
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
        <TableBody>{renderTableRows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default AutomationScheduleTable
