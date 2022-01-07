import React, { useState } from "react"
import { Divider, Grid, IconButton } from "@mui/material"
import {
  StyledLocationsTab,
  StyledSettingsColumn,
  StyledSettingsColumnContent,
  StyledSettingsColumnContentHeaderContainer,
  StyledSettingsColumnContentHeaderText,
  StyledSettingsColumnContentList,
  StyledSettingsColumnContentSearchField,
} from "./SettingsPage.styled"
import { ContainedButton } from "../commons/Button"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import theme from "../../theme"
import { rem } from "polished"
import { countryList, regionList, stationList } from "./SettingsPage.data"
import { renderSettingsListItems } from "../../utils/settings"
import AddCountryModal from "./AddCountryModal"
import AddRegionModal from "./AddRegionModal"
import AddStationModal from "./AddStationModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal"

export type DeleteItem = {
  type:
    | "Country"
    | "Region"
    | "Station"
    | "Phone Model"
    | "OS Version"
    | "Flex Version"
    | "Block Type"
  name: string
  id: string
}

const LocationsTab = () => {
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false)
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false)
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null)

  const handleAddCountryModalOpen = () => setIsAddCountryModalOpen(true)
  const handleAddCountryModalClose = () => setIsAddCountryModalOpen(false)

  const handleAddRegionModalOpen = () => setIsAddRegionModalOpen(true)
  const handleAddRegionModalClose = () => setIsAddRegionModalOpen(false)

  const handleAddStationModalOpen = () => setIsAddStationModalOpen(true)
  const handleAddStationModalClose = () => setIsAddStationModalOpen(false)

  const handleDeleteConfirmationModalOpen = (deleteItem: DeleteItem) =>
    setItemToDelete(deleteItem)
  const handleDeleteConfirmationModalClose = () => setItemToDelete(null)

  return (
    <StyledLocationsTab>
      <AddCountryModal
        open={isAddCountryModalOpen}
        handleClose={handleAddCountryModalClose}
        handleAdd={() => {}}
      />
      <AddRegionModal
        open={isAddRegionModalOpen}
        handleClose={handleAddRegionModalClose}
        handleAdd={() => {}}
      />
      <AddStationModal
        open={isAddStationModalOpen}
        handleClose={handleAddStationModalClose}
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
                  Country
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton iconButton onClick={handleAddCountryModalOpen}>
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                placeholder="Search country"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {renderSettingsListItems(countryList, {
                  onEdit: id => {
                    console.log("edit", id)
                  },
                  onDelete: (id, name) => {
                    handleDeleteConfirmationModalOpen({
                      type: "Country",
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
                  Region
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton iconButton onClick={handleAddRegionModalOpen}>
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                placeholder="Search region"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {renderSettingsListItems(regionList, {
                  onEdit: id => {
                    console.log("edit", id)
                  },
                  onDelete: (id, name) => {
                    handleDeleteConfirmationModalOpen({
                      type: "Region",
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
                  Station
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton iconButton onClick={handleAddStationModalOpen}>
                  <AddIcon
                    sx={{ fontSize: 16, color: theme.palette.common.white }}
                  />
                </ContainedButton>
              </StyledSettingsColumnContentHeaderContainer>
              <StyledSettingsColumnContentSearchField
                placeholder="Search station"
                endAdornment={
                  <IconButton sx={{ mr: rem("8px") }}>
                    <SearchIcon />
                  </IconButton>
                }
              />
              <StyledSettingsColumnContentList>
                {renderSettingsListItems(stationList, {
                  onEdit: id => {
                    console.log("edit", id)
                  },
                  onDelete: (id, name) => {
                    handleDeleteConfirmationModalOpen({
                      type: "Station",
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
    </StyledLocationsTab>
  )
}

export default LocationsTab
