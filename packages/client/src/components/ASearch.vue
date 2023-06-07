<script setup lang="ts">
  import { ref } from 'vue'

  const searchValue = ref('')
</script>

<template>
  <div
    class="max-w-600px px4 rounded-10px transition-all"
    border="1 solid #62656a66"
    flex="~ 1  col"
  >
    <div
      class="h-46px"
      flex="~  items-center"
    >
      <div class="i-carbon:search opacity-60 text-2xl"/>
      <input
        v-model="searchValue"
        class="bg-transparent font-sans h-full opacity-85 outline-none px3 text-lg w-full"
        border="1 solid transparent"
        placeholder="Search..."
        autofocus
      >
      <div v-show="searchValue" class="cursor-pointer  hover:opacity-80  i-carbon:close  opacity-60  text-2xl"/>
    </div>
    <div
      class="py-2"
      border-t="1 solid #62656a66"
    >
      <div
        class="bg-opacity-12 bg-white cursor-pointer p2 rounded-md"
        flex="~ justify-between items-center"
      >
        <div>测测测</div>
        <div class="i-carbon:arrow-up-right opacity-75 text-lg"/>
      </div>
    </div>
  </div>
</template>

<style>

</style>
