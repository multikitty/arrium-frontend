import React, { useEffect } from "react"
import { Box, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { Controller, useForm, useWatch } from "react-hook-form"
import { useMutation } from "react-query"

import {
  StyledAddCountryModal as StyledRegionModal,
  StyledAddCountryModalCloseIconContainer as StyledRegionModalCloseIconContainer,
  StyledAddCountryModalForm as StyledRegionModalForm,
  StyledAddCountryModalFormActions as StyledRegionModalFormActions,
  StyledAddCountryModalFormField as StyledRegionModalFormField,
  StyledAddCountryModalTitle as StyledRegionModalTitle,
} from "./SettingsPage.styled"
import { ModalProps } from "./SettingsPage.types"
import {
  AddRegionResult,
  AddRegionVariables,
  CountryListDataItem,
  UpdateRegionResult,
  UpdateRegionVariables,
} from "@/lib/interfaces/locations"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import regionOptions from "@/validation/admin/settings/region"
import FieldLabel from "@/components/FieldLabel"
import CountrySelect from "@/components/CountrySelect"
import { addRegion, updateRegion } from "@/agent/locations"
import { RegionToEditType } from "./LocationsTab"
import { useSnackbar } from "notistack"
import Message from "@/components/Message"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastNotification } from "@/components/ToastNotification/ToastNotification"

interface RegionModalProps extends ModalProps {
  countries: CountryListDataItem[]
  regionData?: RegionToEditType
  refetchRegionList: () => void
  selectedCountryCode?: string
}

const RegionModal = (props: RegionModalProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const { mutate: addRegionMutate } = useMutation<
    AddRegionResult,
    Error,
    AddRegionVariables
  >(addRegion)
  const { mutate: updateRegionMutate } = useMutation<
    UpdateRegionResult,
    Error,
    UpdateRegionVariables
  >(updateRegion)

  type FormValuesType = typeof regionOptions.defaultValues
  const { handleSubmit, control, ...methods } = useForm<FormValuesType>({
    resolver: regionOptions.resolver,
    defaultValues: props.regionData
      ? {
          country: props.regionData.countryCode,
          regionName: props.regionData.regionName,
          regionCode: props.regionData.regionCode,
          regionId: props.regionData.regionID,
        }
      : regionOptions.defaultValues,
  })
  useWatch({ control })

  const handleAdd = React.useCallback(async (variables: AddRegionVariables) => {
    addRegionMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          const errorMessage =
            validationError?.countryCode ||
            validationError?.regionCode ||
            validationError?.regionId ||
            validationError?.regionName ||
            message
          // enqueueSnackbar(errorMessage, {
          //   persist: true,
          //   anchorOrigin: {
          //     vertical: "top",
          //     horizontal: "right",
          //   },
          //   content: (key, message) => (
          //     <Message id={key} title="Error" text={message} variant="error" />
          //   ),
          // })
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
          })
          return
        }
        // enqueueSnackbar("", {
        //   autoHideDuration: 6000,
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "right",
        //   },
        //   content: key => (
        //     <Message
        //       id={key}
        //       title="Success"
        //       text={
        //         <span>
        //           Region - <strong>{variables.regionName}</strong> Successfully
        //           created
        //         </span>
        //       }
        //       variant="success"
        //     />
        //   ),
        // })
        toast.success(
          <span>
            Region - <strong>{variables.regionName}</strong> Successfully
            created
          </span>,
          {
            position: "top-right",
            autoClose: 6000,
            closeOnClick: true,
          }
        )
        props.refetchRegionList()
        props.handleClose()
      },
      onError(error) {
        console.error("ERROR:", (error as any)?.message)
        // enqueueSnackbar("", {
        //   persist: true,
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "right",
        //   },
        //   content: key => (
        //     <Message
        //       id={key}
        //       title="Error"
        //       text={
        //         <span>
        //           <strong>{variables.regionName}</strong> already exists
        //         </span>
        //       }
        //       variant="error"
        //     />
        //   ),
        // })
        toast.error(
          <span>
            <strong>{variables.regionName}</strong> already exists
          </span>,
          {
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
          }
        )
      },
    })
  }, [])

  const handleEdit = React.useCallback(
    async (variables: UpdateRegionVariables) => {
      updateRegionMutate(variables, {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            const errorMessage =
              validationError?.regSk ||
              validationError?.regionName ||
              validationError?.regionID ||
              message
            // enqueueSnackbar(errorMessage, {
            //   persist: true,
            //   anchorOrigin: {
            //     vertical: "top",
            //     horizontal: "right",
            //   },
            //   content: (key, message) => (
            //     <Message
            //       id={key}
            //       title="Error"
            //       text={message}
            //       variant="error"
            //     />
            //   ),
            // })
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: false,
              closeOnClick: true,
            })
            return
          }
          // enqueueSnackbar("", {
          //   autoHideDuration: 6000,
          //   anchorOrigin: {
          //     vertical: "top",
          //     horizontal: "right",
          //   },
          //   content: key => (
          //     <Message
          //       id={key}
          //       title="Success"
          //       text={
          //         <span>
          //           Region - <strong>{props.regionData?.regionCode}</strong>)
          //           Successfully edited
          //         </span>
          //       }
          //       variant="success"
          //     />
          //   ),
          // })
          toast.success(
            <span>
              Region - <strong>{props.regionData?.regionCode}</strong>)
              Successfully edited
            </span>,
            {
              position: "top-right",
              autoClose: 6000,
              closeOnClick: true,
            }
          )
          props.refetchRegionList()
          props.handleClose()
        },
        onError(error) {
          console.error("ERROR:", (error as any)?.message)
          // enqueueSnackbar("", {
          //   persist: true,
          //   anchorOrigin: {
          //     vertical: "top",
          //     horizontal: "right",
          //   },
          //   content: key => (
          //     <Message
          //       id={key}
          //       title="Error"
          //       text={
          //         <span>
          //           <strong>{variables.regionName}</strong> already exists
          //         </span>
          //       }
          //       variant="error"
          //     />
          //   ),
          // })
          toast.error(
            <span>
              <strong>{variables.regionName}</strong> already exists
            </span>,
            {
              position: "top-right",
              autoClose: false,
              closeOnClick: true,
            }
          )
        },
      })
    },
    []
  )

  const onSubmit = async (data: FormValuesType) => {
    const addRegionVariables: AddRegionVariables = {
      countryCode: data.country,
      regionName: data.regionName,
      regionCode: data.regionCode,
      regionId: data.regionId,
    }
    const updateRegionVariables: UpdateRegionVariables = {
      regSk: props.regionData?.regSk || "",
      regionName: data.regionName,
      regionID: data.regionId,
    }

    if (!props.regionData) {
      await handleAdd(addRegionVariables)
      return
    }
    await handleEdit(updateRegionVariables)
  }

  const isSaveDisabled =
    !methods.getValues("country") ||
    !methods.getValues("regionName") ||
    !methods.getValues("regionCode") ||
    !methods.getValues("regionId")

  useEffect(() => {
    if (props?.selectedCountryCode) {
      methods.setValue("country", props?.selectedCountryCode)
    }
  }, [])
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <>
        <ToastNotification />

        <StyledRegionModal sx={{ borderRadius: "20px" }}>
          <StyledRegionModalCloseIconContainer>
            <IconButton size="small" onClick={props.handleClose}>
              <CloseIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </StyledRegionModalCloseIconContainer>
          <Box mt="20px">
            <StyledRegionModalTitle>
              {props.regionData ? "Edit Region details" : "Add new Region"}
            </StyledRegionModalTitle>
          </Box>
          <StyledRegionModalForm onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" mb="16px" mt="8px">
              <FieldLabel hidden={!methods.getValues("country")}>
                Country Name
              </FieldLabel>
              <Controller
                control={control}
                name="country"
                render={({ field: { ref, ...field } }) => (
                  <CountrySelect
                    {...field}
                    disabled={!!props.regionData}
                    readOnly={!!props.regionData}
                    value={methods.getValues("country")}
                    onChange={e => {
                      field.onChange(e.target.value)
                      methods.setValue("country", e.target.value)
                    }}
                    placeholder="Country Name"
                    required
                  />
                )}
              />
            </Box>
            <Box display="flex" flexDirection="column" mb="16px">
              <FieldLabel hidden={!methods.getValues("regionName")}>
                Region Name
              </FieldLabel>
              <Controller
                control={control}
                name="regionName"
                render={({ field: { ref, ...field } }) => (
                  <StyledRegionModalFormField
                    {...field}
                    placeholder="Region Name"
                    required
                  />
                )}
              />
            </Box>
            <Box display="flex" flexDirection="column" mb="16px">
              <FieldLabel hidden={!methods.getValues("regionCode")}>
                Region Code
              </FieldLabel>
              <Controller
                control={control}
                name="regionCode"
                render={({ field: { ref, ...field } }) => (
                  <StyledRegionModalFormField
                    {...field}
                    disabled={!!props.regionData}
                    readOnly={!!props.regionData}
                    placeholder="Region Code"
                    required
                  />
                )}
              />
            </Box>
            <Box display="flex" flexDirection="column" mb="44px">
              <FieldLabel hidden={!methods.getValues("regionId")}>
                Region ID
              </FieldLabel>
              <Controller
                control={control}
                name="regionId"
                render={({ field: { ref, ...field } }) => (
                  <StyledRegionModalFormField
                    {...field}
                    placeholder="Region ID"
                    required
                  />
                )}
              />
            </Box>
            <StyledRegionModalFormActions>
              <ContainedButton
                sx={{ width: "100%", marginBottom: "16px" }}
                disabled={isSaveDisabled}
                type="submit"
              >
                Save
              </ContainedButton>
              <OutlinedButton
                grey
                sx={{ width: "100%" }}
                onClick={props.handleClose}
              >
                Cancel
              </OutlinedButton>
            </StyledRegionModalFormActions>
          </StyledRegionModalForm>
        </StyledRegionModal>
      </>
    </Modal>
  )
}

export default RegionModal
