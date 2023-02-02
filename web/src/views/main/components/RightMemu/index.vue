<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'

  import { useRightMemuStore, useTabStore } from '@/stores'

  import IconDialog from './components/IconDialog/index.vue'
  import type { memuItem } from './type'

  type iconDialogRefType = InstanceType<typeof IconDialog> | null

  interface PropsType {
    x: number
    y: number
    open: boolean
    data: memuItem[]
  }

  const { x = 0, y, open = false } = defineProps<PropsType>()

  const { tabHandleData } = storeToRefs(useRightMemuStore())
  const { clearChromeStorageTab } = useTabStore()
  const iconDialogRef = ref<iconDialogRefType>(null)
  const rightMemuRef = ref<HTMLDivElement | null>(null)

  // 计算右键坐标防止右侧和底部溢出
  const leftTopStyle = computed(() => {
    if (!rightMemuRef.value) {
      return {
        left: 0,
        top: 0
      }
    }

    const rightOverflow = document.body.clientWidth - rightMemuRef.value.offsetWidth
    const bottomOverflow = document.body.clientHeight - rightMemuRef.value.offsetHeight

    const left = x > rightOverflow ? rightOverflow : x
    const bottom = y > bottomOverflow ? bottomOverflow : y

    return {
      left: `${left}px`,
      top: `${bottom}px`
    }
  })

  // 点击右键菜单列表
  const clickRightMemuItem = (item: memuItem) => {
    const { type } = item
    if (type === 'addIcon') {
      iconDialogRef.value?.openDialog()
    }

    if (type === 'handleIcon') {
      iconDialogRef.value?.openDialog(tabHandleData.value!)
    }

    if (type === 'clearAllIcon') {
      clearChromeStorageTab()
    }
  }
</script>

<template>
  <div
    v-show="open"
    id="name"
    ref="rightMemuRef"
    class="memu-box"
    :style="leftTopStyle"
  >
    <div
      v-for="item in data"
      :key="item.name"
      class="item"
      @click="clickRightMemuItem(item)"
    >
      <span>{{ item.name }}</span>
      <component :is="item.icon" />
    </div>
  </div>

  <!-- 图标弹窗 -->
  <IconDialog ref="iconDialogRef" />
</template>

<style lang="scss" scoped>
  .memu-box {
    position: fixed;
    width: 140px;
    min-height: 121px;
    z-index: 999;
    border-radius: 8px;
    padding: 5px 4px;
    background: #0b0b0bcc;
    backdrop-filter: blur(6px);
    box-shadow: 0 2px 8px #0000004d;
    border: 1px solid rgba(11, 11, 11, 0.2);

    .item {
      transition: background 0.2s;
      font-size: 13px;
      color: #fff;
      padding: 0 4px;
      cursor: pointer;
      margin: 4px 0;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 4px;

      &:hover {
        background: #ffffff1a;
      }

      span {
        margin-left: 4px;
      }
    }
  }
</style>
