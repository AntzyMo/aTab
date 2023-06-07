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
      class="gap-y-2 py-2"
      flex="~ col"
      border-t="1 solid #62656a66"
    >
      <div
        v-for="item in 4"
        :key="item"
        class="cursor-pointer ease-in-out group hover:n-keywordActive p2 rounded-md transition-all-300"
        flex="~ justify-between items-center"
      >
        <div class="group-hover:opacity-100 opacity-75 transition-all-300">
          测测测
        </div>
        <div class="group-hover:opacity-100 i-carbon:arrow-up-right opacity-75 text-lg transition-all-300"/>
      </div>
    </div>
  </div>
</template>

