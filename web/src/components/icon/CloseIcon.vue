<script setup lang="ts">
  interface propsType {
    width?: number
    height?: number
    bold?: number
    color?: string
  }
  const { width = 18, height, bold = 4, color = '#8a8a8a' } = defineProps<propsType>()
</script>
<template>
  <svg
    :width="width"
    :height="height || width"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 8L40 40"
      :stroke="color"
      :stroke-width="bold"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 40L40 8"
      :stroke="color"
      :stroke-width="bold"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
