import React, { useState } from "react"

import { Box, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { rem } from "polished"

import {
  StyledAddCountryModal as StyledAddBlockTypeModal,
  StyledAddCountryModalCloseIconContainer as StyledAddBlockTypeModalCloseIconContainer,
  StyledAddCountryModalForm as StyledAddBlockTypeModalForm,
  StyledAddCountryModalFormActions as StyledAddBlockTypeModalFormActions,
  StyledAddCountryModalFormField as StyledAddBlockTypeModalFormField,
  StyledAddCountryModalTitle as StyledAddBlockTypeModalTitle,
} from "./SettingsPage.styled"
import { ModalProps } from "./SettingsPage.types"
import { ContainedButton, OutlinedButton } from "@/components/commons/Button"
import { StyledFieldLabel } from "@/components/commons/uiComponents"

interface IProps extends ModalProps {
  handleAdd: (blockType: string) => void
}

const AddBlockTypeModal = (props: IProps) => {
  const [blockType, setBlockType] = useState("")

  const handleBlockTypeField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setBlockType(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBlockType("")
    props.handleAdd(blockType)
  }

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <StyledAddBlockTypeModal>
        <StyledAddBlockTypeModalCloseIconContainer>
          <IconButton size="small" onClick={props.handleClose}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </StyledAddBlockTypeModalCloseIconContainer>
        <StyledFieldLabel $isHidden={!blockType}>Block type</StyledFieldLabel>
        <StyledAddBlockTypeModalTitle>
          Add new Block Type
        </StyledAddBlockTypeModalTitle>
        <StyledAddBlockTypeModalForm onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" mb={rem("44px")}>
            <StyledAddBlockTypeModalFormField
              autoFocus
              placeholder={`Block Type`}
              value={blockType}
              onChange={handleBlockTypeField}
            />
          </Box>
          <StyledAddBlockTypeModalFormActions>
            <ContainedButton
              sx={{ width: "100%", marginBottom: rem("16px") }}
              disabled={!blockType}
              type="submit"
            >
              Save
            </ContainedButton>
            <OutlinedButton
              grey
              sx={{ width: "100%" }}
              onClick={props.handleClose}
            >
              Cancel
            </OutlinedButton>
          </StyledAddBlockTypeModalFormActions>
        </StyledAddBlockTypeModalForm>
      </StyledAddBlockTypeModal>
    </Modal>
  )
}

export default AddBlockTypeModal
