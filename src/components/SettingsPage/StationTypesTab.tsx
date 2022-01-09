import React, { useState } from "react"
import theme from "../../theme"
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
import { Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"
import { renderSettingsListItems } from "../../utils/settings"
import { blockTypeList } from "./SettingsPage.data"
import AddBlockTypeModal from "./AddBlockTypeModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import { SettingsItem, SettingsTabProps } from "./LocationsTab"

type StationTypesDeleteItem = {
  type: "Block Type"
} & SettingsItem

const StationTypesTab: React.FC<SettingsTabProps> = props => {
  const [isAddBlockTypeModalOpen, setIsAddBlockTypeModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] =
    useState<StationTypesDeleteItem | null>(null)

  const handleAddBlockTypeModalOpen = () => setIsAddBlockTypeModalOpen(true)
  const handleAddBlockTypeModalClose = () => setIsAddBlockTypeModalOpen(false)

  const handleDeleteConfirmationModalOpen = (
    deleteItem: StationTypesDeleteItem
  ) => setItemToDelete(deleteItem)
  const handleDeleteConfirmationModalClose = () => setItemToDelete(null)

  return (
    <StyledStationTypesTab>
      <AddBlockTypeModal
        open={isAddBlockTypeModalOpen}
        handleClose={handleAddBlockTypeModalClose}
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
                placeholder="Search block type"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {renderSettingsListItems(blockTypeList, {
                  onEdit: id => {
                    console.log("edit", id)
                  },
                  onDelete: (id, name) => {
                    handleDeleteConfirmationModalOpen({
                      type: "Block Type",
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
      </Grid>
    </StyledStationTypesTab>
  )
}

export default StationTypesTab
