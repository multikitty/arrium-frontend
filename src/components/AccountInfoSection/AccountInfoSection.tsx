import React from "react"
import { FormProps } from "../../pages/signup"
import { useForm } from "react-hook-form"
import { Box, useMediaQuery } from "@mui/material"
import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledSignUpButton,
  StyledSignUpText,
} from "../commomComponents"
import { rem } from "polished"
import { Link } from "gatsby"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

const AccountInfoSection: React.FC<FormProps> = ({ setFormStage }) => {
  const isWebView = useMediaQuery("(min-width:768px)")
  const [age, setAge] = React.useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  const onSubmit = (data: any) => {
    console.log(data)
    setFormStage(prev => prev + 1)
  }

  const { handleSubmit } = useForm()
  return isWebView ? (
    <StyledLoginContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <StyledLoginText>Sign up</StyledLoginText>
      </Box>
      <StyledInputField
        type="text"
        placeholder="First Name"
        variant="outlined"
      />

      <StyledInputField placeholder="Surname" type="text" variant="outlined" />
      <StyledInputField placeholder="6-digit code" variant="outlined" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <StyledButton
        variant="contained"
        color="primary"
        disableElevation
        margintop={rem("56px")}
        type="submit"
      >
        <StyledButtonText>Continue</StyledButtonText>
      </StyledButton>
      <Box display="flex" justifyContent="center">
        <StyledSignUpText>
          Already have an account?
          <StyledSignUpButton>
            <Link to="/signin"> Log in</Link>
          </StyledSignUpButton>
        </StyledSignUpText>
      </Box>
    </StyledLoginContainer>
  ) : (
    <StyledLoginContainerMobile
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={rem("375px")}
        mx={"auto"}
      >
        <Box display="flex" justifyContent="center">
          <StyledLoginText>Sign up</StyledLoginText>
        </Box>
        <StyledInputField placeholder="First Name" variant="outlined" />
        <StyledInputField placeholder="Surname" variant="outlined" />
        <StyledInputField placeholder="6-digit code" variant="outlined" />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <StyledButton
          variant="contained"
          color="primary"
          disableElevation
          margintop={rem("56px")}
          type="submit"
        >
          <StyledButtonText>Log In</StyledButtonText>
        </StyledButton>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <StyledSignUpText>Already have an account?</StyledSignUpText>
          <StyledSignUpButton>
            <Link to="/signin">Log In</Link>
          </StyledSignUpButton>
        </Box>
      </Box>
    </StyledLoginContainerMobile>
  )
}

export default AccountInfoSection
