import React from "react"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { StyledSettingsColumnContentListItem } from "@/components/SettingsPage/SettingsPage.styled"
import { Box, IconButton } from "@mui/material"
import theme from "@/theme"
import { IRegionListDataItem } from "@/lib/interfaces/locations"

interface IProps {
  data: IRegionListDataItem[]
  onDelete: (sk: string, pk: string, name: string) => void
  onClick: (selectedRegion: IRegionListDataItem) => void
  selectedRegion: IRegionListDataItem | null
}

const RegionList: React.FC<IProps> = ({
  data,
  onDelete,
  onClick,
  selectedRegion,
}) => {
  return (
    <React.Fragment>
      {data.map(item => {
        return (
          <StyledSettingsColumnContentListItem
            key={item.sk}
            onClick={() => onClick(item)}
            selected={
              selectedRegion?.sk ? selectedRegion?.sk === item?.sk : false
            }
          >
            <Box className="settings__list__item__text">{item.regionName}</Box>
            <Box className="settings__list__item__actions">
              <IconButton
                onClick={() => onDelete(item.sk, item.pk, item.regionName)}
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

export default RegionList
