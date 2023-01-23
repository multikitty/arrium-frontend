import React from "react"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { StyledSettingsColumnContentListItem } from "@/components/SettingsPage/SettingsPage.styled"
import { Box, IconButton } from "@mui/material"
import theme from "@/theme"
import { CountryListDataItem } from "@/lib/interfaces/locations"
import { capitalCase } from "change-case"

interface CountryListProps {
  data: CountryListDataItem[]
  onDelete: (sk: string, pk: string, name: string) => void
  onClick: (selectedCountry: CountryListDataItem) => void
  selectedCountry: CountryListDataItem | null
}

const CountryList: React.FC<CountryListProps> = ({
  data,
  onDelete,
  onClick,
  selectedCountry,
}) => {
  return (
    <React.Fragment>
      {data.map(item => {
        return (
          <StyledSettingsColumnContentListItem
            key={item.sk}
            onClick={() => onClick(item)}
            selected={
              selectedCountry?.sk ? selectedCountry?.sk === item?.sk : false
            }
          >
            <Box className="settings__list__item__text">
              {capitalCase(item.country)}
            </Box>
            <Box className="settings__list__item__actions">
              <IconButton
                onClick={() => onDelete(item.sk, item.pk, item.country)}
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

export default CountryList
