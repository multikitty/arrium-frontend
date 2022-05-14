import React from "react"
import EditIcon from "@mui/icons-material/EditOutlined"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { StyledSettingsColumnContentListItem } from "@/components/SettingsPage/SettingsPage.styled"
import { Box, IconButton } from "@mui/material"
import theme from "@/theme"

type ListItem = {
  name: string
  id: string
}

interface IProps {
  list: ListItem[]
  onEdit: (itemId: string) => void
  onDelete: (itemId: string, itemName: string) => void
}

const SettingsListItem: React.FC<IProps> = ({ list, onEdit, onDelete }) => {
  return (
    <React.Fragment>
      {list.map(item => {
        return (
          <StyledSettingsColumnContentListItem key={item.id}>
            <Box className="settings__list__item__text">{item.name}</Box>
            <Box className="settings__list__item__actions">
              <IconButton
                onClick={() => onEdit(item.id)}
                sx={{
                  "&:hover .settings__list__item__actions__icon": {
                    color: theme.palette.main,
                  },
                }}
              >
                <EditIcon
                  className="settings__list__item__actions__icon"
                  sx={{ fontSize: 16 }}
                />
              </IconButton>
              <IconButton
                onClick={() => onDelete(item.id, item.name)}
                sx={{
                  "&:hover .settings__list__item__actions__icon": {
                    color: theme.palette.main,
                  },
                }}
              >
                <DeleteIcon
                  className="settings__list__item__actions__icon"
                  sx={{ fontSize: 16 }}
                />
              </IconButton>
            </Box>
          </StyledSettingsColumnContentListItem>
        )
      })}
    </React.Fragment>
  )
}

export default SettingsListItem
