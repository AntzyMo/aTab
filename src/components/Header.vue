<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core'

  const isDark = useDark()
  const toggleDark = useToggle(isDark)
</script>

<template>
  <div
    class="cursor-pointer dark:c-white hover:opacity-100 opacity-60 text-2xl"
    transition="opacity duration-300"
    :class="[isDark ? 'i-carbon:moon' : 'i-carbon:light']"
    @click="toggleDark()"
  />
</template>
