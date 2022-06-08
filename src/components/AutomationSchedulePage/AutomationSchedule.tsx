import React from "react"
import { navigate } from "gatsby"
import { Box } from "@mui/material"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import { FormProvider, useForm } from "react-hook-form"

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
import { ContainedButton, OutlinedButton } from "../commons/Button"
import {
  automationScheduleResolver,
  AutomationScheduleType,
} from "@/validation/automationSchedule"
import { scheduleDataInitialValues } from "./AutomationSchedule.data"
import AutomationScheduleTable from "./AutomationScheduleTable"
import { useSnackbar } from "notistack"

const AutomationSchedulePage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleBackToAvailabilityPage = () => {
    navigate(routes.availability)
  }

  const { control, handleSubmit, formState, ...methods } =
    useForm<AutomationScheduleType>({
      defaultValues: { data: scheduleDataInitialValues },
      resolver: automationScheduleResolver,
    })

  const onSubmit = (data: AutomationScheduleType) => {
    enqueueSnackbar("Automation Schedule Successfully Updated!", {
      variant: "success",
    })
  }

  const handleCancel = () => {
    methods.reset()
    navigate(routes.availability)
  }

  return (
    <FormProvider
      control={control}
      formState={formState}
      handleSubmit={handleSubmit}
      {...methods}
    >
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
          <StyledAutomationSchedulePageContent fullWidth noPadding>
            <AutomationScheduleTable />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              py={2}
              px={2}
            >
              <OutlinedButton onClick={handleCancel} sx={{ mr: 2 }}>
                Cancel
              </OutlinedButton>
              <ContainedButton type="submit">Save</ContainedButton>
            </Box>
          </StyledAutomationSchedulePageContent>
        </StyledAutomationSchedulePageWrapper>
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          mt={2}
          pr={2}
        >
          <ContainedButton
            onClick={handleBackToAvailabilityPage}
            startIcon={<ChevronLeft />}
          >
            Back to Availability
          </ContainedButton>
        </Box>
      </StyledAutomationSchedulePage>
    </FormProvider>
  )
}

export default AutomationSchedulePage
