import { createContext, useContext } from "react"

import UserStore from "./userStore"
import MessageStore from "./messageStore"
import AvailabilityStore from "./availibilityStore"

interface Store {
  userStore: UserStore
  messageStore: MessageStore
  availibilityStore: AvailabilityStore
}

export const store: Store = {
  userStore: new UserStore(),
  messageStore: new MessageStore(),
  availibilityStore: new AvailabilityStore(),
}

export const StoreContext = createContext(store)

export const useStore = () => useContext(StoreContext)
