import * as React from "react"
import { Box, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { observer } from "mobx-react-lite"
import { Controller, useForm, useWatch } from "react-hook-form"
import { useMutation } from "react-query"
// import { useSnackbar } from "notistack"

import {
  StyledReferralModal,
  StyledReferralModalCloseIconContainer,
  StyledReferralModalForm,
  StyledReferralModalFormAction,
  StyledReferralModalTitle,
} from "./ReferralsPage.styled"
import { StyledAccountInformatiomTabContentField as Input } from "@/components/CustomerDetailPage/CustomerDetailPage.styled"
import { ContainedButton } from "@/components/commons/Button"
import { useStore } from "@/store"
import { UserRolesType } from "@/types/common"
import { UserRoles } from "@/constants/common"
import { StyledFieldLabel } from "@/components/commons/uiComponents"
import referralsOptions from "@/validation/referrals"
import CountrySelect from "@/components/CountrySelect"
import RegionSelect from "@/components/RegionSelect"
import StationSelect from "@/components/StationSelect/StationSelect"
import AssigneeAutoComplete from "@/components/AssigneeAutocomplete/AssigneeAutocomplete"
import { UserByRoleResultData } from "@/lib/interfaces/user"
import { createReferralCode } from "@/agent/referrals"
import {
  CreateReferralCodeResult,
  CreateReferralCodeVariables,
  ReferralListByCreatorResultData,
} from "@/lib/interfaces/referrals"
import Message from "@/components/Message"
import { useUserByRole } from "@/agent/user"
import Hidden from "@/components/Hidden"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastNotification} from '@/components/ToastNotification/ToastNotification';


export interface ReferralModalProps {
  open: boolean
  handleClose: () => void
  role: UserRolesType
  referralsData?: ReferralListByCreatorResultData
  refetchReferralsList: () => void
}

const ReferralModal: React.FC<ReferralModalProps> = ({
  handleClose,
  open,
  role,
  referralsData,
  refetchReferralsList,
}) => {
  // const { enqueueSnackbar } = useSnackbar()

  const isSalesAgent = role === UserRoles.sales

  const { userStore } = useStore()
  const { mutate: createReferralMutate, isLoading } = useMutation<
    CreateReferralCodeResult,
    Error,
    CreateReferralCodeVariables
  >(createReferralCode)
  const { data: adminList } = useUserByRole({
    role: UserRoles.admin,
  })
  const { data: salesAgentList } = useUserByRole({ role: UserRoles.sales })

  const assigneeList = React.useMemo(
    () => [
      ...(adminList?.data?.Items || []),
      ...(salesAgentList?.data?.Items || []),
    ],
    [adminList, salesAgentList]
  )

  type FormPropType = typeof referralsOptions.defaultValues
  const { handleSubmit, control, ...methods } = useForm<FormPropType>({
    resolver: referralsOptions.resolver,
    defaultValues: referralsData
      ? {
          ...referralsData,
          country: referralsData.country.toLowerCase(),
          assignTo:
            assigneeList.find(
              assignee => referralsData.refGenFor === assignee.pk
            ) || null,
        }
      : referralsOptions.defaultValues,
  })
  useWatch({ control })

  const onSubmit = async (data: FormPropType) => {
    try {
      await createReferralMutate(
        {
          ...data,
          numberOfReferral: data.numberOfReferrals,
          assignTo: data.assignTo!.pk,
        },
        {
          // onSuccess({ success, message, validationError }) {
          //   if (!success) {
          //     const errorMessage =
          //       validationError?.assignTo ||
          //       validationError?.country ||
          //       validationError?.numberOfReferral ||
          //       validationError?.region ||
          //       validationError?.station ||
          //       message
          //     enqueueSnackbar(errorMessage, {
          //       persist: true,
          //       anchorOrigin: {
          //         vertical: "top",
          //         horizontal: "right",
          //       },
          //       content: (key, message) => (
          //         <Message
          //           id={key}
          //           title="Error"
          //           text={message}
          //           variant="error"
          //         />
          //       ),
          //     })
          //   }
          //   enqueueSnackbar(message, {
          //     anchorOrigin: {
          //       vertical: "top",
          //       horizontal: "right",
          //     },
          //     content: (key, message) => (
          //       <Message
          //         id={key}
          //         title="Success!"
          //         text={message}
          //         variant="success"
          //       />
          //     ),
          //   })
          //   refetchReferralsList()
          //   handleClose()
          // },
          onSuccess({ success, message, validationError }) {
            if (!success) {
              const errorMessage =
                validationError?.assignTo ||
                validationError?.country ||
                validationError?.numberOfReferral ||
                validationError?.region ||
                validationError?.station ||
                message;
              toast.error(
                <Message
                  id="error-toast"
                  title="Error"
                  text={errorMessage}
                  variant="error"
                />,
                { containerId: 'toast-container' }
              );
            } else {
              toast.success(
                <Message
                  id="success-toast"
                  title="Success!"
                  text={message}
                  variant="success"
                />,
                { containerId: 'toast-container' }
              );
              refetchReferralsList();
              handleClose();
            }
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  const salesAgentData: UserByRoleResultData | undefined =
    isSalesAgent && userStore.currentUser
      ? {
          firstname: userStore.currentUser.firstname,
          lastname: userStore.currentUser.lastname,
          pk: userStore.currentUser.pk,
          sk: userStore.currentUser.sk,
          role: userStore.currentUser.role,
        }
      : undefined
  const isSaveDisabled =
    !methods.getValues("country") ||
    !methods.getValues("region") ||
    !methods.getValues("numberOfReferrals") ||
    !methods.getValues("assignTo")

  return (
    <Modal open={open} onClose={handleClose}>
      <ToastNotification/>
      <StyledReferralModal>
        <StyledReferralModalCloseIconContainer>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledReferralModalCloseIconContainer>
        <StyledReferralModalTitle>
          {referralsData
            ? `Edit Code - ${referralsData.refCode}`
            : "Create new referral codes"}
        </StyledReferralModalTitle>
        <StyledReferralModalForm onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" mb="16px">
            <StyledFieldLabel $isHidden={!methods.getValues("country")}>
              Country
            </StyledFieldLabel>
            <Controller
              control={control}
              name="country"
              render={({ field: { ref, ...field } }) => (
                <CountrySelect
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    methods.setValue("region", "")
                    methods.setValue("station", "")
                  }}
                  fullWidth
                  required
                  placeholder="Country name"
                />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb="16px">
            <StyledFieldLabel $isHidden={!methods.getValues("region")}>
              Region
            </StyledFieldLabel>
            <Controller
              control={control}
              name="region"
              render={({ field: { ref, ...field } }) => (
                <RegionSelect
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    methods.setValue("station", "")
                  }}
                  countryCode={methods.getValues("country")}
                  disabled={!methods.getValues("country")}
                  fullWidth
                  required
                  placeholder="Choose Region"
                />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="column" mb="16px">
            <StyledFieldLabel $isHidden={!methods.getValues("region")}>
              Station
            </StyledFieldLabel>
            <Controller
              control={control}
              name="station"
              render={({ field: { ref, ...field } }) => (
                <StationSelect
                  {...field}
                  countryCode={methods.getValues("country")}
                  regionCode={methods.getValues("region")}
                  disabled={!methods.getValues("region")}
                  fullWidth
                  required
                  placeholder="Choose Station"
                />
              )}
            />
          </Box>
          <Hidden when={!!referralsData}>
            <Box display="flex" flexDirection="column" mb="16px">
              <StyledFieldLabel
                $isHidden={Number.isNaN(
                  methods.getValues("numberOfReferrals") ||
                    !methods.getValues("numberOfReferrals")
                )}
              >
                Number of Referrals
              </StyledFieldLabel>
              <Controller
                control={control}
                name="numberOfReferrals"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Number of referrals"
                    type="number"
                    required
                    inputProps={{
                      min: 1,
                      max: 10,
                    }}
                  />
                )}
              />
            </Box>
          </Hidden>
          <Box display="flex" flexDirection="column" mb="44px">
            <StyledFieldLabel $isHidden={!methods.getValues("assignTo")}>
              Assign to
            </StyledFieldLabel>
            <Controller
              control={control}
              name="assignTo"
              render={({ field: { ref, ...field } }) => (
                <AssigneeAutoComplete
                  {...field}
                  loading={!!referralsData && !methods.getValues("assignTo")}
                  options={assigneeList.length !== 0 ? assigneeList : undefined}
                  value={salesAgentData || field.value}
                  fullWidth
                  required
                  placeholder="Assign to"
                />
              )}
            />
          </Box>
          <StyledReferralModalFormAction>
            <ContainedButton
              sx={{ width: "100%" }}
              type="submit"
              disabled={
                isSaveDisabled || isLoading || !!referralsData // this is temporary until the Edit APIs are not here
              }
            >
              {isLoading ? "Saving ..." : "Save"}
            </ContainedButton>
          </StyledReferralModalFormAction>
        </StyledReferralModalForm>
      </StyledReferralModal>
    </Modal>
  )
}

export default observer(ReferralModal)
