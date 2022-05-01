import { makeAutoObservable } from "mobx"

import { MessageVariant } from "@/components/Message/Message.types"

class MessageStore {
  message: string = "An error has occured"
  variant: MessageVariant = "error"
  open: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  set setMessage(message: string) {
    this.message = message
  }

  set setVariant(variant: MessageVariant) {
    this.variant = variant
  }
  set setOpen(open: boolean) {
    this.open = open
  }
}

export default MessageStore
