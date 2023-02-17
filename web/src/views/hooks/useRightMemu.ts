import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'

import AddIcon from '@/components/icon/AddIcon.vue'
import AllDelIcon from '@/components/icon/AllDelIcon.vue'
import DelIcon from '@/components/icon/DelIcon.vue'
import HandleIcon from '@/components/icon/HandleIcon.vue'
import { type tabMapType, useRightMemuStore, useTabStore } from '@/stores'
import type { memuItem } from '@/views/type'

import type { iconDialogRefType } from '../type'

interface optionsType {
  iconDialogRef: Ref<iconDialogRefType>
}
export default (options: optionsType) => {
  const { iconDialogRef } = options
  const { rightMemuList, showRightMenu, tabHandleData } = storeToRefs(useRightMemuStore())
  const { openRightMenu } = useRightMemuStore()
  const { tabMap } = storeToRefs(useTabStore())
  const { closeTabDel, showTabDel, delChromeStoreTab } = useTabStore()

  const memuList: memuItem[] = [
    {
      name: '添加图标',
      icon: AddIcon,
      click: () => iconDialogRef.value?.openDialog()
    }
  ]

  const allDel = {
    name: '批量删除',
    icon: AllDelIcon,
    click: () => showTabDel()
  }

  // tab右键菜单
  const TabmemuList: memuItem[] = [
    {
      name: '编辑图标',
      icon: HandleIcon,
      click: () => iconDialogRef.value?.openDialog(tabHandleData.value!)
    },
    {
      name: '删除',
      icon: DelIcon,
      click: () => {
        const idx = tabMap.value.findIndex(item => item.id === tabHandleData.value?.id)
        delChromeStoreTab(idx)
      }
    }
  ]

  // 页面右键点击
  const rightClick = (e: MouseEvent) => {
    const { x, y } = e
    openRightMenu(x, y)
    if (tabMap.value.length && memuList[1]?.name !== '批量删除') {
      memuList.splice(1, 1, allDel)
    }

    rightMemuList.value = memuList
  }

  // tab右键点击
  const tabRightClick = (item: tabMapType) => {
    rightMemuList.value = TabmemuList
    tabHandleData.value = item
  }

  const mainClick = () => {
    showRightMenu.value = false
    closeTabDel()
  }

  return {
    showRightMenu,
    rightClick,
    rightMemuList,
    mainClick,
    tabRightClick
  }
}
