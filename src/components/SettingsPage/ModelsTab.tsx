import React from "react"
import theme from "../../theme"
import { ContainedButton } from "../commons/Button"
import {
  StyledModelsTab,
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

const ModelsTab = () => {
  return (
    <StyledModelsTab>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} lg={4}>
          <StyledSettingsColumn>
            <StyledSettingsColumnContent>
              <StyledSettingsColumnContentHeaderContainer>
                <StyledSettingsColumnContentHeaderText>
                  Phone model
                </StyledSettingsColumnContentHeaderText>
                <ContainedButton iconButton>
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
                <ContainedButton iconButton>
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
                <ContainedButton iconButton>
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
            </StyledSettingsColumnContent>
          </StyledSettingsColumn>
        </Grid>
      </Grid>
    </StyledModelsTab>
  )
}

export default ModelsTab
