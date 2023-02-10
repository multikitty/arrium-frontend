import React, { useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { useForm } from "react-hook-form"

import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
  StyledTitle,
  StyledTitleMobile,
} from "@/components/commons/uiComponents"
import { devices } from "@/constants/device"
import formOptions from "@/validation/signin/resetPassword"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import InputField from "@/components/commons/InputField"
import { objectLength } from "@/utils"
import HelperText from "@/components/commons/HelperText"

interface ResetPasswordProps extends PageProps {}

const ResetPassword: React.FC<ResetPasswordProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  type FormPropType = typeof formOptions.defaultValues
  const {
    register,
    handleSubmit,
    formState: { errors },
    ...methods
  } = useForm<FormPropType>({
    ...formOptions,
  })
  methods.watch("password")
  methods.watch("confirmPassword")

  const isWebView = useMediaQuery(devices.web.up)

  const onSubmit = (data: FormPropType) => {
    console.log("Reset Password Page Form Submit Data: ", data)
    navigate(routes.signin)
  }

  const isSubmitDisabled =
    !methods.getValues("password") ||
    !methods.getValues("confirmPassword") ||
    !!objectLength(errors)

  return (
    <React.Fragment>
      {isWebView ? (
        <Box display="flex" justifyContent="center">
          <StyledTitle>Arrium</StyledTitle>
        </Box>
      ) : (
        <Box height="64px" display="flex" alignItems="center">
          <StyledTitleMobile>Arrium</StyledTitleMobile>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexDirection="column">
        {isWebView ? (
          <StyledLoginContainer onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <StyledCardHeader>Reset Password</StyledCardHeader>
            </Box>
            <StyledFieldLabel $isHidden={!methods.getValues("password")}>
              New Password
            </StyledFieldLabel>
            <InputField
              placeholder="New password"
              type={isPasswordVisible ? "text" : "password"}
              variant="outlined"
              {...register("password")}
              error={!!errors?.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setIsPasswordVisible(prev => !prev)}
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
            {errors?.password && (
              <HelperText type="large" mt="-12px">
                {errors.password.message}
              </HelperText>
            )}
            <StyledFieldLabel $isHidden={!methods.getValues("confirmPassword")}>
              Confirm new Password
            </StyledFieldLabel>
            <InputField
              placeholder="Confirm new password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              variant="outlined"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
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
            {errors?.confirmPassword && (
              <HelperText type="large" mt="-12px">
                {errors.confirmPassword.message}
              </HelperText>
            )}
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
              $marginTop="32px"
              disabled={isSubmitDisabled}
            >
              <StyledButtonText>Save</StyledButtonText>
            </StyledButton>
          </StyledLoginContainer>
        ) : (
          <StyledLoginContainerMobile onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth="375px"
              mx={"auto"}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <StyledCardHeader>Reset Password</StyledCardHeader>
              </Box>
              <StyledFieldLabel $isHidden={!methods.getValues("password")}>
                New Password
              </StyledFieldLabel>
              <InputField
                placeholder="New password"
                type={isPasswordVisible ? "text" : "password"}
                variant="outlined"
                {...register("password")}
                error={!!errors.password}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setIsPasswordVisible(prev => !prev)}
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
              {errors?.password && (
                <HelperText type="large" mt="-12px">
                  {errors.password.message}
                </HelperText>
              )}
              <StyledFieldLabel
                $isHidden={!methods.getValues("confirmPassword")}
              >
                Confirm new Password
              </StyledFieldLabel>
              <InputField
                placeholder="Confirm new password"
                type={isConfirmPasswordVisible ? "text" : "password"}
                variant="outlined"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
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
              {errors?.confirmPassword && (
                <HelperText type="large" mt="-12px">
                  {errors.confirmPassword.message}
                </HelperText>
              )}
              <StyledButton
                variant="contained"
                color="primary"
                type="submit"
                disableElevation
                $marginTop="32px"
                disabled={isSubmitDisabled}
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
