import React from "react"
import theme from "../../theme"
import { ContainedButton } from "../commons/Button"
import {
  StyledStationTypesTab,
  StyledSettingsColumn,
  StyledSettingsColumnContent,
  StyledSettingsColumnContentHeaderContainer,
  StyledSettingsColumnContentHeaderText,
  StyledSettingsColumnContentSearchField,
} from "./SettingsPage.styled"
import { Divider, Grid, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import { rem } from "polished"

const StationTypesTab = () => {
  return (
    <StyledStationTypesTab>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} lg={4}>
          <StyledSettingsColumn>
            <StyledSettingsColumnContent>
              <StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentHeaderText>
                  Block type
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton iconButton>
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
            </StyledSettingsColumnContent>
            <Divider orientation="vertical" flexItem />
          </StyledSettingsColumn>
        </Grid>
      </Grid>
    </StyledStationTypesTab>
  )
}

export default StationTypesTab
