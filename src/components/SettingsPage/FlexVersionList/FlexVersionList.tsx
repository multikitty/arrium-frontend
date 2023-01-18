import React from "react"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { StyledSettingsColumnContentListItem } from "@/components/SettingsPage/SettingsPage.styled"
import { Box, IconButton } from "@mui/material"
import theme from "@/theme"
import { FlexVersionListDataItem } from "@/lib/interfaces/models"

interface FlexVersionListProps {
  data: FlexVersionListDataItem[]
  onDelete: (sk: string, pk: string, name: string) => void
}

const FlexVersionList: React.FC<FlexVersionListProps> = ({
  data,
  onDelete,
}) => {
  return (
    <React.Fragment>
      {data.map(item => {
        return (
          <StyledSettingsColumnContentListItem key={item.sk}>
            <Box className="settings__list__item__text">{item.flexVersion}</Box>
            <Box className="settings__list__item__actions">
              <IconButton
                onClick={() => onDelete(item.sk, item.pk, item.flexVersion)}
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

export default FlexVersionList
