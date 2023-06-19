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

  const tabs = ref<Tab[]>(createTabs(toValue(tabsStore.value)))

  const isExtension = import.meta.env.MODE === 'extension'

  watch(tabsStore, val => {
    if (!val.length) return
    console.log('val', val)
    tabs.value = createTabs(val)

    if (isExtension) {
      console.log(val, 'valis')

      chrome.storage.sync.set({ tabs: val })
    }
  })

  onMounted(async () => {
    if (isExtension) {
      const { tabs } = await chrome.storage.sync.get(['tabs'])
      console.log('tabs', tabs)
      if (tabs) {
        tabsStore.value = Object.values(tabs)
        console.log(Object.values(tabs), 'Object.values(tabs)')
        console.log('tabs2', tabs)
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

  return {
    tabs,
    addTab,
    updateTab,
    triggerIconDialog,
    deleteTab
  }
}
