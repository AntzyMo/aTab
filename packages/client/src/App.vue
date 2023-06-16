<script setup lang="ts">
  import { provide } from 'vue'
  import { useStorage } from '@vueuse/core'
  import type { IconType } from '@/types'

  import { tabsKey } from '@/shared/provideKey'

  const tabs = useStorage<IconType[]>('tabs', [])
  provide(tabsKey, tabs)
</script>

<template>
  <div
    class="box-border  font-sans  h-100vh  p-6"
    @click.prevent.right
  >
    <APlum/>
    <header
      class="mb30"
      flex="~ justify-end"
    >
      <ADark/>
    </header>

    <main flex="~ col items-center" class="relative">
      <ASearch class="absolute  z-1"/>
      <Tab class="mt-20"/>
    </main>
  </div>
</template>

