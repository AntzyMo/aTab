import { inject, shallowRef, triggerRef, watch } from 'vue'
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
  const tabs = shallowRef<Tab[]>(createTabs(tabsStore.value))

  watch(tabsStore, val => {
    tabs.value = createTabs(val)
  })

  const triggerIconDialog = (tab: Tab) => {
    tab.show = !tab.show
    triggerRef(tabs)
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
