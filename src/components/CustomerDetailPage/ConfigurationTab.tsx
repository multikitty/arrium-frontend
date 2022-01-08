import React, { useState } from "react"
import { Divider, Grid, IconButton, MenuItem, Select } from "@mui/material"
import {
  StyledConfigurationTab,
  StyledConfigurationTabForm,
  StyledConfigurationTabFormActions,
  StyledConfigurationTabFormField,
  StyledConfigurationTabFormItem,
  StyledConfigurationTabFormLabel,
} from "./CustomerDetailPage.styled"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { ITabProps } from "./AccountInformationTab"

const ConfigurationTab = (props: ITabProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const handleToggleHidePassword = () => {
    setIsPasswordHidden(p => !p)
  }

  return (
    <StyledConfigurationTab>
      <StyledConfigurationTabForm>
        <Grid container spacing={2} sx={{ p: rem("8px") }}>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon Flex Username
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField placeholder="Username here" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device Model
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="iPhone12"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="iPhone12">iPhone 12 Pro</MenuItem>
                <MenuItem value="iPhone13">iPhone 13 Pro</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device ID
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="HJ9845632" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                OS version
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="iOS 12.4"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="iOS 12.4">iOS 12.4</MenuItem>
                <MenuItem value="iOS 12.8">iOS 12.8</MenuItem>
                <MenuItem value="iOS 13.0">iOS 13.0</MenuItem>
                <MenuItem value="iOS 14.8">iOS 14.8</MenuItem>
                <MenuItem value="iOS 15">iOS 15</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon Flex Password
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField
                type={isPasswordHidden ? "password" : "text"}
                defaultValue="idekwhatitis"
                endAdornment={
                  <IconButton
                    size="small"
                    onClick={handleToggleHidePassword}
                    sx={{ mr: rem("8px") }}
                  >
                    {isPasswordHidden ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                }
              />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device type
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="smartphone"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="smartphone">Smartphone</MenuItem>
                <MenuItem value="tablet">Tablet</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device serial number
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="J82744HK82374LC" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex version
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="14.0.1"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="14.0.1">14.0.1</MenuItem>
                <MenuItem value="17.8.1">17.8.1</MenuItem>
                <MenuItem value="17.8.2">17.8.2</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} sx={{ p: rem("8px"), mt: rem("24px") }}>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                AWS Region
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose region here
                </MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                AWS Region
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose region here
                </MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Amazon ID
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="C123J456" />
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (1)
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="HFSDUEYWWS" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (2)
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="KSGDSFTYASL" />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex ID
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField defaultValue="sjf8345df9086" />
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} sx={{ p: rem("8px"), mt: rem("24px") }}>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Country
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="Great Britain"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="Great Britain">Great Britain</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Region
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="London"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="London">
                  London
                </MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Block type
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="logistics"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="logistics">
                  Logistics
                </MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
        </Grid>
        <StyledConfigurationTabFormActions>
          <OutlinedButton
            grey
            sx={{ mr: rem("12px") }}
            onClick={props.handleCancel}
          >
            Cancel
          </OutlinedButton>
          <ContainedButton onClick={props.handleSave}>Save</ContainedButton>
        </StyledConfigurationTabFormActions>
      </StyledConfigurationTabForm>
    </StyledConfigurationTab>
  )
}

export default ConfigurationTab
