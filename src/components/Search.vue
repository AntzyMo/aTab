<script setup lang="ts">
  import { useTemplateRef } from 'vue'

  const searchValue = ref('')
  const searchInputRef = useTemplateRef('searchInput')

  async function search() {
    if (searchValue.value)
      browser.tabs.create({ url: `https://www.baidu.com/s?wd=${searchValue.value}` })
  }

  // 清空输入框
  function clear() {
    searchValue.value = ''
    searchInputRef.value?.focus()
  }

  // 监听页面进入
  pageVisibilitychange(() => {
    clear()
  })
</script>

<template>
  <div
    class="max-w-650px  overflow-hidden  rounded-10px  transition-all  w-full"
    border="1 solid b-base"
    flex="~ 1  col"
  >
    <div
      class="h-46px  mx-4"
      flex="~  items-center"
    >
      <div class="i-carbon:search opacity-60 text-2xl" />
      <input
        ref="searchInput"
        v-model.trim="searchValue"
        class="bg-transparent  font-sans  h-full  opacity-85  outline-none  px3  text-16px  w-full"
        border="1 solid transparent"
        placeholder="Search..."
        autofocus
        @keyup.enter="search"
      >
    </div>
  </div>
</template>
