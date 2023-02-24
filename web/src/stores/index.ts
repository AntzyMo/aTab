import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

import defaultBgImage from '@/assets/bg.webp'

import { watchImageOnLoad } from '../utils/index'

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

interface bgImageType {
  src: string
  filter: number | string
  mask: number | string
}
export const useBgIamgeStore = defineStore('bgImage', () => {
  const bgImage = reactive<bgImageType>({
    src: '',
    filter: 0,
    mask: 0
  })

  const createBgImgTemplate = computed(() => `url(${bgImage.src}) no-repeat`)
  const createBgFilterTemplate = computed(() => `blur(${(Number(bgImage.filter) * 40) / 100}px)`)
  const createBgMaskTemplate = computed(() => `rgba(0, 0, 0, ${Number(bgImage.mask) / 100})`)

  const getStorageBgIamge = () => {
    if (import.meta.env.PROD) {
      const bg = localStorage.getItem('bgImage') ? JSON.parse(localStorage.getItem('bgImage') as string) : ''
      Object.assign(bgImage, {
        src: bg.src || defaultBgImage,
        filter: bg.filter || 0,
        mask: bg.mask || 0
      })
      return
    }
    bgImage.src = defaultBgImage
  }

  const setStorageBgIamge = (options: Partial<bgImageType>) => {
    const params = { ...bgImage, ...options }
    if (import.meta.env.PROD) {
      localStorage.setItem('bgImage', JSON.stringify(params))
      return
    }
    Object.assign(bgImage, options)
  }

  return {
    createBgFilterTemplate,
    createBgMaskTemplate,
    bgImage,
    setStorageBgIamge,
    getStorageBgIamge,
    createBgImgTemplate
  }
})
