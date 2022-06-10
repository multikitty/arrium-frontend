import { localStorageUtils } from "@/utils"
import { makeAutoObservable, runInAction } from "mobx"

class CommonStore {
  isSidePanelCollapsed = Boolean(
    localStorageUtils.getLocalStorage("isSidePanelCollapsed") || false
  )

  constructor() {
    makeAutoObservable(this)
  }

  toggleSidePanelCollapsed() {
    runInAction(() => {
      const newIsSidePanelCollapsed = !this.isSidePanelCollapsed
      this.isSidePanelCollapsed = newIsSidePanelCollapsed
      localStorageUtils.setLocalStorage(
        "isSidePanelCollapsed",
        JSON.stringify(newIsSidePanelCollapsed)
      )
    })
  }
}

export default CommonStore
