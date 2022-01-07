import React, { useState } from "react"
import theme from "../../theme"
import { ContainedButton } from "../commons/Button"
import {
  StyledModelsTab,
  StyledSettingsColumn,
  StyledSettingsColumnContent,
  StyledSettingsColumnContentHeaderContainer,
  StyledSettingsColumnContentHeaderText,
  StyledSettingsColumnContentList,
  StyledSettingsColumnContentSearchField,
} from "./SettingsPage.styled"
import { Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"
import { DeleteItem } from "./LocationsTab"
import AddPhoneModelModal from "./AddPhoneModelModal"
import AddOSVersionModal from "./AddOSVersionModal"
import AddFlexVersionModal from "./AddFlexVersionModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import { renderSettingsListItems } from "../../utils/settings"
import {
  flexVersionList,
  osVersionList,
  phoneModelList,
} from "./SettingsPage.data"

const ModelsTab = () => {
  const [isAddPhoneModelModalOpen, setIsAddPhoneModelModalOpen] =
    useState(false)
  const [isAddOSVersionModalOpen, setIsAddOSVersionModalOpen] = useState(false)
  const [isAddFlexVersionModalOpen, setIsAddFlexVersionModalOpen] =
    useState(false)
  const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null)

  const handleAddPhoneModelModalOpen = () => setIsAddPhoneModelModalOpen(true)
  const handleAddPhoneModelModalClose = () => setIsAddPhoneModelModalOpen(false)

  const handleAddOSVersionModalOpen = () => setIsAddOSVersionModalOpen(true)
  const handleAddOSVersionModalClose = () => setIsAddOSVersionModalOpen(false)

  const handleAddFlexVersionModalOpen = () => setIsAddFlexVersionModalOpen(true)
  const handleAddFlexVersionModalClose = () =>
    setIsAddFlexVersionModalOpen(false)

  const handleDeleteConfirmationModalOpen = (deleteItem: DeleteItem) =>
    setItemToDelete(deleteItem)
  const handleDeleteConfirmationModalClose = () => setItemToDelete(null)

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
      <DeleteConfirmationModal
        open={!!itemToDelete}
        name={itemToDelete?.name || ""}
        type={itemToDelete?.type || ""}
        handleClose={handleDeleteConfirmationModalClose}
        handleDelete={() => {}}
      />
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
                placeholder="Search phone model"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {renderSettingsListItems(phoneModelList, {
                  onEdit: id => {
                    console.log("edit", id)
                  },
                  onDelete: (id, name) => {
                    handleDeleteConfirmationModalOpen({
                      type: "Phone Model",
                      name,
                      id,
                    })
                  },
                })}
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
                placeholder="Search OS version"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {renderSettingsListItems(osVersionList, {
                  onEdit: id => {
                    console.log("edit", id)
                  },
                  onDelete: (id, name) => {
                    handleDeleteConfirmationModalOpen({
                      type: "OS Version",
                      name,
                      id,
                    })
                  },
                })}
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
                placeholder="Search flex version"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {renderSettingsListItems(flexVersionList, {
                  onEdit: id => {
                    console.log("edit", id)
                  },
                  onDelete: (id, name) => {
                    handleDeleteConfirmationModalOpen({
                      type: "Flex Version",
                      name,
                      id,
                    })
                  },
                })}
              </StyledSettingsColumnContentList>
            </StyledSettingsColumnContent>
          </StyledSettingsColumn>
        </Grid>
      </Grid>
    </StyledModelsTab>
  )
}

export default ModelsTab
