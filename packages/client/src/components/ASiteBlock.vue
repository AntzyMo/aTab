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
      class="group-hover:border-color-light/20 h-14 mb-2 rounded-xl transition-border-color-300 w-14"
      flex="~ justify-center items-center"
      border="1 solid b-base"
    >
      <Icon :icon="data.logo" class="group-hover:opacity-70 opacity-60 text-10 transition-opacity-80"/>
    </div>
    <span class="group-hover:opacity-70  min-h-6  opacity-60  overflow-hidden  select-none  text-14px  text-center  text-ellipsis  text-nowrap  transition-opacity-300  w-full">{{ data.name }}</span>
  </component>
</template>
