<script setup lang="ts">
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
