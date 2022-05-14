import * as React from "react"
import { navigate } from "gatsby"
import { Menu, MenuItem } from "@mui/material"
import { rem } from "polished"

import { StyledAddDropdownMenuItemText } from "./AddDropdown.styled"
import { AddDropDownProps } from "./AddDropDown.types"
import { LabelledUserRoles } from "@/constants/common"
import { tabs } from "@/components/AddCustomerPage/AddCustomersPage.data"

const AddDropdown: React.FC<AddDropDownProps> = ({
  handleClose,
  anchorEl,
  open,
}) => {
  const renderMenuItem = LabelledUserRoles.map(role => (
    <MenuItem
      dense
      sx={{ py: rem("12px") }}
      onClick={() =>
        navigate(
          `/customers/add?role=${role.value}&tab=${tabs.accountInformation}`
        )
      }
      key={role.value}
    >
      <StyledAddDropdownMenuItemText>
        {role.label}
      </StyledAddDropdownMenuItemText>
    </MenuItem>
  ))

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1))",
          mt: 1,
          borderRadius: rem("20px"),
          padding: rem("12px"),
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {renderMenuItem}
    </Menu>
  )
}

export default AddDropdown
