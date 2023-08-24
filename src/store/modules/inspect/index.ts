import { defineStore } from 'pinia'
import { Router } from 'vue-router'

import { store } from '../../index'

import { InspectItemType, CheckedStatus, BadProblemsRankItemType } from "./type"

import { getInspectItems, mockedFailedItems, mockedBadRankProblems, inspectOrderIndexes } from "./data"

type StateType = {
  inspectTimer?: NodeJS.Timer
  inspectedIndex: number
  inspectCount: number
  inspectedItems: InspectItemType[]
  badRankProblems: BadProblemsRankItemType[]
  isFailed: boolean
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
      badRankProblems: mockedBadRankProblems,
      isFailed: false,
    }
  },
  actions: {
    resetInspectItems() {
      this.inspectedItems = getInspectItems()
      this.inspectCount = this.inspectedItems.length
      this.inspectedIndex = 0
      this.isFailed = false
    },
    startInspect(isSuccess = true, router: Router) {
      this.resetInspectItems()
      if ((window.history.state.current || window.history.state.path) == "/failed") {
        router.push("/")
      }

      this.inspectTimer = setInterval(() => {
        const inspectId = inspectOrderIndexes[this.inspectedIndex]
        const inspectedIndex = this.inspectedItems.findIndex(item => item.id == inspectId)

        if (isSuccess) {
          this.inspectedItems[inspectedIndex].status = CheckedStatus.succeeded
        } else {
          const inspectItem = this.inspectedItems[inspectedIndex]
          this.inspectedItems[inspectedIndex].status = CheckedStatus.succeeded
          if (mockedFailedItemsId.includes( inspectItem.id)) {
            const failedItem = mockedFailedItems.find(item => item.id == inspectItem.id)

            if (failedItem) {
              this.inspectedItems[inspectedIndex] = {...inspectItem, ...failedItem, status: CheckedStatus.failed}

              if (this.isFailed == false && (window.history.state.current || window.history.state.path)!= "/failed") {
                this.isFailed = true
                setTimeout(() => {
                  router.push("/failed")
                }, 1000)
              }
            }
          }
        }

        if (this.inspectCount == (this.inspectedIndex + 1)) {
          // @ts-ignore
          clearInterval(this.inspectTimer)
        } else {
          this.inspectedIndex++
        }

      }, 250)
    },
    changeInspectItemStatus() {

    },
  }
})

export default function useInspectStoreHook() {
  return useInspectStore(store)
}
