<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { IconType } from '@/types'

  withDefaults(defineProps<{
    data: IconType
    el: string
  }>(), {
    el: 'div'
  })
</script>

<template>
  <component
    :is="el"
    flex="~ col items-center"
    class="cursor-pointer group"
    :href="data.url"
    :class="{ 'c-inherit decoration-none': el === 'a' }"
  >
    <div
      class="h-14 mb-2 rounded-xl w-14"
      flex="~ justify-center items-center"
      border="1 solid b-base"
    >
      <Icon :icon="data.logo" class="opacity-60 text-10"/>
    </div>
    <span class="min-h-6 opacity-60 overflow-hidden select-none text-center text-ellipsis text-nowrap w-full">{{ data.name }}</span>
  </component>
</template>
