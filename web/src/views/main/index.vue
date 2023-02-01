<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'

  import RightMemu from '@/components/RightMemu/index.vue'
  import { useRightMemuStore } from '@/stores'

  import IconDialog from './components/IconDialog/index.vue'
  import SearchInput from './components/SearchInput/index.vue'
  import Tab from './components/Tab/index.vue'
  import useRightMemu from './hooks/useRightMemu'

  export type iconDialogRefType = InstanceType<typeof IconDialog> | null
  const iconDialogRef = ref<iconDialogRefType>(null)

  const { tabRightClick, clickRightMemuItem, showRightMenu, rightClick, rightMemuList } = useRightMemu(iconDialogRef)
  const { mouseXY } = storeToRefs(useRightMemuStore())

  // 监听页面进入
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      showRightMenu.value = false
      document.querySelector<HTMLInputElement>('#searchInput')?.focus()
    }
  })
</script>

<template>
  <div
    class="container"
    @click.right.prevent="rightClick"
    @click="showRightMenu = false"
  >
    <header>
      <SearchInput class="searchInput-box" />
    </header>

    <main>
      <Tab @right-click="tabRightClick" />
    </main>

    <!-- 右键菜单 -->
    <RightMemu
      :open="showRightMenu"
      :x="mouseXY.x"
      :y="mouseXY.y"
      :data="rightMemuList"
      @click-right-memu-item="clickRightMemuItem"
    />

    <!-- 图标弹窗 -->
    <IconDialog ref="iconDialogRef" />
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: relative;
    height: 100vh;
    background: url('https://files.codelife.cc/itab/defaultWallpaper/defaultWallpaper.webp');
    display: flex;
    flex-direction: column;

    header {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .searchInput-box {
        margin-top: 60px;
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
