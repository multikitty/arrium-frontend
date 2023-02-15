import React, { useMemo, useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { useForm, useWatch } from "react-hook-form"

import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
} from "@/components/commons/uiComponents"
import { devices } from "@/constants/device"
import formOptions from "@/validation/signin/resetPassword"
import routes from "@/constants/routes"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import InputField from "@/components/commons/InputField"
import { objectLength } from "@/utils"
import HelperText from "@/components/commons/HelperText"
import { REQUIRED_SET_DEFAULT } from "@/components/RegistrationSection/RegistrationSection"
import { RequiredSet } from "@/components/RegistrationSection/RegistrationSection.types"
import {
  atLeastEightChar,
  atLeastOneLowercase,
  atLeastOneNumber,
  atLeastOneUppercase,
} from "@/constants/regex"
import useDeepCompareEffect from "use-deep-compare-effect"
import PasswordValidationPopUp from "@/components/PasswordValidationPopUp/PasswordValidationPopUp"
import brandLogo from "@/assets/icons/arrium_logo.png"

interface ResetPasswordProps extends PageProps {}

const ResetPassword: React.FC<ResetPasswordProps> = ({ country_code }) => {
  const { navigate } = useNavigate({ country_code })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false)
  const [requiredSet, setRequiredSet] =
    useState<RequiredSet>(REQUIRED_SET_DEFAULT)

  type FormPropType = typeof formOptions.defaultValues
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    ...methods
  } = useForm<FormPropType>({
    ...formOptions,
  })
  useWatch({ name: "password", control })
  useWatch({ name: "confirmPassword", control })

  const isWebView = useMediaQuery(devices.web.up)

  const onSubmit = (data: FormPropType) => {
    if (!isPasswordValid) {
      methods.setError("password", {
        message: "Please choose a stronger password",
      })
      return
    }
    console.log("Reset Password Page Form Submit Data: ", data)
    navigate(routes.signin)
  }

  const handleNavigateToHome = () => {
    navigate(routes.home)
  }

  const handleInputFocus = () => {
    setIsPasswordFieldFocused(true)
  }
  const handleInputBlur = () => {
    setIsPasswordFieldFocused(false)
    if (!isPasswordValid && methods.getFieldState("password").isDirty) {
      methods.setError("password", {
        message: "Please choose a stronger password",
      })
    }
  }

  const isPasswordValid = useMemo(
    () =>
      requiredSet.atLeastOneNumber &&
      requiredSet.atLeastOneLowercase &&
      requiredSet.atLeastEightChar &&
      requiredSet.atLeastOneUppercase,
    [requiredSet]
  )

  useDeepCompareEffect(() => {
    setRequiredSet({
      atLeastOneNumber: atLeastOneNumber.test(methods.getValues("password")),
      atLeastOneLowercase: atLeastOneLowercase.test(
        methods.getValues("password")
      ),
      atLeastEightChar: atLeastEightChar.test(methods.getValues("password")),
      atLeastOneUppercase: atLeastOneUppercase.test(
        methods.getValues("password")
      ),
    })
  }, [methods.getValues()])

  const isSubmitDisabled =
    !methods.getValues("password") ||
    !methods.getValues("confirmPassword") ||
    !!objectLength(errors)

  return (
    <React.Fragment>
      {isWebView ? (
        <Box
          display="flex"
          justifyContent="center"
          onClick={handleNavigateToHome}
          my="80px"
        >
          <img
            src={brandLogo}
            style={{ cursor: "pointer" }}
            height="69px"
            width="238px"
          />
        </Box>
      ) : (
        <Box
          height="64px"
          pl="20px"
          display="flex"
          alignItems="center"
          onClick={handleNavigateToHome}
        >
          <img
            src={brandLogo}
            style={{ cursor: "pointer" }}
            height="36px"
            width="126px"
          />
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
            <Box position="relative" mb={errors?.password ? "8px" : 0}>
              <StyledFieldLabel $isHidden={!methods.getValues("password")}>
                New Password
              </StyledFieldLabel>
              <InputField
                placeholder="New password"
                type={isPasswordVisible ? "text" : "password"}
                variant="outlined"
                {...register("password")}
                error={!!errors?.password}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
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
              {isPasswordFieldFocused && (
                <PasswordValidationPopUp
                  isWebView
                  atLeastEightChar={requiredSet.atLeastEightChar}
                  atLeastOneLowercase={requiredSet.atLeastOneLowercase}
                  atLeastOneUppercase={requiredSet.atLeastOneUppercase}
                  atLeastOneNumber={requiredSet.atLeastOneNumber}
                />
              )}
              {errors?.password && (
                <HelperText type="large" mt="-8px">
                  {errors.password.message}
                </HelperText>
              )}
            </Box>
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
              <HelperText type="large" mt="-8px">
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
              <Box position="relative" mb={errors?.password ? "8px" : 0}>
                <StyledFieldLabel $isHidden={!methods.getValues("password")}>
                  New Password
                </StyledFieldLabel>
                <InputField
                  placeholder="New password"
                  type={isPasswordVisible ? "text" : "password"}
                  variant="outlined"
                  {...register("password")}
                  error={!!errors?.password}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
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
                {isPasswordFieldFocused && (
                  <PasswordValidationPopUp
                    isWebView={false}
                    atLeastEightChar={requiredSet.atLeastEightChar}
                    atLeastOneLowercase={requiredSet.atLeastOneLowercase}
                    atLeastOneUppercase={requiredSet.atLeastOneUppercase}
                    atLeastOneNumber={requiredSet.atLeastOneNumber}
                  />
                )}
                {errors?.password && (
                  <HelperText type="large" mt="-8px">
                    {errors.password.message}
                  </HelperText>
                )}
              </Box>
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
                <HelperText type="large" mt="-8px">
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
