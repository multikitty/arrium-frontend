import { createContext, useContext } from "react"

import UserStore from "./userStore"
import MessageStore from "./messageStore"

interface Store {
  userStore: UserStore
  messageStore: MessageStore
}

export const store: Store = {
  userStore: new UserStore(),
  messageStore: new MessageStore(),
}

export const StoreContext = createContext(store)

export const useStore = () => useContext(StoreContext)
