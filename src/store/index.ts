import { createContext, useContext } from "react"

import UserStore from "./userStore"
import MessageStore from "./messageStore"
import CommonStore from "./commonStore"

interface Store {
  userStore: UserStore
  messageStore: MessageStore
  commonStore: CommonStore
}

export const store: Store = {
  userStore: new UserStore(),
  messageStore: new MessageStore(),
  commonStore: new CommonStore(),
}

export const StoreContext = createContext(store)

export const useStore = () => useContext(StoreContext)
