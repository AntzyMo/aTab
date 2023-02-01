import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'

import AddIcon from '@/components/icon/AddIcon.vue'
import { useRightMemuStore } from '@/stores'

import type { memuItem } from '../../../components/RightMemu/type'
import type { tabMapType } from '../../../stores/index'
import type { iconDialogRefType } from '../index.vue'

let tabStore: tabMapType | null
export default (iconDialogRef: Ref<iconDialogRefType>) => {
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

  // 点击右键菜单列表
  const clickRightMemuItem = (item: memuItem) => {
    const { type } = item
    if (type === 'addIcon') {
      iconDialogRef.value?.openDialog()
    }

    if (type === 'handleIcon') {
      iconDialogRef.value?.openDialog(tabStore!)
    }
  }

  // 图标右键点击后获取到的数据
  const tabRightClick = (item: tabMapType) => {
    tabStore = { ...item }
  }

  return {
    showRightMenu,
    rightClick,
    rightMemuList,
    clickRightMemuItem,
    tabRightClick
  }
}
