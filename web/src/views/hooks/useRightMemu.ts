import { storeToRefs } from 'pinia'
import { type Ref, ref } from 'vue'

import AddIcon from '@/components/icon/AddIcon.vue'
import AllDelIcon from '@/components/icon/AllDelIcon.vue'
import DelIcon from '@/components/icon/DelIcon.vue'
import HandleIcon from '@/components/icon/HandleIcon.vue'
import ImageIcon from '@/components/icon/ImageIcon.vue'
import { type tabMapType, useBgIamgeStore, useRightMemuStore, useTabStore } from '@/stores'
import type { memuItem } from '@/views/type'

import { watchImageOnLoad } from '../../utils/index'
import type { wallpaperType } from '../components/wallpaperDialog/index.vue'
import type { iconDialogRefType, wallpaperDialogRefType } from '../type'
interface optionsType {
  iconDialogRef: Ref<iconDialogRefType>
  wallpaperDialogRef: Ref<wallpaperDialogRefType>
}

export default (options: optionsType) => {
  const { iconDialogRef, wallpaperDialogRef } = options

  const { tabMap } = storeToRefs(useTabStore())
  const { tabHandleData, rightMemuType } = storeToRefs(useRightMemuStore())

  const { openRightMenu } = useRightMemuStore()
  const { closeTabDel, showTabDel, delChromeStoreTab } = useTabStore()
  const { setStorageBgIamge } = useBgIamgeStore()
  const { bgImage } = useBgIamgeStore()
  const showRightMenu = ref(false)

  const rightMemuList: memuItem[] = [
    {
      name: '添加图标',
      icon: AddIcon,
      type: 1,
      click: () => iconDialogRef.value?.openDialog()
    },
    {
      name: '批量删除',
      icon: AllDelIcon,
      type: 1,
      click: () => showTabDel()
    },
    {
      name: '编辑图标',
      icon: HandleIcon,
      type: 2,
      click: () => iconDialogRef.value?.openDialog(tabHandleData.value!)
    },
    {
      name: '删除',
      icon: DelIcon,
      type: 2,
      click: () => {
        const idx = tabMap.value.findIndex(item => item.id === tabHandleData.value?.id)
        showRightMenu.value = false
        delChromeStoreTab(idx)
      }
    },
    {
      name: '换壁纸',
      icon: ImageIcon,
      type: 1,
      click: () => {
        wallpaperDialogRef.value?.openDialog()
      }
    }
  ]

  // 页面右键点击
  const rightClick = (e: MouseEvent) => {
    const { x, y } = e
    openRightMenu(x, y)
    rightMemuType.value = 1
    showRightMenu.value = true
  }

  // tab右键点击
  const tabRightClick = (item: tabMapType) => {
    rightMemuType.value = 2
    showRightMenu.value = true
    tabHandleData.value = item
  }

  const mainClick = () => {
    showRightMenu.value = false
    closeTabDel()
  }

  // 监听壁纸选中
  const watchTransformWallpaper = (item: wallpaperType) => {
    watchImageOnLoad(item.fullSrc, () => {
      bgImage.src = item.fullSrc
      item.loading = false
      setStorageBgIamge({ src: item.fullSrc })
    })
  }

  return {
    showRightMenu,
    rightClick,
    rightMemuList,
    mainClick,
    tabRightClick,
    watchTransformWallpaper,
    bgImage
  }
}
