import React, { useState } from "react"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { StyledSettingsColumnContentListItem } from "@/components/SettingsPage/SettingsPage.styled"
import { Box, IconButton } from "@mui/material"
import theme from "@/theme"
import {
  ICountryListDataItem,
  IRegionListDataItem,
} from "@/lib/interfaces/locations"

type ListItem = {
  name: string
  id: string
}

interface IProps {
  list: ICountryListDataItem[] | IRegionListDataItem[] | ListItem[]
  onDelete: (sk: string, pk: string) => void
  onClick?: (...params: any) => void
}

const SettingsListItem: React.FC<IProps> = ({ list, onDelete, onClick }) => {
  const [selectedItem, setSelectedItem] = useState<
    ICountryListDataItem | IRegionListDataItem | ListItem | null
  >(null)

  return (
    <React.Fragment>
      {list.map(item => {
        return (
          <StyledSettingsColumnContentListItem
            key={(item as ListItem)?.id || (item as ICountryListDataItem)?.sk}
            onClick={() =>
              onClick &&
              (() => {
                onClick(item)
                setSelectedItem(item)
              })()
            }
            selected={
              (selectedItem as ICountryListDataItem)?.sk
                ? (selectedItem as ICountryListDataItem)?.sk ===
                  (item as ICountryListDataItem)?.sk
                : false
            }
          >
            <Box className="settings__list__item__text">
              {(item as ListItem)?.name ||
                `${(item as ICountryListDataItem)?.country} (${
                  (item as ICountryListDataItem)?.tzName ||
                  (item as ICountryListDataItem)?.countryCode
                })`}
            </Box>
            <Box className="settings__list__item__actions">
              <IconButton
                onClick={() =>
                  onDelete(
                    (item as ICountryListDataItem).sk || "",
                    (item as ICountryListDataItem).pk || ""
                  )
                }
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
