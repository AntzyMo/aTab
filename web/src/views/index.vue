<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'

  import { useRightMemuStore, useTabStore } from '@/stores'

  import { pageVisibilitychange } from '../utils/index'
  import IconDialog from './components/IconDialog/index.vue'
  import RightMemu from './components/RightMemu/index.vue'
  import SearchInput from './components/SearchInput/index.vue'
  import Tab from './components/Tab/index.vue'
  import useRightMemu from './hooks/useRightMemu'
  import type { iconDialogRefType } from './type'

  const { getAllChromeStorageTab } = useTabStore()
  const { mouseXY } = storeToRefs(useRightMemuStore())

  const iconDialogRef = ref<iconDialogRefType>(null)
  const { showRightMenu, tabRightClick, rightClick, rightMemuList, mainClick } = useRightMemu({
    iconDialogRef
  })

  const getTab = async () => {
    await getAllChromeStorageTab()
  }

  onMounted(() => {
    getTab()
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
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: relative;
    height: 100vh;
    background: url('../assets/bg.webp') no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

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
</style>
