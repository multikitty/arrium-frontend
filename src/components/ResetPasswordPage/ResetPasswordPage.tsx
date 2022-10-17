import React, { useEffect, useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { rem } from "polished"
import { useForm } from "react-hook-form"

import {
  StyledButton,
  StyledButtonText,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledTitle,
  StyledTitleMobile,
  StyledWarningText,
} from "@/components/commons/uiComponents"
import { devices } from "@/constants/device"
import formOptions from "@/validation/emailAndPassword"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { IPageProps } from "@/lib/interfaces/common"

interface IResetPasswordProps extends IPageProps {}

const ResetPassword: React.FC<IResetPasswordProps> = ({
  country_code,
  lang,
}) => {
  const { navigate } = useNavigate({ country_code, lang })
  const [isPasswordVisible, SetIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, SetIsConfirmPasswordVisible] =
    useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isMatches, setIsMatches] = useState(false)

  type formPropType = typeof formOptions.defaultValues
  const { register, handleSubmit } = useForm<formPropType>(formOptions)

  useEffect(() => {
    if (password?.length > 0 || confirmPassword?.length > 0)
      setIsMatches(password === confirmPassword)
  }, [password, confirmPassword])

  const isWebView = useMediaQuery(devices.web.up)

  const onSubmit = (data: formPropType) => {
    console.log("Reset Password Page Form Submit Data: ", data)
    navigate(routes.signin)
  }

  return (
    <React.Fragment>
      {isWebView ? (
        <Box display="flex" justifyContent="center">
          <StyledTitle>Arrium</StyledTitle>
        </Box>
      ) : (
        <Box height={rem("64px")} display="flex" alignItems="center">
          <StyledTitleMobile>Arrium</StyledTitleMobile>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        {isWebView ? (
          <StyledLoginContainer
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <StyledLoginText>Reset Password</StyledLoginText>
            </Box>
            <StyledInputField
              placeholder="New password"
              type={isPasswordVisible ? "text" : "password"}
              variant="outlined"
              value={password}
              {...register("password")}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => SetIsPasswordVisible(prev => !prev)}
                  >
                    {isPasswordVisible ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                ),
              }}
            />
            <StyledInputField
              placeholder="Confirm new password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => SetIsConfirmPasswordVisible(prev => !prev)}
                  >
                    {isConfirmPasswordVisible ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                ),
              }}
            />
            {password.length > 0 && !isMatches ? (
              <StyledWarningText>Both Passwords should match</StyledWarningText>
            ) : null}
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
              disabled={!isMatches}
              $marginTop={rem("32px")}
            >
              <StyledButtonText>Save</StyledButtonText>
            </StyledButton>
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
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <StyledLoginText>Reset Password</StyledLoginText>
              </Box>
              <StyledInputField
                placeholder="New password"
                type={isPasswordVisible ? "text" : "password"}
                variant="outlined"
                value={password}
                {...register("password")}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => SetIsPasswordVisible(prev => !prev)}
                    >
                      {isPasswordVisible ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <StyledInputField
                placeholder="Confirm new password"
                type={isConfirmPasswordVisible ? "text" : "password"}
                variant="outlined"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => SetIsConfirmPasswordVisible(prev => !prev)}
                    >
                      {isConfirmPasswordVisible ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  ),
                }}
              />
              {password.length > 0 && !isMatches ? (
                <StyledWarningText>
                  Both Passwords should match
                </StyledWarningText>
              ) : null}
              <StyledButton
                variant="contained"
                color="primary"
                type="submit"
                disableElevation
                disabled={!isMatches}
                $marginTop={rem("32px")}
              >
                <StyledButtonText>Save</StyledButtonText>
              </StyledButton>
            </Box>
          </StyledLoginContainerMobile>
        )}
      </Box>
    </React.Fragment>
  )
}

export default ResetPassword
