import { storeToRefs } from 'pinia'

import AddIcon from '@/components/icon/AddIcon.vue'
import AllDelIcon from '@/components/icon/AllDelIcon.vue'
import { useRightMemuStore, useTabStore } from '@/stores'

import type { memuItem } from '../components/RightMemu/type'

const memuList: memuItem[] = [
  {
    name: '添加图标',
    icon: AddIcon,
    type: 'addIcon'
  }
]

const allDel = {
  name: '批量删除',
  icon: AllDelIcon,
  type: 'delAllTab'
}

export default () => {
  const { rightMemuList, showRightMenu } = storeToRefs(useRightMemuStore())
  const { openRightMenu } = useRightMemuStore()
  const { tabMap } = storeToRefs(useTabStore())
  const { closeTabDel } = useTabStore()

  // 页面右键点击
  const rightClick = (e: MouseEvent) => {
    const { x, y } = e
    openRightMenu(x, y)

    if (tabMap.value.length && memuList[1]?.name !== '批量删除') {
      memuList.splice(1, 1, allDel)
    }

    rightMemuList.value = memuList
  }

  const mainClick = () => {
    showRightMenu.value = false
    console.log(22)
    closeTabDel()
  }

  return {
    showRightMenu,
    rightClick,
    rightMemuList,
    mainClick
  }
}
