import { createContext, useContext } from "react"

import UserStore from "@/store/userStore"
import CommonStore from "@/store/commonStore"

interface Store {
  userStore: UserStore
  commonStore: CommonStore
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
}

export const StoreContext = createContext(store)

export const useStore = () => useContext(StoreContext)
