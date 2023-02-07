import { defineStore } from 'pinia'
import { reactive, ref, shallowRef } from 'vue'

import type { memuItem } from '../views/main/components/RightMemu/type'

export interface tabMapType {
  name: string
  iconUrl: string
  url: string
  id: number
  bgColor: string
  isDel: boolean
}

// 给Tab 数据打补丁 避免有些字段没有
const fixTabData = (tabs: any): tabMapType[] => {
  if (!tabs) return []
  const arr: tabMapType[] = Object.values(tabs)
  arr.forEach(item => {
    item.isDel = false
  })
  return arr
}

// 标签 store
export const useTabStore = defineStore('tabs', () => {
  const tabMap = ref<tabMapType[]>([])

  const getAllChromeStorageTab = async () => {
    const { tabs } = await chrome.storage.sync.get(['tabs'])
    console.log(tabs, 'tav')
    tabMap.value = fixTabData(tabs)
  }

  const pushChromeStorageTab = async (data: tabMapType) => {
    tabMap.value.push(data)
    chrome.storage.sync.set({ tabs: tabMap.value })
  }

  const getChromeStorageTab = (id: number) => {
    return {
      data: tabMap.value.find(item => item.id === id),
      index: tabMap.value.findIndex(item => item.id === id)
    }
  }

  const setChromeStorageTab = (id: number, data: tabMapType) => {
    const { index } = getChromeStorageTab(id)
    tabMap.value[index] = data
    chrome.storage.sync.set({ tabs: tabMap.value })
  }

  const clearChromeStorageTab = () => {
    chrome.storage.sync.clear()
  }

  const delChromeStoreTab = (idx: number) => {
    tabMap.value.splice(idx, 1)
    // chrome.storage.sync.set({ tabs: tabMap.value })
  }

  const showTabDel = () => {
    tabMap.value.forEach(item => (item.isDel = true))
  }

  const closeTabDel = () => {
    tabMap.value.forEach(item => (item.isDel = false))
  }

  return {
    clearChromeStorageTab,
    tabMap,
    getAllChromeStorageTab,
    pushChromeStorageTab,
    setChromeStorageTab,
    getChromeStorageTab,
    delChromeStoreTab,
    showTabDel,
    closeTabDel
  }
})

// 右键 store
export const useRightMemuStore = defineStore('rightMenu', () => {
  const showRightMenu = ref(false)
  const rightMemuList = shallowRef<memuItem[]>([])

  // 储存右键修改图标的数据
  const tabHandleData = ref<tabMapType | null>(null)

  const mouseXY = reactive({
    x: 0,
    y: 0
  })

  const openRightMenu = (x: number, y: number) => {
    mouseXY.x = x
    mouseXY.y = y
    showRightMenu.value = true
  }

  return { showRightMenu, rightMemuList, mouseXY, openRightMenu, tabHandleData }
})
