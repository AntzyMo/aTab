<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import type { IconType } from '@/types'

  withDefaults(defineProps<{
    data: IconType
    el: string
  }>(), {
    el: 'div'
  })
  defineOptions({
    inheritAttrs: false
  })
</script>

<template>
  <component
    :is="el"
    flex="~ col items-center"
    class="cursor-pointer group"
    :href="data.url"
  >
    <div
      class="h-14 mb-2 rounded-xl w-14"
      flex="~ justify-center items-center"
      v-bind="$attrs"
    >
      <Icon :icon="data.logo" class="group-hover:opacity-70 opacity-60 text-10 transition-opacity-80"/>
    </div>
    <span class="group-hover:opacity-70  min-h-6  opacity-60  overflow-hidden  select-none  text-14px  text-center  text-ellipsis  text-nowrap  transition-opacity-300  w-full">{{ data.name }}</span>
  </component>
</template>
