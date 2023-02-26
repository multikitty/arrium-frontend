import React from "react"
import { Box, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"
import EditIcon from "@mui/icons-material/EditOutlined"

import { StyledSettingsColumnContentListItem } from "@/components/SettingsPage/SettingsPage.styled"
import { RegionListDataItem } from "@/lib/interfaces/locations"
import { PALETTE } from "@/constants/colors"
import { RegionToEditType } from "@/components/SettingsPage/LocationsTab"

interface RegionListProps {
  data: RegionListDataItem[]
  onDelete: (sk: string, pk: string, name: string) => void
  onClick: (selectedRegion: RegionListDataItem) => void
  onEdit: (region: Omit<RegionToEditType, "countryCode">) => void
  selectedRegion: RegionListDataItem | null
}

const RegionList: React.FC<RegionListProps> = ({
  data,
  onDelete,
  onClick,
  onEdit,
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
                onClick={() =>
                  onEdit({
                    regSk: item.sk,
                    regionName: item.regionName,
                    regionID: item.regionID,
                    regionCode: item.regionCode,
                  })
                }
                sx={{
                  "&:hover .settings__list__item__actions__icon": {
                    color: PALETTE.main,
                  },
                }}
              >
                <EditIcon
                  className="settings__list__item__actions__icon"
                  sx={{ fontSize: 16 }}
                />
              </IconButton>
              <IconButton
                onClick={() => onDelete(item.sk, item.pk, item.regionName)}
                sx={{
                  "&:hover .settings__list__item__actions__icon": {
                    color: PALETTE.errorText,
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
