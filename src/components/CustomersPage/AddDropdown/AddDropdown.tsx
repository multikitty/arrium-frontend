import * as React from "react"
import { Menu, MenuItem } from "@mui/material"
import { rem } from "polished"

import { StyledAddDropdownMenuItemText } from "./AddDropdown.styled"
import { LabelledUserRoles } from "@/constants/common"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"

interface AddDropDownProps extends PageProps {
  handleClose: () => void
  anchorEl: null | HTMLElement
  open: boolean
}

const AddDropdown: React.FC<AddDropDownProps> = ({
  handleClose,
  anchorEl,
  open,
  country_code,
}) => {
  const {
    navigateWithQuery: { navigateToAddCustomerPage },
  } = useNavigate({ country_code })

  const renderMenuItem = LabelledUserRoles.map(role => (
    <MenuItem
      dense
      sx={{ py: rem("12px") }}
      onClick={() => navigateToAddCustomerPage(role.value)}
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
