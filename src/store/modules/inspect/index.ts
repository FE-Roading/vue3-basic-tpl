import { defineStore } from 'pinia'
import { Router } from 'vue-router'

import { store } from '../../index'

import { InspectItemType, CheckedStatus } from "./type"

import { getInspectItems, mockedFailedItems } from "./data"

type StateType = {
  inspectTimer?: NodeJS.Timer
  inspectedIndex: number
  inspectCount: number
  inspectedItems: InspectItemType[]
}

const mockedFailedItemsId = mockedFailedItems.map(item => item.id)

export const useInspectStore = defineStore({
  id: 'inspect',
  state: (): StateType => {
    const inspectedItems = getInspectItems()

    return {
      inspectCount: inspectedItems.length,
      inspectedItems,
      inspectedIndex: 0,
    }
  },
  actions: {
    resetInspectItems() {
      this.inspectedItems = getInspectItems()
      this.inspectCount = this.inspectedItems.length
      this.inspectedIndex = 0
    },
    startInspect(isSuccess = true, router: Router) {
      this.resetInspectItems()

      this.inspectTimer = setInterval(() => {
        if (isSuccess) {
          this.inspectedItems[this.inspectedIndex].status = CheckedStatus.succeeded
        } else {
          const inspectItem = this.inspectedItems[this.inspectedIndex]
          this.inspectedItems[this.inspectedIndex].status = CheckedStatus.succeeded
          if (mockedFailedItemsId.includes( inspectItem.id)) {
            const failedItem = mockedFailedItems.find(item => item.id == inspectItem.id)

            if (failedItem) {
              this.inspectedItems[this.inspectedIndex] = {...inspectItem, ...failedItem, status: CheckedStatus.failed}

              if (window.history.state.path != "/bad") {
                router.push("/bad")
              }
            }
          }
        }

        if (this.inspectCount == (this.inspectedIndex + 1)) {
          clearInterval(this.inspectTimer)
        } else {
          this.inspectedIndex++
        }

      }, 500)
    },
    changeInspectItemStatus() {

    },
    increaseCount(value = 1) {
      this.count += value
    },
    decreaseCount(value = 1) {
      this.count -= value
    }
  }
})

export default function useInspectStoreHook() {
  return useInspectStore(store)
}
