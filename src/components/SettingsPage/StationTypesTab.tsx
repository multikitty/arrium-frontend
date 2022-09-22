import React, { useCallback, useMemo, useState } from "react"
import theme from "@/theme"
import { ContainedButton } from "../commons/Button"
import {
  StyledStationTypesTab,
  StyledSettingsColumn,
  StyledSettingsColumnContent,
  StyledSettingsColumnContentHeaderContainer,
  StyledSettingsColumnContentHeaderText,
  StyledSettingsColumnContentSearchField,
  StyledSettingsColumnContentList,
} from "./SettingsPage.styled"
import { Box, CircularProgress, Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"
import AddBlockTypeModal from "./AddBlockTypeModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import StationTypeList from "./StationTypeList"
import {
  addStationType,
  deleteStationType,
  useStationTypeList,
} from "@/agent/stationTypes"
import {
  IAddStationTypeResult,
  IAddStationTypeVariables,
  IDeleteStationTypeResult,
  IDeleteStationTypeVariables,
} from "@/lib/interfaces/stationTypes"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"

type StationTypesDeleteItem = {
  type: "Block Type"
  sk: string
  pk: string
  name: string
}

const StationTypesTab = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [blockTypeSearchQuery, setBlockTypeSearchQuery] = useState("")
  const [isAddBlockTypeModalOpen, setIsAddBlockTypeModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] =
    useState<StationTypesDeleteItem | null>(null)
  const {
    data: stationTypeListData,
    isLoading: isStationTypeListLoading,
    refetch: refetchStationTypeList,
  } = useStationTypeList()
  const { mutate: addStationTypeMutate } = useMutation<
    IAddStationTypeResult,
    Error,
    IAddStationTypeVariables
  >(addStationType)
  const { mutate: deleteStationTypeMutate } = useMutation<
    IDeleteStationTypeResult,
    Error,
    IDeleteStationTypeVariables
  >(deleteStationType)

  const handleAddBlockTypeModalOpen = () => setIsAddBlockTypeModalOpen(true)
  const handleAddBlockTypeModalClose = () => setIsAddBlockTypeModalOpen(false)

  const handleBlockTypeSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setBlockTypeSearchQuery(e.target.value)

  const handleDeleteConfirmationModalOpen = (
    deleteItem: StationTypesDeleteItem
  ) => setItemToDelete(deleteItem)
  const handleDeleteConfirmationModalClose = () => setItemToDelete(null)

  const handleAddBlockType = (blockType: string) => {
    addStationTypeMutate(
      { stationType: blockType },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(validationError?.stationType || message, {
              variant: "error",
            })
            return
          }
          enqueueSnackbar(message, { variant: "success" })
          refetchStationTypeList()
        },
        onError(error, variables) {
          enqueueSnackbar(error.message, { variant: "error" })
          console.error("ERROR:", error)
          console.log("VARIABLES USED:", variables)
        },
      }
    )
    handleAddBlockTypeModalClose()
  }

  const handleDeleteBlockType = (sk: string, pk: string) => {
    deleteStationTypeMutate(
      { sortKey: sk, partitionKey: pk },
      {
        onSuccess({ success, message, validationError }) {
          if (!success) {
            enqueueSnackbar(
              validationError?.sortKey ||
                validationError?.partitionKey ||
                message,
              {
                variant: "error",
              }
            )
            return
          }
          enqueueSnackbar(message, { variant: "success" })
          refetchStationTypeList()
        },
        onError(error, variables) {
          enqueueSnackbar(error.message, { variant: "error" })
          console.error("ERROR:", error)
          console.log("VARIABLES USED:", variables)
        },
      }
    )
    handleDeleteConfirmationModalClose()
  }

  const handleDeleteMap = useCallback(
    (sk: string, pk: string) => ({
      "Block Type": () => handleDeleteBlockType(sk, pk),
    }),
    []
  )

  const filteredStationTypes = useMemo(
    () =>
      (stationTypeListData?.data?.Items || []).filter(({ stationType }) =>
        stationType.toLowerCase().includes(blockTypeSearchQuery.toLowerCase())
      ),
    [stationTypeListData, blockTypeSearchQuery]
  )

  return (
    <StyledStationTypesTab>
      <AddBlockTypeModal
        open={isAddBlockTypeModalOpen}
        handleClose={handleAddBlockTypeModalClose}
        handleAdd={handleAddBlockType}
      />
      {itemToDelete && (
        <DeleteConfirmationModal
          open={!!itemToDelete}
          name={itemToDelete?.name || ""}
          type={itemToDelete?.type || ""}
          handleClose={handleDeleteConfirmationModalClose}
          handleDelete={
            handleDeleteMap(itemToDelete.sk, itemToDelete.pk)[itemToDelete.type]
          }
        />
      )}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} lg={4}>
          <StyledSettingsColumn>
            <StyledSettingsColumnContent>
              <StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentHeaderText>
                  Block type
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton
                  iconButton
                  onClick={handleAddBlockTypeModalOpen}
                >
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                value={blockTypeSearchQuery}
                onChange={handleBlockTypeSearchQueryField}
                placeholder="Search block type"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {isStationTypeListLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    my={6}
                  >
                    <CircularProgress size={32} />
                  </Box>
                ) : (
                  <StationTypeList
                    data={filteredStationTypes}
                    onDelete={(sk, pk, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Block Type",
                        sk,
                        pk,
                        name,
                      })
                    }}
                  />
                )}
              </StyledSettingsColumnContentList>
            </StyledSettingsColumnContent>
            <Divider orientation="vertical" flexItem />
          </StyledSettingsColumn>
        </Grid>
      </Grid>
    </StyledStationTypesTab>
  )
}

export default StationTypesTab
