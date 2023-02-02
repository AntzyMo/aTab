<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  import HandleIcon from '@/components/icon/HandleIcon.vue'
  import { useRightMemuStore, useTabStore } from '@/stores'

  import type { tabMapType } from '../../../../stores/index'

  interface emitType {
    (e: 'rightClick', value: tabMapType): void
  }
  const emit = defineEmits<emitType>()

  const { tabMap } = storeToRefs(useTabStore())
  const { getAllChromeStorageTab } = useTabStore()
  const { rightMemuList, showRightMenu, tabHandleData } = storeToRefs(useRightMemuStore())
  const { openRightMenu } = useRightMemuStore()

  // const getTab = async () => {
  //   await getAllChromeStorageTab()
  // }

  // onMounted(() => {
  //   getTab()
  // })

  const tabRightClick = (e: MouseEvent, item: tabMapType) => {
    const { x, y } = e
    openRightMenu(x, y)
    rightMemuList.value = [
      {
        name: '编辑图标',
        icon: HandleIcon,
        type: 'handleIcon'
      }
    ]
    tabHandleData.value = item
  }
</script>

<template>
  <div class="Tab-box">
    <a
      v-for="item in tabMap"
      :key="item.iconUrl"
      :href="item.url"
      class="tabBox"
      @click.right.prevent.stop="e => tabRightClick(e, item)"
      @click="showRightMenu = false"
    >
      <div class="imgBox">
        <img :src="item.iconUrl" />
      </div>
      <span class="tab-text">{{ item.name }}</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
  .Tab-box {
    max-width: 1350px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 10px;

    .tabBox {
      width: 90px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      column-gap: 20px;
      user-select: none;
      cursor: pointer;
      text-decoration: none;

      .imgBox {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        overflow: hidden;

        img {
          width: 100%;
          object-fit: scale-down;
        }
      }

      .tab-text {
        color: #fff;
        font-size: 14px;
      }
    }
  }
</style>
