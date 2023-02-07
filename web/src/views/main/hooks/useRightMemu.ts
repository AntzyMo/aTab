import { storeToRefs } from 'pinia'

import AddIcon from '@/components/icon/AddIcon.vue'
import AllDelIcon from '@/components/icon/AllDelIcon.vue'
import { useRightMemuStore } from '@/stores'

import { useTabStore } from '../../../stores/index'

export default () => {
  const { rightMemuList, showRightMenu } = storeToRefs(useRightMemuStore())
  const { openRightMenu } = useRightMemuStore()
  const { closeTabDel } = useTabStore()

  // 页面右键点击
  const rightClick = (e: MouseEvent) => {
    const { x, y } = e
    openRightMenu(x, y)
    rightMemuList.value = [
      {
        name: '添加图标',
        icon: AddIcon,
        type: 'addIcon'
      },
      {
        name: '批量删除',
        icon: AllDelIcon,
        type: 'delAllTab'
      }
    ]
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
