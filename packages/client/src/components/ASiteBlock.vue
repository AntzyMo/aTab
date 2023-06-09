<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  interface Props {
    icon: string
  }
  defineProps<Props>()
</script>

<template>
  <a flex="~ col items-center" class="cursor-pointer group">
    <div
      class="b-base h-14 mb-2 rounded-xl w-14"
      flex="~ justify-center items-center"
      border="1 solid "
    >
      <Icon :icon="icon" class="opacity-60 text-10"/>
    </div>
    <span class="opacity-60">aTab</span>
  </a>
</template>

<style lang="scss" scoped>

</style>
