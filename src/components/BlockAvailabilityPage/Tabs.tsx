import { Tab, Tabs, styled as muiStyled } from "@mui/material"
import { rem } from "polished"

interface StyledTabProps {
  label: string
  value: any
}

export const StyledTabs = muiStyled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
})

export const StyledTab = muiStyled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "capitalize",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  color: "#585A61",
  fontFamily: ["Inter", "sans-serif"].join(","),
  fontSize: rem("20px"),
  fontWeight: 600,
  "&:hover": {
    color: "#3071F2",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#3071F2",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}))
