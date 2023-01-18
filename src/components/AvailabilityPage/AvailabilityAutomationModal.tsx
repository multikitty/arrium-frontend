import React, { useEffect } from "react"
import { IconButton, Modal, Box } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIconActive from "@/assets/icons/delete_icon.inline.svg"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { StyledAddCountryModalCloseIconContainer as StyledAvailablityAutomationModalCloseIconContainer } from "@/components/SettingsPage/SettingsPage.styled"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import {
  StyledAvailablityAutomationModal,
  StyledAvailablityAutomationModalTitle,
  StyledAvailablityAutomationModalTitleDesc,
  StyledSearchButton,
} from "./AvailabilityPage.styled"
import { useSnackbar } from "notistack"
import {
  automationScheduleResolver,
  AutomationScheduleType,
} from "@/validation/automationSchedule"
import AutomationScheduleTable from "./AutomationScheduleTable"
import { scheduleDataInitialValues } from "./AutomationSchedule.data"
import { PageProps } from "@/lib/interfaces/common"
import {
  GetPrefrencesScheduleResult,
  GetPrefrencesScheduleResultData,
  SetPrefrencesScheduleVariables,
} from "@/lib/interfaces/prefrences"
import {
  setPrefrencesSchedule,
  fetchPreferencesSchedule,
} from "@/agent/prefrences"
import { FormValuesAutomationSchedule } from "./AvailablityPage.types"
import { createDateInHM } from "@/utils"

interface AutomationScheduleProps extends PageProps {
  open: boolean
  handleClose: () => void
}

const AvailabilityAutomationModal: React.FC<AutomationScheduleProps> = ({
  open,
  handleClose,
}) => {
  // const { navigate } = useNavigate({ country_code, lang })
  const { enqueueSnackbar } = useSnackbar()

  const { control, handleSubmit, formState, ...methods } =
    useForm<AutomationScheduleType>({
      defaultValues: { data: scheduleDataInitialValues },
      resolver: automationScheduleResolver,
    })

  //refetch preference schedule
  useEffect(() => {
    if (open === true) {
      fetchPreferencesSchedule().then(res => {
        methods.reset({
          data: res?.data?.map((value: GetPrefrencesScheduleResultData) => ({
            startTime: createDateInHM(
              Number(value.startTime.split(":")[0]),
              Number(value.startTime.split(":")[1])
            ),
            active: value.active,
            day: value.day,
          })),
        })
      })
    }
  }, [open])

  const handleFormReset = () => {
    methods.reset({
      data: scheduleDataInitialValues,
    })
  }

  const { mutate } = useMutation<
    GetPrefrencesScheduleResult,
    Error,
    SetPrefrencesScheduleVariables
  >(setPrefrencesSchedule)

  const onSubmit = async (schedules: FormValuesAutomationSchedule) => {
    const apiData = schedules.data.map(obj => {
      return {
        day: obj.day,
        startTime: new Date(obj.startTime).toLocaleTimeString([], {
          hour12: false,
        }),
        active: obj.active,
      }
    })
    mutate(
      {
        schedules: apiData,
      },
      {
        onSuccess({ message, success }) {
          if (!success) {
            enqueueSnackbar("Some Error Occured", { variant: "error" })
          } else {
            enqueueSnackbar(message, { variant: "success" })
            handleClose()
          }
        },
        onError() {
          enqueueSnackbar("Some Error Occured", { variant: "error" })
        },
      }
    )
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      mt-5
      sx={{ overflow: "scroll", alignItems: "flex-start" }}
    >
      <StyledAvailablityAutomationModal>
        <StyledAvailablityAutomationModalCloseIconContainer>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAvailablityAutomationModalCloseIconContainer>
        <StyledAvailablityAutomationModalTitle>
          Automation Schedule
        </StyledAvailablityAutomationModalTitle>
        <Box display="flex" sx={{ marginBottom: "12px" }}>
          <StyledAvailablityAutomationModalTitleDesc>
            Set the days and times that you'd like to auto-start Arrium to
            search for blocks
          </StyledAvailablityAutomationModalTitleDesc>
          {/* <StyledAvailablityAutomationDeleteButton
            // onClick={() => handleFormReset()}
            startIcon={<DeleteIconInactive/>}
            disabled={true}
          >
            Clear all
          </StyledAvailablityAutomationDeleteButton> */}
          <Box>
            <StyledSearchButton
              onClick={() => handleFormReset()}
              startIcon={<DeleteIconActive />}
            >
              Clear all
            </StyledSearchButton>
          </Box>
        </Box>

        <FormProvider
          control={control}
          formState={formState}
          handleSubmit={handleSubmit}
          {...methods}
        >
          <AutomationScheduleTable />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            py={2}
            px={2}
          >
            <OutlinedButton onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </OutlinedButton>
            <ContainedButton type="submit" onClick={handleSubmit(onSubmit)}>
              Save
            </ContainedButton>
          </Box>
        </FormProvider>
      </StyledAvailablityAutomationModal>
    </Modal>
  )
}

export default AvailabilityAutomationModal
