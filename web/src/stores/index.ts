import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import defaultBgImage from '@/assets/bg.webp'

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

// Tab store
export const useTabStore = defineStore('tabs', () => {
  const tabMap = ref<tabMapType[]>([])

  const getAllChromeStorageTab = async () => {
    if (import.meta.env.PROD) {
      const { tabs } = await chrome.storage.sync.get(['tabs'])
      tabMap.value = fixTabData(tabs)
    }
  }

  const pushChromeStorageTab = async (data: tabMapType) => {
    tabMap.value.push(data)
    setAllChromeStoreTab(tabMap.value)
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
    setAllChromeStoreTab(tabMap.value)
  }

  const clearChromeStorageTab = () => {
    chrome.storage.sync.clear()
  }

  const delChromeStoreTab = (idx: number) => {
    tabMap.value.splice(idx, 1)
    setAllChromeStoreTab(tabMap.value)
  }

  const setAllChromeStoreTab = (tabs = tabMap.value) => {
    if (import.meta.env.PROD) chrome.storage.sync.set({ tabs })
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
    closeTabDel,
    setAllChromeStoreTab
  }
})

// 右键 store
export const useRightMemuStore = defineStore('rightMenu', () => {
  // 1: main 2: tab
  const rightMemuType = ref<1 | 2>(1)

  // 储存右键修改图标的数据
  const tabHandleData = ref<tabMapType | null>(null)

  const mouseXY = reactive({
    x: 0,
    y: 0
  })

  const openRightMenu = (x: number, y: number) => {
    mouseXY.x = x
    mouseXY.y = y
  }

  return { rightMemuType, mouseXY, openRightMenu, tabHandleData }
})

//  背景图片 store
export const useBgIamgeStore = defineStore('bgImage', () => {
  const bgImage = ref('')
  const bgTemplate = (src: string) => `url(${src}) no-repeat`

  const getStorageBgIamge = async () => {
    if (import.meta.env.PROD) {
      const { bgImage: src } = await chrome.storage.local.get(['bgImage'])
      bgImage.value = bgTemplate(src || defaultBgImage)
      return
    }
    bgImage.value = bgTemplate(defaultBgImage)
  }

  const setStorageBgIamge = (src: string) => {
    if (import.meta.env.PROD) {
      chrome.storage.local.set({ bgImage: src })
      return
    }

    localStorage.setItem('bgImage', src)
  }

  return { bgImage, setStorageBgIamge, getStorageBgIamge, bgTemplate }
})
