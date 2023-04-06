import React, { useState } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { rem } from "polished"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"

import { devices } from "@/constants/device"
import {
  StyledButton,
  StyledButtonText,
  StyledFieldLabel,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledCardHeader,
  StyledSignUpButton,
  StyledSignUpText,
} from "../commons/uiComponents"
import { SignupStepsProgressMobile } from "../SignupStepsProgress/SignupStepsProgress"
import { StyledText } from "../RegistrationSection/RegistrationSection.styled"
import { FormProps } from "../SignUpPage/SignUpPage"
import routes from "@/constants/routes"
import { FlexInfoResult, FlexInfoVariables } from "@/lib/interfaces/signup"
import { updateFlexInfo } from "@/agent/signup"
import useNavigate from "@/hooks/useNavigate"
import { PageProps } from "@/lib/interfaces/common"
import Hidden from "../Hidden"
import amazonFlexOptions from "@/validation/signup/amazonFlex"
import { Controller, useForm, useWatch } from "react-hook-form"
import HelperText from "../commons/HelperText"
import InputField from "../commons/InputField"
import { objectLength } from "@/utils"

interface AmazonFlexInfoProps extends FormProps, PageProps {}

const AmazonFlexInfo: React.FC<AmazonFlexInfoProps> = ({
  setFormStage,
  stage,
  step,
  country_code,
}) => {
  const {
    navigate,
    navigateWithQuery: { navigateToSignup },
  } = useNavigate({ country_code })
  const { enqueueSnackbar } = useSnackbar()
  const isWebView = useMediaQuery(devices.web.up)
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const { mutate } = useMutation<FlexInfoResult, Error, FlexInfoVariables>(
    updateFlexInfo
  )

  type FormPropType = typeof amazonFlexOptions.defaultValues
  const { handleSubmit, control, formState, reset, setValue, ...methods } =
    useForm<FormPropType>(amazonFlexOptions)
  useWatch({ control })

  const handleNavigateToSignIn = () => {
    navigate(routes.signin)
  }

  const onSubmit = (data: FormPropType) => {
    mutate(
      { amznFlexUser: data.userName, amznFlexPassword: data.password },
      {
        onSuccess({ success, message, validationError }:any) {
          if (!success) {
            enqueueSnackbar(
              validationError?.amznFlexUser ||
                validationError?.amznFlexPassword ||
                validationError?.details?.email?.[0]?.description ? validationError?.details?.email?.[0]?.description :message,
              {
                variant: "error",
              }
            )
            return
          }
          setFormStage((prev: number) => prev + 1)
          navigateToSignup(stage + 1)
        },
      }
    )
  }

  const isSaveDisabled =
    !methods.getValues("userName") ||
    !methods.getValues("password") ||
    !methods.getValues("confirmPassword") ||
    !!objectLength(formState.errors)

  return (
    <React.Fragment>
      {isWebView ? (
        <StyledLoginContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box display="flex" justifyContent="center">
            <StyledCardHeader>Sign up</StyledCardHeader>
          </Box>
          <StyledText>Please enter your Amazon Flex account details</StyledText>
          {/* User Name Field */}
          <Box mt={2}>
            <StyledFieldLabel $isHidden={!methods.getValues("userName")}>
              Amazon Flex Username
            </StyledFieldLabel>
            <Controller
              name={"userName"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  InputProps={{
                    autoComplete: "off",
                  }}
                  autoComplete="off"
                  name="amazon-flex-username"
                  placeholder="Amazon Flex Username"
                  variant="outlined"
                  type="email"
                  value={value}
                  onChange={onChange}
                  error={!!formState.errors?.userName}
                  required
                />
              )}
            />
            {!!formState.errors?.userName && (
              <HelperText mb="12px" type="large" mt="-12px">
                {formState.errors?.userName?.message}
              </HelperText>
            )}
          </Box>
          {/* Password Field */}
          <Box>
            <StyledFieldLabel $isHidden={!methods.getValues("password")}>
              Amazon Flex Password
            </StyledFieldLabel>
            <Controller
              name={"password"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  name="amazon-flex-password"
                  placeholder="Amazon Flex Password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={value}
                  onChange={e => {
                    onChange(e)
                    if (!methods.getFieldState("confirmPassword").error) return
                    methods.trigger("confirmPassword")
                  }}
                  variant="outlined"
                  required
                  autoComplete="new-password"
                  InputProps={{
                    autoComplete: "new-password",
                    endAdornment: (
                      <IconButton
                        onClick={() => setPasswordVisible(prev => !prev)}
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
              )}
            />
            {!!formState.errors?.password && (
              <HelperText mb="12px" type="large" mt="-12px">
                {formState.errors?.password?.message}
              </HelperText>
            )}
          </Box>
          {/* Confirm Password Field */}
          <Hidden when={!methods.getValues("password")}>
            <StyledFieldLabel $isHidden={!methods.getValues("confirmPassword")}>
              Confirm Password
            </StyledFieldLabel>
            <Controller
              name={"confirmPassword"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputField
                  name="amazon-flex-confirm-password"
                  placeholder="Confirm Password"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={value}
                  onChange={onChange}
                  variant="outlined"
                  error={!!formState.errors?.confirmPassword}
                  required
                  autoComplete="new-password"
                  InputProps={{
                    autoComplete: "new-password",
                    endAdornment: (
                      <IconButton
                        onClick={() => setConfirmPasswordVisible(prev => !prev)}
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
              )}
            />
            {!!formState.errors?.confirmPassword && (
              <HelperText mb="12px" type="large" mt="-12px">
                {formState.errors?.confirmPassword?.message}
              </HelperText>
            )}
          </Hidden>
          <StyledButton
            variant="contained"
            color="primary"
            disableElevation
            $marginTop={rem("56px")}
            type="submit"
            disabled={isSaveDisabled}
          >
            <StyledButtonText>Continue</StyledButtonText>
          </StyledButton>
          <Box display="flex" justifyContent="center">
            <StyledSignUpText>
              Already have an account?
              <StyledSignUpButton onClick={handleNavigateToSignIn}>
                Log in
              </StyledSignUpButton>
            </StyledSignUpText>
          </Box>
        </StyledLoginContainer>
      ) : (
        <StyledLoginContainerMobile
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {!isWebView && (
            <SignupStepsProgressMobile stage={stage} steps={step} />
          )}
          <Box
            display="flex"
            flexDirection="column"
            maxWidth={rem("375px")}
            mx={"auto"}
          >
            <Box display="flex" justifyContent="center">
              <StyledCardHeader>Sign up</StyledCardHeader>
            </Box>
            <Box mt={2}>
              <StyledFieldLabel $isHidden={!methods.getValues("userName")}>
                Amazon Flex Username
              </StyledFieldLabel>
              <Controller
                name={"userName"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    autoComplete="off"
                    InputProps={{
                      autoComplete: "off",
                    }}
                    name="amazon-flex-username"
                    placeholder="Amazon Flex Username"
                    variant="outlined"
                    type="email"
                    value={value}
                    onChange={onChange}
                    error={!!formState.errors?.userName}
                    required
                  />
                )}
              />
              {!!formState.errors?.userName && (
                <HelperText mb="12px" type="large" mt="-12px">
                  {formState.errors?.userName?.message}
                </HelperText>
              )}
            </Box>
            {/* Password Field */}
            <Box>
              <StyledFieldLabel $isHidden={!methods.getValues("password")}>
                Amazon Flex Password
              </StyledFieldLabel>
              <Controller
                name={"password"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    name="amazon-flex-password"
                    placeholder="Amazon Flex Password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    variant="outlined"
                    required
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setPasswordVisible(prev => !prev)}
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
                )}
              />
              {!!formState.errors?.password && (
                <HelperText mb="12px" type="large" mt="-12px">
                  {formState.errors?.password?.message}
                </HelperText>
              )}
            </Box>
            {/* Confirm Password Field */}
            <Hidden when={!methods.getValues("password")}>
              <StyledFieldLabel
                $isHidden={!methods.getValues("confirmPassword")}
              >
                Confirm Password
              </StyledFieldLabel>
              <Controller
                name={"confirmPassword"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    name="amazon-flex-confirm-password"
                    placeholder="Confirm Password"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    variant="outlined"
                    required
                    autoComplete="new-password"
                    InputProps={{
                      autoComplete: "new-password",
                      endAdornment: (
                        <IconButton
                          onClick={() =>
                            setConfirmPasswordVisible(prev => !prev)
                          }
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
                )}
              />
              {!!formState.errors?.confirmPassword && (
                <HelperText mb="12px" type="large" mt="-12px">
                  {formState.errors?.confirmPassword?.message}
                </HelperText>
              )}
            </Hidden>
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              $marginTop={rem("56px")}
              type="submit"
              disabled={isSaveDisabled}
            >
              <StyledButtonText>Continue</StyledButtonText>
            </StyledButton>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <StyledSignUpText>Already have an account?</StyledSignUpText>
              <StyledSignUpButton onClick={handleNavigateToSignIn}>
                Log In
              </StyledSignUpButton>
            </Box>
          </Box>
        </StyledLoginContainerMobile>
      )}
    </React.Fragment>
  )
}

export default AmazonFlexInfo
