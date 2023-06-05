import React, { useMemo, useState } from "react"
import { Box, CircularProgress, Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"

import theme from "@/theme"
import { ContainedButton } from "@/components/commons/Button"
import {
  StyledModelsTab,
  StyledSettingsColumn,
  StyledSettingsColumnContent,
  StyledSettingsColumnContentHeaderContainer,
  StyledSettingsColumnContentHeaderText,
  StyledSettingsColumnContentList,
  StyledSettingsColumnContentSearchField,
} from "./SettingsPage.styled"
import AddPhoneModelModal from "./AddPhoneModelModal"
import AddOSVersionModal from "./AddOSVersionModal"
import AddFlexVersionModal from "./AddFlexVersionModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import PhoneModelList from "./PhoneModelList"
import {
  addFlexVersion,
  addOsVersion,
  addPhoneModel,
  deleteModelsAndVersions,
  useFlexVersionList,
  useOsVersionList,
  usePhoneModelList,
} from "@/agent/models"
import OsVersionList from "./OsVersionList"
import FlexVersionList from "./FlexVersionList"
import { useMutation } from "react-query"
import {
  AddFlexVersionResult,
  AddFlexVersionVariables,
  AddOsVersionResult,
  AddOsVersionVariables,
  AddPhoneModelResult,
  AddPhoneModelVariables,
  DeleteModelsAndVersionsResult,
  DeleteModelsAndVersionsVariables,
} from "@/lib/interfaces/models"
import { useSnackbar } from "notistack"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastNotification} from '@/components/ToastNotification/ToastNotification';


type ModelsDeleteItem = {
  type: "Phone Model" | "OS Version" | "Flex Version"
  pk: string
  sk: string
  name: string
}

const ModelsTab = () => {
  // const { enqueueSnackbar } = useSnackbar()
  const [isAddPhoneModelModalOpen, setIsAddPhoneModelModalOpen] =
    useState(false)
  const [isAddOSVersionModalOpen, setIsAddOSVersionModalOpen] = useState(false)
  const [isAddFlexVersionModalOpen, setIsAddFlexVersionModalOpen] =
    useState(false)
  const [phoneModelSearchQuery, setPhoneModelSearchQuery] = useState("")
  const [osVersionSearchQuery, setOsVersionSearchQuery] = useState("")
  const [flexVersionSearchQuery, setFlexVersionSearchQuery] = useState("")
  const [itemToDelete, setItemToDelete] = useState<ModelsDeleteItem | null>(
    null
  )

  const {
    data: phoneModelListData,
    isLoading: isPhoneModelListLoading,
    refetch: refetchPhoneModelList,
  } = usePhoneModelList()
  const {
    data: osVersionListData,
    isLoading: isOsVersionListLoading,
    refetch: refetchOsVersionList,
  } = useOsVersionList()
  const {
    data: flexVersionListData,
    isLoading: isFlexVersionListLoading,
    refetch: refetchFlexVersionList,
  } = useFlexVersionList()

  const { mutate: addPhoneModelMutate } = useMutation<
    AddPhoneModelResult,
    Error,
    AddPhoneModelVariables
  >(addPhoneModel)
  const { mutate: addOsVersionMutate } = useMutation<
    AddOsVersionResult,
    Error,
    AddOsVersionVariables
  >(addOsVersion)
  const { mutate: addFlexVersionMutate } = useMutation<
    AddFlexVersionResult,
    Error,
    AddFlexVersionVariables
  >(addFlexVersion)
  const { mutate: deleteModelsAndVersionsMutate } = useMutation<
    DeleteModelsAndVersionsResult,
    Error,
    DeleteModelsAndVersionsVariables
  >(deleteModelsAndVersions)

  const handleAddPhoneModelModalOpen = () => {
    setIsAddPhoneModelModalOpen(true)
  }
  const handleAddPhoneModelModalClose = () => {
    setIsAddPhoneModelModalOpen(false)
  }

  const handleAddOSVersionModalOpen = () => {
    setIsAddOSVersionModalOpen(true)
  }
  const handleAddOSVersionModalClose = () => {
    setIsAddOSVersionModalOpen(false)
  }

  const handleAddFlexVersionModalOpen = () => {
    setIsAddFlexVersionModalOpen(true)
  }
  const handleAddFlexVersionModalClose = () => {
    setIsAddFlexVersionModalOpen(false)
  }

  const handleDeleteConfirmationModalOpen = (deleteItem: ModelsDeleteItem) => {
    setItemToDelete(deleteItem)
  }
  const handleDeleteConfirmationModalClose = () => {
    setItemToDelete(null)
  }

  const handlePhoneModelSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => {
    setPhoneModelSearchQuery(e.target.value)
  }
  const handleOsVersionSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => {
    setOsVersionSearchQuery(e.target.value)
  }
  const handleFlexVersionSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => {
    setFlexVersionSearchQuery(e.target.value)
  }

  const handleAddPhoneModel = (variables: AddPhoneModelVariables) => {
    addPhoneModelMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          toast.error(
            validationError?.modelId || validationError?.modelName || message,
          )
          return
        }
        toast.success(message)
        refetchPhoneModelList()
      },
      onError(error, variables) {
        toast.error(error.message)
        console.error("ERROR:", error)
        console.log("VARIABLES USED:", variables)
      },
    })
    handleAddPhoneModelModalClose()
  }

  const handleAddOsVersion = (variables: AddOsVersionVariables) => {
    addOsVersionMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          toast.error(validationError?.osVersion || message)
          return
        }
        toast.success(message)
        refetchOsVersionList()
      },
      onError(error, variables) {
        toast.error(error.message)
        console.error("ERROR:", error)
        console.log("VARIABLES USED:", variables)
      },
    })
    handleAddOSVersionModalClose()
  }

  const handleAddFlexVersion = (variables: AddFlexVersionVariables) => {
    addFlexVersionMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          toast.error(validationError?.flexVersion || message)
          return
        }
        toast.success(message)
        refetchFlexVersionList()
      },
      onError(error, variables) {
        toast.error(error.message)
        console.error("ERROR:", error)
        console.log("VARIABLES USED:", variables)
      },
    })
    handleAddFlexVersionModalClose()
  }

  const handleDeleteModelsAndVersions = (
    variables: DeleteModelsAndVersionsVariables
  ) => {
    deleteModelsAndVersionsMutate(variables, {
      onSuccess({ success, message, validationError }) {
        if (!success) {
          toast.error(
            validationError?.deletePk || validationError?.deleteSk || message
          )
          return
        }
        toast.success(message)
        if (variables.deletePk === "phoneModel") refetchPhoneModelList()
        if (variables.deletePk === "osVersion") refetchOsVersionList()
        if (variables.deletePk === "flexVersion") refetchFlexVersionList()
        handleDeleteConfirmationModalClose()
      },
      onError(error, variables) {
        toast.error(error.message)
        console.error("ERROR:", error)
        console.log("VARIABLES USED:", variables)
      },
    })
  }

  const filteredPhoneModels = useMemo(
    () =>
      (phoneModelListData?.data?.Items || []).filter(phoneModel =>
        phoneModel.ModelName.toLowerCase().includes(
          phoneModelSearchQuery.toLowerCase()
        )
      ),
    [phoneModelListData, phoneModelSearchQuery]
  )

  const filteredOsVersions = useMemo(
    () =>
      (osVersionListData?.data?.Items || []).filter(osVersion =>
        osVersion.osVersion
          .toLowerCase()
          .includes(osVersionSearchQuery.toLowerCase())
      ),
    [osVersionListData, osVersionSearchQuery]
  )

  const filteredFlexVersions = useMemo(
    () =>
      (flexVersionListData?.data?.Items || []).filter(flexVersion =>
        flexVersion.flexVersion
          .toLowerCase()
          .includes(flexVersionSearchQuery.toLowerCase())
      ),
    [flexVersionListData, flexVersionSearchQuery]
  )

  return (
    <StyledModelsTab>
      <ToastNotification/>
      {isAddPhoneModelModalOpen ? (
        <AddPhoneModelModal
          open={isAddPhoneModelModalOpen}
          handleClose={handleAddPhoneModelModalClose}
          handleAdd={handleAddPhoneModel}
        />
      ) : null}
      {isAddOSVersionModalOpen ? (
        <AddOSVersionModal
          open={isAddOSVersionModalOpen}
          handleClose={handleAddOSVersionModalClose}
          handleAdd={handleAddOsVersion}
        />
      ) : null}
      {isAddFlexVersionModalOpen ? (
        <AddFlexVersionModal
          open={isAddFlexVersionModalOpen}
          handleClose={handleAddFlexVersionModalClose}
          handleAdd={handleAddFlexVersion}
        />
      ) : null}
      {itemToDelete && (
        <DeleteConfirmationModal
          open={!!itemToDelete}
          name={itemToDelete.name}
          type={itemToDelete.type}
          handleClose={handleDeleteConfirmationModalClose}
          handleDelete={() =>
            handleDeleteModelsAndVersions({
              deletePk: itemToDelete.pk,
              deleteSk: itemToDelete.sk,
            })
          }
        />
      )}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} lg={4}>
          <StyledSettingsColumn>
            <StyledSettingsColumnContent>
              <StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentHeaderText>
                  Phone model
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton
                  iconButton
                  onClick={handleAddPhoneModelModalOpen}
                >
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                value={phoneModelSearchQuery}
                onChange={handlePhoneModelSearchQueryField}
                placeholder="Search phone model"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {isPhoneModelListLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    my={6}
                  >
                    <CircularProgress size={32} />
                  </Box>
                ) : (
                  <PhoneModelList
                    data={filteredPhoneModels}
                    onDelete={(sk, pk, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Phone Model",
                        name,
                        sk,
                        pk,
                      })
                    }}
                  />
                )}
              </StyledSettingsColumnContentList>
            </StyledSettingsColumnContent>
            <Divider orientation="vertical" flexItem />
          </StyledSettingsColumn>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledSettingsColumn>
            <StyledSettingsColumnContent>
              <StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentHeaderText>
                  OS version
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton
                  iconButton
                  onClick={handleAddOSVersionModalOpen}
                >
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                value={osVersionSearchQuery}
                onChange={handleOsVersionSearchQueryField}
                placeholder="Search OS version"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {isOsVersionListLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    my={6}
                  >
                    <CircularProgress size={32} />
                  </Box>
                ) : (
                  <OsVersionList
                    data={filteredOsVersions}
                    onDelete={(sk, pk, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "OS Version",
                        name,
                        sk,
                        pk,
                      })
                    }}
                  />
                )}
              </StyledSettingsColumnContentList>
            </StyledSettingsColumnContent>
            <Divider orientation="vertical" flexItem />
          </StyledSettingsColumn>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledSettingsColumn>
            <StyledSettingsColumnContent last>
              <StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentHeaderText>
                  Flex version
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton
                  iconButton
                  onClick={handleAddFlexVersionModalOpen}
                >
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                value={flexVersionSearchQuery}
                onChange={handleFlexVersionSearchQueryField}
                placeholder="Search flex version"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {isFlexVersionListLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    my={6}
                  >
                    <CircularProgress size={32} />
                  </Box>
                ) : (
                  <FlexVersionList
                    data={filteredFlexVersions}
                    onDelete={(sk, pk, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Flex Version",
                        name,
                        sk,
                        pk,
                      })
                    }}
                  />
                )}
              </StyledSettingsColumnContentList>
            </StyledSettingsColumnContent>
          </StyledSettingsColumn>
        </Grid>
      </Grid>
    </StyledModelsTab>
  )
}

export default ModelsTab
