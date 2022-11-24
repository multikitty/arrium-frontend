export interface StepProps {
  stage: number
  steps: ReadonlyArray<string>
}

export interface StepMobileProps {
  stage: number
  steps: string
}

export interface NodeProps {
  stage: number
  steps: string
  index: number
  lastNode: boolean
}

export enum EState {
  active = "active",
  completed = "completed",
  inactive = "inactive",
}
