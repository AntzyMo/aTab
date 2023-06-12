<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  interface Props {
    icon: string
    name: string
  }
  defineProps<Props>()
</script>

<template>
  <a flex="~ col items-center" class="cursor-pointer group">
    <div
      class="h-14 mb-2 rounded-xl w-14"
      flex="~ justify-center items-center"
      border="1 solid b-base"
    >
      <Icon :icon="icon" class="opacity-60 text-10"/>
    </div>
    <span class="min-h-6 opacity-60 overflow-hidden text-center text-ellipsis text-nowrap w-full">{{ name }}</span>
  </a>
</template>

