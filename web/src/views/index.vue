<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, reactive, ref } from 'vue'

  import { useRightMemuStore, useTabStore } from '@/stores'

  import { useBgIamgeStore } from '../stores/index'
  import { pageVisibilitychange } from '../utils/index'
  import IconDialog from './components/IconDialog/index.vue'
  import RightMemu from './components/RightMemu/index.vue'
  import SearchInput from './components/SearchInput/index.vue'
  import Tab from './components/Tab/index.vue'
  import WallpaperDialog from './components/wallpaperDialog/index.vue'
  import useRightMemu from './hooks/useRightMemu'
  import type { iconDialogRefType, wallpaperDialogRefType } from './type'

  const { getAllChromeStorageTab } = useTabStore()

  const { mouseXY } = storeToRefs(useRightMemuStore())
  const { getStorageBgIamge } = useBgIamgeStore()
  const { createBgImgTemplate, createBgFilterTemplate, createBgMaskTemplate } = storeToRefs(useBgIamgeStore())
  const iconDialogRef = ref<iconDialogRefType>(null)
  const wallpaperDialogRef = ref<wallpaperDialogRefType>(null)
  const { showRightMenu, watchTransformWallpaper, tabRightClick, rightClick, rightMemuList, mainClick } = useRightMemu({
    iconDialogRef,
    wallpaperDialogRef
  })

  getStorageBgIamge()
  onMounted(() => {
    getAllChromeStorageTab()
  })

  // 监听页面进入
  pageVisibilitychange(() => {
    showRightMenu.value = false
  })
</script>

<template>
  <div
    class="container"
    @click.right.prevent.stop="rightClick"
    @click="mainClick"
  >
    <div class="bg" />

    <header>
      <SearchInput class="searchInput-box" />
    </header>

    <main>
      <Tab @right-click="tabRightClick" />
    </main>

    <Teleport to="body">
      <!-- 右键菜单 -->
      <RightMemu
        v-model="showRightMenu"
        :x="mouseXY.x"
        :y="mouseXY.y"
        :data="rightMemuList"
      />
      <!-- 图标弹窗 -->
      <IconDialog ref="iconDialogRef" />

      <!-- 壁纸弹窗 -->
      <WallpaperDialog
        ref="wallpaperDialogRef"
        @transform-wallpaper="watchTransformWallpaper"
      />
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: v-bind(createBgImgTemplate);
    transition: background 0.5s, transform 0.3s;
    background-position: center !important;
    background-size: cover !important;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: v-bind(createBgFilterTemplate);
      background-color: v-bind(createBgMaskTemplate);
    }

    header {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .searchInput-box {
        margin-top: 174px;
        margin-bottom: 50px;
      }
    }

    main {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .wallpaperChange {
    transform: scale(1.1);
  }
</style>
