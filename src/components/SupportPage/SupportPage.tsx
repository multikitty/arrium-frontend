import { Button } from "@mui/material"
import { rem } from "polished"
import React from "react"
import { useForm } from "react-hook-form"
import PaperClipIcon from "../../assets/icons/paperclip.svg"
import theme from "../../theme"
import { supportFormOptions } from "../../validation"
import { ContainedButton, OutlinedButton } from "../commons/Button"
import { StyledWarningText } from "../commons/commonComponents"
import {
  StyledFAQPage as StyledSupportPage,
  StyledFAQPageHeader as StyledSupportPageHeader,
} from "../FAQPage/FAQPage.styled"

import {
  StyledContentHeader,
  StyledSupportPageWrapper,
  StyledSupportPageContent,
  StyledSupportInputField,
  StyledSupportTextArea,
  StyledContentBottom,
  StyledAttachmentText,
  StyledButtonContainer,
} from "./SupportPage.styled"

const SupportPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(supportFormOptions)

  const onSubmit = (data: any) => console.log(data)

  return (
    <StyledSupportPage>
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
          <StyledSupportInputField
            placeholder="Subject"
            variant="outlined"
            {...register("subject")}
          />
          {errors.subject && (
            <StyledWarningText marginTop={rem("8px")}>
              {errors.subject.message}
            </StyledWarningText>
          )}
          <StyledSupportTextArea
            variant="outlined"
            multiline
            rows={10}
            placeholder="Type your message here..."
            {...register("message")}
          />
          {errors.message && (
            <StyledWarningText marginTop={rem("8px")}>
              {errors.message.message}
            </StyledWarningText>
          )}
          <StyledContentBottom>
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
              <ContainedButton sx={{ whiteSpace: "nowrap" }} type="submit">
                Send
              </ContainedButton>
            </StyledButtonContainer>
          </StyledContentBottom>
        </StyledSupportPageContent>
      </StyledSupportPageWrapper>
    </StyledSupportPage>
  )
}

export default SupportPage
