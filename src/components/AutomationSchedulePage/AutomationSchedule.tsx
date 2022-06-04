import React from "react"
import { navigate } from "gatsby"
import { Box, TextField, TextFieldProps, useMediaQuery } from "@mui/material"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import { Controller, useForm, useWatch } from "react-hook-form"

import { devices } from "@/constants/device"
import routes from "@/constants/routes"
import {
  StyledFAQPage as StyledAutomationSchedulePage,
  StyledFAQPageHeader as StyledAutomationSchedulePageHeader,
} from "../FAQPage/FAQPage.styled"
import {
  StyledAutomationSchedulePageWrapper,
  StyledAutomationSchedulePageContent,
  StyledAutomationSchedulePageSubHeader,
} from "./AutomationSchedule.styled"
import { ContainedButton } from "../commons/Button"
import {
  automationScheduleResolver,
  AutomationScheduleType,
} from "@/validation/automationSchedule"
import { scheduleDataInitialValues } from "./AutomationSchedule.data"
import Switch from "../commons/Switch"
import DaySelect from "../DaySelect"
import { TimePicker } from "@mui/x-date-pickers"

const AutomationSchedulePage = () => {
  const isWebView = useMediaQuery(devices.web.up)
  const handleBackToAvailabilityPage = () => {
    navigate(routes.availability)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    ...methods
  } = useForm<AutomationScheduleType>({
    defaultValues: { data: scheduleDataInitialValues },
    resolver: automationScheduleResolver,
  })
  useWatch({ name: "data", control })

  const onSubmit = (data: AutomationScheduleType) => console.log(data)

  return (
    <StyledAutomationSchedulePage>
      <StyledAutomationSchedulePageHeader isSubHeaderBelow>
        Automation Schedule
      </StyledAutomationSchedulePageHeader>
      <StyledAutomationSchedulePageSubHeader>
        Configure Schedule for Automation Schedule
      </StyledAutomationSchedulePageSubHeader>
      <StyledAutomationSchedulePageWrapper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <StyledAutomationSchedulePageContent fullWidth centerY>
          {methods.getValues().data.map((d, idx) => (
            <Box
              display="flex"
              alignItems="center"
              flexWrap="nowrap"
              mb={1}
              key={idx}
            >
              <Box display="flex" flexBasis="6%" mr={2}>
                <Controller
                  name={`data.${idx}.active`}
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <Switch sx={{ m: 1 }} {...field} checked={value} />
                  )}
                />
              </Box>
              <Box display="flex" flexBasis="30%" mr={2}>
                <Controller
                  name={`data.${idx}.day`}
                  control={control}
                  render={({ field }) => (
                    <DaySelect
                      {...field}
                      isMobile={!isWebView}
                      version="short"
                      error={!!errors?.data?.[idx]?.day}
                    />
                  )}
                />
              </Box>
              <Box display="flex" flexBasis="29%" mr={1}>
                {d.active && (
                  <Controller
                    name={`data.${idx}.startTime`}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        mask="__:__"
                        views={["hours", "minutes"]}
                        renderInput={(params: TextFieldProps) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    )}
                  />
                )}
              </Box>
              <Box display="flex" flexBasis="6%" mr={1}>
                {d.active && "To"}
              </Box>
              <Box display="flex" flexBasis="29%" mr={2}>
                {d.active && (
                  <Controller
                    name={`data.${idx}.endTime`}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        disableIgnoringDatePartForTimeValidation
                        minTime={d.startTime}
                        mask="__:__"
                        views={["hours", "minutes"]}
                        renderInput={(params: TextFieldProps) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    )}
                  />
                )}
              </Box>
            </Box>
          ))}
        </StyledAutomationSchedulePageContent>
      </StyledAutomationSchedulePageWrapper>
      <Box display="flex" justifyContent="flex-end" width="100%" mt={2} pr={2}>
        <ContainedButton
          onClick={handleBackToAvailabilityPage}
          startIcon={<ChevronLeft />}
        >
          Back to Availability
        </ContainedButton>
      </Box>
    </StyledAutomationSchedulePage>
  )
}

export default AutomationSchedulePage
