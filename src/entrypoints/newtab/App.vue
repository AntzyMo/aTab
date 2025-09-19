<script setup lang="ts">
  import Tab from '@/components/Tab.vue'
  import Plum from '@/components/Plum.vue'
  import Header from '@/components/Header.vue'
  import Search from '@/components/Search.vue'
</script>

<template>
  <div
    class="box-border  font-sans  h-100vh  p-6"
    @click.prevent.right
  >
    <Plum />
    <header
      class="mb30"
      flex="~ justify-end"
    >
      <Header />
    </header>

    <main flex="~ col items-center" class="relative">
      <Search class="absolute  z-1" />
      <Tab class="mt-20" />
    </main>
  </div>
</template>
