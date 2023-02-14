import * as React from "react"
import {
  StyledPasswordValidationContainer,
  StyledValidationText,
  StyledValidationTextWrapper,
} from "@/components/RegistrationSection/RegistrationSection.styled"
import RightCheckMarkIcon from "@/assets/icons/checkmark_icon.svg"
import RightCheckGreenMarkIcon from "@/assets/icons/checkmark-green_icon.svg"

type PasswordValidationPopUpProps = {
  isWebView: boolean
  atLeastEightChar?: boolean
  atLeastOneUppercase?: boolean
  atLeastOneLowercase?: boolean
  atLeastOneNumber?: boolean
}

const PasswordValidationPopUp: React.FC<PasswordValidationPopUpProps> =
  props => {
    return (
      <StyledPasswordValidationContainer isWebView={props.isWebView}>
        {props.atLeastEightChar !== undefined && (
          <StyledValidationTextWrapper isRequired={!props.atLeastEightChar}>
            {!props.atLeastEightChar ? (
              <img src={RightCheckMarkIcon} />
            ) : (
              <img src={RightCheckGreenMarkIcon} />
            )}
            <StyledValidationText>minimum 8 characters</StyledValidationText>
          </StyledValidationTextWrapper>
        )}
        {props.atLeastOneUppercase !== undefined && (
          <StyledValidationTextWrapper isRequired={!props.atLeastOneUppercase}>
            {!props.atLeastOneUppercase ? (
              <img src={RightCheckMarkIcon} />
            ) : (
              <img src={RightCheckGreenMarkIcon} />
            )}
            <StyledValidationText>1 uppercase</StyledValidationText>
          </StyledValidationTextWrapper>
        )}
        {props.atLeastOneLowercase !== undefined && (
          <StyledValidationTextWrapper isRequired={!props.atLeastOneLowercase}>
            {!props.atLeastOneLowercase ? (
              <img src={RightCheckMarkIcon} />
            ) : (
              <img src={RightCheckGreenMarkIcon} />
            )}
            <StyledValidationText>1 lowercase</StyledValidationText>
          </StyledValidationTextWrapper>
        )}
        {props.atLeastOneNumber !== undefined && (
          <StyledValidationTextWrapper isRequired={!props.atLeastOneNumber}>
            {!props.atLeastOneNumber ? (
              <img src={RightCheckMarkIcon} />
            ) : (
              <img src={RightCheckGreenMarkIcon} />
            )}
            <StyledValidationText>1 number</StyledValidationText>
          </StyledValidationTextWrapper>
        )}
      </StyledPasswordValidationContainer>
    )
  }

export default PasswordValidationPopUp
