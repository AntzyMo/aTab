<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  import CloseIcon from '@/components/icon/CloseIcon.vue'
  import DelIcon from '@/components/icon/DelIcon.vue'
  import HandleIcon from '@/components/icon/HandleIcon.vue'
  import { useRightMemuStore, useTabStore } from '@/stores'

  import type { tabMapType } from '../../../../stores/index'

  const { tabMap } = storeToRefs(useTabStore())
  const { getAllChromeStorageTab, delChromeStoreTab } = useTabStore()
  const { rightMemuList, showRightMenu, tabHandleData } = storeToRefs(useRightMemuStore())
  const { openRightMenu } = useRightMemuStore()

  const getTab = async () => {
    await getAllChromeStorageTab()
  }

  onMounted(() => {
    getTab()
  })

  const tabRightClick = (e: MouseEvent, item: tabMapType) => {
    const { x, y } = e
    openRightMenu(x, y)
    rightMemuList.value = [
      {
        name: '编辑图标',
        icon: HandleIcon,
        type: 'handleIcon'
      },
      {
        name: '删除',
        icon: DelIcon,
        type: 'delTab'
      }
    ]

    tabHandleData.value = item
  }
</script>

<template>
  <div class="Tab-box">
    <a
      v-for="(item, index) in tabMap"
      :key="item.id"
      :href="item.url"
      class="tabBox"
      @click.right.prevent.stop="e => tabRightClick(e, item)"
      @click="showRightMenu = false"
    >
      <div
        class="imgBox"
        :class="{ delTabAim: item.isDel }"
        :style="{
          background: !item.iconUrl ? item.bgColor : ''
        }"
      >
        <img
          v-if="item.iconUrl"
          :src="item.iconUrl"
        />

        <div
          v-else
          class="text"
        >
          {{ item.name.slice(0, 2) }}
        </div>
        <div
          v-show="item.isDel"
          class="delIcon"
          @click.prevent.stop="delChromeStoreTab(index)"
        >
          <CloseIcon
            color="#fff"
            :width="12"
          />
        </div>
      </div>

      <span class="tab-text">{{ item.name }}</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
  @keyframes delTab {
    0% {
      transform: rotate(3deg);
    }
    25% {
      transform: rotate(0);
    }
    75% {
      transform: rotate(-3deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  .delTabAim {
    animation: 0.3s ease 0.3s infinite normal none running delTab;
  }
  .Tab-box {
    max-width: 1350px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 10px;
    row-gap: 28px;

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
        position: relative;

        img {
          width: 100%;
          object-fit: scale-down;
        }

        .text {
          color: #fff;
          font-size: 15px;
        }
        .delIcon {
          position: absolute;
          right: -6px;
          top: -4px;
          z-index: 99;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          width: 14px;
          height: 14px;
          text-align: center;
          line-height: 14px;
          padding: 2px;
        }
      }

      .tab-text {
        color: #fff;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
    }
  }
</style>
