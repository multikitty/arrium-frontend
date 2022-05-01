import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import ActiveCheckMark from "../../assets/icons/checkmark_main_icon.inline.svg"
import CompletedCheckMark from "../../assets/icons/checkmark_white_icon.inline.svg"
import InactiveCheckMark from "../../assets/icons/checkmark_grey_icon.inline.svg"
import {
  StyledSeparator,
  StyledStepper,
  StyledStepperNode,
  StyledStepperNodeWrapper,
  StyledStepText,
  StyledStepTextMobile,
  StyledStepTextTwo,
  StyledStepTwoTextMobile,
} from "./SignupStepsProgress.styled"
import { rem } from "polished"
import {
  EState,
  NodeProps,
  StepMobileProps,
  StepProps,
} from "./SignupStepsProgress.types"

const StepperNode: React.FC<NodeProps> = ({
  stage,
  steps,
  index,
  lastNode,
}) => {
  const [state, setState] = useState<EState>(EState.inactive)

  useEffect(() => {
    if (index === stage) setState(EState.active)
    else if (index > stage) setState(EState.inactive)
    else setState(EState.completed)
  }, [stage])

  return (
    <StyledStepperNodeWrapper state={state}>
      <StyledStepperNode state={state}>
        {state === EState.active && <ActiveCheckMark />}
        {state === EState.inactive && <InactiveCheckMark />}
        {state === EState.completed && <CompletedCheckMark />}
      </StyledStepperNode>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <StyledStepText>STEP {index + 1}</StyledStepText>
        <StyledStepTextTwo state={state}>{steps}</StyledStepTextTwo>
      </Box>
      <Box display="flex" alignItems="center">
        <StyledSeparator state={state} lastNode={lastNode} />
      </Box>
    </StyledStepperNodeWrapper>
  )
}

const SignupStepsProgress: React.FC<StepProps> = ({ steps, stage }) => {
  return (
    <StyledStepper>
      {steps.map((step, index) => {
        return (
          <StepperNode
            key={`key-${index}`}
            index={index}
            stage={stage}
            steps={step}
            lastNode={index === steps.length - 1}
          />
        )
      })}
    </StyledStepper>
  )
}

export const SignupStepsProgressMobile: React.FC<StepMobileProps> = ({
  stage,
  steps,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={rem("32px")}
    >
      <StyledStepTextMobile>STEP {stage + 1} OF 5</StyledStepTextMobile>
      <StyledStepTwoTextMobile>{steps}</StyledStepTwoTextMobile>
    </Box>
  )
}

export default SignupStepsProgress
