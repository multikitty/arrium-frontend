import { Button, useMediaQuery } from "@mui/material"
import { rem } from "polished"
import React from "react"
import { useForm } from "react-hook-form"
import PaperClipIcon from "@/assets/icons/paperclip.svg"
import { devices } from "@/constants/device"
import theme from "@/theme"
import { supportOptions } from "@/validation"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { StyledWarningText } from "@/components/commons/uiComponents"
import {
  StyledFAQPage as StyledSupportPage,
  StyledFAQPageHeader as StyledSupportPageHeader,
} from "@/components/FAQPage/FAQPage.styled"
import {
  StyledContentHeader,
  StyledSupportPageWrapper,
  StyledSupportPageContent,
  StyledSupportInputField,
  StyledSupportTextArea,
  StyledContentBottom,
  StyledAttachmentText,
  StyledButtonContainer,
  StyledSupportFormLabel,
} from "./SupportPage.styled"

const SupportPage = () => {
  type FormPropType = typeof supportOptions.defaultValues

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPropType>(supportOptions)

  const isWebView = useMediaQuery(devices.web.up)

  const onSubmit = (data: FormPropType) => console.log(data)

  return (
    <StyledSupportPage>
      <script
        id="ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=a4713c23-7381-41e4-bfdb-8d6c4d38cd0b"
      />
      <StyledSupportPageHeader>Support</StyledSupportPageHeader>
      <StyledSupportPageWrapper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <StyledSupportPageContent>
          <StyledContentHeader>
            If you have any questions or experiencing some difficulties with the
            app, please, write to us and our support team will get in contact
            with you shortly.
          </StyledContentHeader>
          <StyledSupportFormLabel>Subject</StyledSupportFormLabel>
          <StyledSupportInputField
            placeholder="Subject"
            variant="outlined"
            error={errors.subject && !!errors.subject.message}
            {...register("subject")}
          />
          {errors.subject && (
            <StyledWarningText marginTop={rem("8px")}>
              {errors.subject.message}
            </StyledWarningText>
          )}
          <StyledSupportFormLabel>Message</StyledSupportFormLabel>
          <StyledSupportTextArea
            variant="outlined"
            multiline
            rows={10}
            placeholder="Type your message here..."
            error={errors.message && !!errors.message.message}
            {...register("message")}
          />
          {errors.message && (
            <StyledWarningText marginTop={rem("8px")}>
              {errors.message.message}
            </StyledWarningText>
          )}
          <StyledContentBottom isWebView={isWebView}>
            <label htmlFor="attachment">
              <input style={{ display: "none" }} id="attachment" type="file" />
              <Button
                color="secondary"
                component="span"
                sx={{ textTransform: "capitalize" }}
              >
                <img src={PaperClipIcon} />
                <StyledAttachmentText>Add attachments</StyledAttachmentText>
              </Button>
            </label>
            <StyledButtonContainer>
              {isWebView ? (
                <OutlinedButton
                  type="reset"
                  sx={{
                    whiteSpace: "nowrap",
                    color: theme.palette.grey7,
                    borderColor: theme.palette.grey3,
                    marginRight: rem("10px"),
                  }}
                >
                  Cancel
                </OutlinedButton>
              ) : (
                <OutlinedButton
                  type="reset"
                  sx={{
                    whiteSpace: "nowrap",
                    color: theme.palette.grey7,
                    borderColor: theme.palette.grey3,
                    marginRight: rem("10px"),
                    width: "100%",
                  }}
                >
                  Cancel
                </OutlinedButton>
              )}

              {isWebView ? (
                <ContainedButton sx={{ whiteSpace: "nowrap" }} type="submit">
                  Send
                </ContainedButton>
              ) : (
                <ContainedButton
                  sx={{ whiteSpace: "nowrap", width: "100%" }}
                  type="submit"
                >
                  Send
                </ContainedButton>
              )}
            </StyledButtonContainer>
          </StyledContentBottom>
        </StyledSupportPageContent>
      </StyledSupportPageWrapper>
    </StyledSupportPage>
  )
}

export default SupportPage
