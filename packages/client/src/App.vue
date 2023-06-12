<script setup lang="ts">
  import { provide } from 'vue'
  import { useStorage } from '@vueuse/core'
  import type { IconType } from '@/types'

  import { tabsKey } from '@/shared/provideKey'

  const tabs = useStorage<IconType[]>('tabs', [])
  provide(tabsKey, tabs)
</script>

<template>
  <div p-3 font-sans>
    <header
      class="mb30"
      flex="~ justify-end"
    >
      <ADark/>
    </header>

    <main flex="~ col items-center">
      <ASearch class="mb10"/>
      <Tab/>
    </main>
  </div>
</template>

