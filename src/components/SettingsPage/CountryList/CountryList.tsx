import React from "react"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { StyledSettingsColumnContentListItem } from "@/components/SettingsPage/SettingsPage.styled"
import { Box, IconButton } from "@mui/material"
import theme from "@/theme"
import { ICountryListDataItem } from "@/lib/interfaces/locations"
import { capitalCase } from "change-case"

interface IProps {
  data: ICountryListDataItem[]
  onDelete: (sk: string, pk: string, name: string) => void
  onClick: (selectedCountry: ICountryListDataItem) => void
  selectedCountry: ICountryListDataItem | null
}

const CountryList: React.FC<IProps> = ({
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
              {`${capitalCase(item.country)} ${
                item.tzName ? `(${item.tzName})` : ""
              }`}
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
