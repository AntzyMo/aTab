import { inject, onMounted, ref, toValue, watch } from 'vue'
import type { IconType, Tab } from '@/types'

import { tabsKey } from '@/shared/provideKey'

function createTabs(tabs: IconType[]) {
  return tabs.map(item => ({
    data: item,
    show: false
  }))
}

export default () => {
  const tabsStore = inject(tabsKey)!

  const tabs = ref<Tab[]>(createTabs(toValue(tabsStore)))

  const isExtension = import.meta.env.MODE === 'extension'

  watch(tabsStore, val => {
    if (!val.length) return
    tabs.value = createTabs(val)

    if (isExtension) {
      chrome.storage.sync.set({ tabs: val })
    }
  })

  onMounted(async () => {
    if (isExtension) {
      const { tabs } = await chrome.storage.sync.get(['tabs'])
      if (tabs) {
        tabsStore.value = Object.values(tabs)
      }
    }
  })

  const triggerIconDialog = (tab: Tab) => {
    tab.show = !tab.show
  }

  const addTab = (data: IconType) => {
    tabsStore.value.push(data)
  }

  const updateTab = (item: IconType, index: number) => {
    tabsStore.value[index] = item
  }

  const deleteTab = (index: number) => {
    tabsStore.value.splice(index, 1)
  }

  const replaceChromeTabs = () => {
    const chromeTabs = tabs.value.map(item => item.data)
    tabsStore.value = chromeTabs
  }
  return {
    tabs,
    addTab,
    updateTab,
    triggerIconDialog,
    deleteTab,
    replaceChromeTabs
  }
}
