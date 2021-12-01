import { Box } from "@mui/system"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import {
  StyledButton,
  StyledButtonText,
  StyledCheckBox,
  StyledForgotPassword,
  StyledInputField,
  StyledLoginContainer,
  StyledLoginContainerMobile,
  StyledLoginText,
  StyledRemeberMeText,
  StyledSignUpButton,
  StyledSignUpText,
  StyledTitle,
  StyledTitleMobile,
  StyledWarningText,
} from "../components/commomComponents"
import Seo from "../components/seo"
import TopLayout from "../components/topLayout"
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { IconButton, useMediaQuery } from "@mui/material"
import { Link } from "gatsby"
import { rem } from "polished"

const signin = () => {
  const [isVisible, SetIsVisible] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const isWebView = useMediaQuery("min-width:768px")
  const [isError, SetIsError] = useState<boolean>(false)

  const onSubmit = (data: any) => console.log(data)
  console.log(errors)
  return (
    <TopLayout>
      <Seo title="Sign In | Arrium" />
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
            <Box display="flex" justifyContent="center">
              <StyledLoginText>Login to your account</StyledLoginText>
            </Box>
            <StyledInputField
              placeholder="Enter Email Address"
              variant="outlined"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && (
              <StyledWarningText marginbottom={rem("16px")}>
                Please Enter Email!
              </StyledWarningText>
            )}
            <StyledInputField
              placeholder="Enter Password"
              type={isVisible ? "text" : "password"}
              variant="outlined"
              {...register("password", {
                required: true,
              })}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => SetIsVisible(prev => !prev)}>
                    {isVisible ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                ),
              }}
            />
            {errors.password && (
              <StyledWarningText marginbottom={rem("16px")}>
                Please Enter Password!
              </StyledWarningText>
            )}
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Controller
                  control={control}
                  name="Remember me"
                  render={({ field }) => (
                    <StyledCheckBox
                      type="checkbox"
                      id="rememberMe"
                      {...field}
                    />
                  )}
                />
                <StyledRemeberMeText htmlFor="rememberMe">
                  Remember me
                </StyledRemeberMeText>
              </Box>
              <StyledForgotPassword>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </StyledForgotPassword>
            </Box>
            <Box display="flex" justifyContent="center" mt={rem("16px")}>
              {isError && (
                <StyledWarningText>
                  Your email address or password is incorrect
                </StyledWarningText>
              )}
            </Box>
            <StyledButton
              variant="contained"
              color="primary"
              disableElevation
              margintop={rem("56px")}
              type="submit"
            >
              <StyledButtonText>Log In</StyledButtonText>
            </StyledButton>
            <Box display="flex" justifyContent="center">
              <StyledSignUpText>
                Don't have an account yet?
                <StyledSignUpButton>
                  <Link to="/signup"> Sign Up</Link>
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
                <StyledLoginText>Login to your account</StyledLoginText>
              </Box>
              <StyledInputField
                placeholder="Enter Email Address"
                variant="outlined"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email && (
                <StyledWarningText marginbottom={rem("16px")}>
                  Please Enter Email!
                </StyledWarningText>
              )}
              <StyledInputField
                placeholder="Enter Password"
                type={isVisible ? "text" : "password"}
                variant="outlined"
                {...register("password", {
                  required: true,
                })}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => SetIsVisible(prev => !prev)}>
                      {isVisible ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  ),
                }}
              />
              {errors.password && (
                <StyledWarningText marginbottom={rem("16px")}>
                  Please Enter Password!
                </StyledWarningText>
              )}
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Controller
                    control={control}
                    name="Remember me"
                    render={({ field }) => (
                      <StyledCheckBox
                        type="checkbox"
                        id="rememberMe"
                        {...field}
                      />
                    )}
                  />
                  <StyledRemeberMeText htmlFor="rememberMe">
                    Remember me
                  </StyledRemeberMeText>
                </Box>
                <StyledForgotPassword>
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </StyledForgotPassword>
              </Box>
              <Box display="flex" justifyContent="center" mt={rem("16px")}>
                {isError && (
                  <StyledWarningText>
                    Your email address or password is incorrect
                  </StyledWarningText>
                )}
              </Box>
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
                <StyledSignUpText>Don't have an account yet?</StyledSignUpText>
                <StyledSignUpButton>
                  <Link to="/signup"> Sign Up</Link>
                </StyledSignUpButton>
              </Box>
            </Box>
          </StyledLoginContainerMobile>
        )}
      </Box>
    </TopLayout>
  )
}

export default signin
