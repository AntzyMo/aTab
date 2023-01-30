<script setup lang="ts">
  import type { Component } from 'vue'
  import { computed, ref } from 'vue'

  interface PropsType {
    x: number
    y: number
    open: boolean
    data: {
      name: string
      icon: Component
    }[]
  }

  const { x = 0, y, open = false } = defineProps<PropsType>()

  const rightMemuRef = ref<HTMLDivElement | null>(null)

  // 计算右键坐标防止右侧和底部溢出
  const leftTopStyle = computed(() => {
    if (!rightMemuRef.value) {
      return {
        left: 0,
        top: 0
      }
    }

    const rightOverflow =
      document.body.clientWidth - rightMemuRef.value.offsetWidth
    const bottomOverflow =
      document.body.clientHeight - rightMemuRef.value.offsetHeight

    const left = x > rightOverflow ? rightOverflow : x
    const bottom = y > bottomOverflow ? bottomOverflow : y

    return {
      left: `${left}px`,
      top: `${bottom}px`
    }
  })
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
    >
      <span>{{ item.name }}</span>
      <component :is="item.icon" />
    </div>
  </div>
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
