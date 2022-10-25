import { IS_SIDE_PANEL_COLLAPSED } from "@/constants/localStorage"
import { localStorageUtils } from "@/utils"
import { makeAutoObservable, runInAction } from "mobx"

class CommonStore {
  isSidePanelCollapsed = Boolean(
    localStorageUtils.get(IS_SIDE_PANEL_COLLAPSED) || false
  )

  constructor() {
    makeAutoObservable(this)
  }

  toggleSidePanelCollapsed() {
    runInAction(() => {
      const newIsSidePanelCollapsed = !this.isSidePanelCollapsed
      this.isSidePanelCollapsed = newIsSidePanelCollapsed
      localStorageUtils.set(
        IS_SIDE_PANEL_COLLAPSED,
        JSON.stringify(newIsSidePanelCollapsed)
      )
    })
  }
}

export default CommonStore
