import { storeToRefs } from 'pinia'

import AddIcon from '@/components/icon/AddIcon.vue'
import { useRightMemuStore } from '@/stores'

export default () => {
  const { rightMemuList, showRightMenu } = storeToRefs(useRightMemuStore())
  const { openRightMenu } = useRightMemuStore()

  // 页面右键点击
  const rightClick = (e: MouseEvent) => {
    const { x, y } = e
    openRightMenu(x, y)
    rightMemuList.value = [
      {
        name: '添加图标',
        icon: AddIcon,
        type: 'addIcon'
      }
    ]
  }

  return {
    showRightMenu,
    rightClick,
    rightMemuList
  }
}
