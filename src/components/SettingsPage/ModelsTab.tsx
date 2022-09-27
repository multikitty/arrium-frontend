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
import {
  flexVersionList,
  osVersionList,
  phoneModelList,
} from "./SettingsPage.data"
import SettingsListItem from "./SettingsListItem"
import PhoneModelList from "./PhoneModelList"
import {
  useFlexVersionList,
  useOsVersionList,
  usePhoneModelList,
} from "@/agent/models"
import OsVersionList from "./OsVersionList"
import FlexVersionList from "./FlexVersionList"

type ModelsDeleteItem = {
  type: "Phone Model" | "OS Version" | "Flex Version"
  pk: string
  sk: string
  name: string
}

const ModelsTab = () => {
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

  const { data: phoneModelListData, isLoading: isPhoneModelListLoading } =
    usePhoneModelList()
  const { data: osVersionListData, isLoading: isOsVersionListLoading } =
    useOsVersionList()
  const { data: flexVersionListData, isLoading: isFlexVersionListLoading } =
    useFlexVersionList()

  const handleAddPhoneModelModalOpen = () => setIsAddPhoneModelModalOpen(true)
  const handleAddPhoneModelModalClose = () => setIsAddPhoneModelModalOpen(false)

  const handleAddOSVersionModalOpen = () => setIsAddOSVersionModalOpen(true)
  const handleAddOSVersionModalClose = () => setIsAddOSVersionModalOpen(false)

  const handleAddFlexVersionModalOpen = () => setIsAddFlexVersionModalOpen(true)
  const handleAddFlexVersionModalClose = () =>
    setIsAddFlexVersionModalOpen(false)

  const handleDeleteConfirmationModalOpen = (deleteItem: ModelsDeleteItem) =>
    setItemToDelete(deleteItem)
  const handleDeleteConfirmationModalClose = () => setItemToDelete(null)

  const handlePhoneModelSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setPhoneModelSearchQuery(e.target.value)
  const handleOsVersionSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setOsVersionSearchQuery(e.target.value)
  const handleFlexVersionSearchQueryField:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => setFlexVersionSearchQuery(e.target.value)

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
      <AddPhoneModelModal
        open={isAddPhoneModelModalOpen}
        handleClose={handleAddPhoneModelModalClose}
        handleAdd={() => {}}
      />
      <AddOSVersionModal
        open={isAddOSVersionModalOpen}
        handleClose={handleAddOSVersionModalClose}
        handleAdd={() => {}}
      />
      <AddFlexVersionModal
        open={isAddFlexVersionModalOpen}
        handleClose={handleAddFlexVersionModalClose}
        handleAdd={() => {}}
      />
      {itemToDelete && (
        <DeleteConfirmationModal
          open={!!itemToDelete}
          name={itemToDelete.name}
          type={itemToDelete.type}
          handleClose={handleDeleteConfirmationModalClose}
          handleDelete={() => {}}
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
                    onDelete={(id, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Phone Model",
                        name,
                        sk: "",
                        pk: "",
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
                    onDelete={(id, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "OS Version",
                        name,
                        pk: "",
                        sk: "",
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
                    onDelete={(id, name) => {
                      handleDeleteConfirmationModalOpen({
                        type: "Flex Version",
                        name,
                        sk: "",
                        pk: "",
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
