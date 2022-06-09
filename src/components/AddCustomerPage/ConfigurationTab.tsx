import React, { useState } from "react"
import {
  capitalize,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material"
import {
  StyledConfigurationTab,
  StyledConfigurationTabForm,
  StyledConfigurationTabFormActions,
  StyledConfigurationTabFormField,
  StyledConfigurationTabFormItem,
  StyledConfigurationTabFormLabel,
} from "./AddCustomerPage.styled"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { rem } from "polished"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { Plans } from "@/constants/common"

const ConfigurationTab = () => {
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
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose Device Model
                </MenuItem>
                <MenuItem value="iPhone12">iPhone 12 Pro</MenuItem>
                <MenuItem value="iPhone13">iPhone 13 Pro</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device ID
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                OS version
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose OS version
                </MenuItem>
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
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose Device type
                </MenuItem>
                <MenuItem value="smartphone">Smartphone</MenuItem>
                <MenuItem value="tablet">Tablet</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Device serial number
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex version
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue="none"
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="none">
                  Choose Flex version
                </MenuItem>
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
              <StyledConfigurationTabFormField />
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (1)
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Cognito ID (2)
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField />
            </StyledConfigurationTabFormItem>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Flex ID
              </StyledConfigurationTabFormLabel>
              <StyledConfigurationTabFormField />
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} sx={{ p: rem("8px"), mt: rem("24px") }}>
          {/* Country Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Country
              </StyledConfigurationTabFormLabel>
              <Select
                displayEmpty
                defaultValue=""
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="">
                  Choose Country
                </MenuItem>
                <MenuItem value="Great Britain">Great Britain</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          {/* Region Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Region
              </StyledConfigurationTabFormLabel>
              <Select
                displayEmpty
                defaultValue=""
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value="">Choose Region</MenuItem>
                <MenuItem disabled value="London">
                  London
                </MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          {/* Plan Name Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Plan Name
              </StyledConfigurationTabFormLabel>
              <Select
                defaultValue={capitalize(Plans.basic)}
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem value={capitalize(Plans.basic)}>
                  {capitalize(Plans.basic)}
                </MenuItem>
                <MenuItem value={capitalize(Plans.premium)}>
                  {capitalize(Plans.premium)}
                </MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          {/* Block Type Drop-down */}
          <Grid item xs={12} lg={4}>
            <StyledConfigurationTabFormItem>
              <StyledConfigurationTabFormLabel>
                Block type
              </StyledConfigurationTabFormLabel>
              <Select
                displayEmpty
                defaultValue=""
                input={<StyledConfigurationTabFormField />}
              >
                <MenuItem disabled value="">
                  Choose Block type
                </MenuItem>
                <MenuItem value="logistics">Logistics</MenuItem>
              </Select>
            </StyledConfigurationTabFormItem>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
        <StyledConfigurationTabFormActions>
          <OutlinedButton grey sx={{ mr: rem("12px") }}>
            Cancel
          </OutlinedButton>
          <ContainedButton>Save</ContainedButton>
        </StyledConfigurationTabFormActions>
      </StyledConfigurationTabForm>
    </StyledConfigurationTab>
  )
}

export default ConfigurationTab
