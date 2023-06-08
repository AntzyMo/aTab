<script setup lang="ts">
  import { ref } from 'vue'

  import { vDebounce } from '@/directive'

  const searchValue = ref('')
  const keywordIdx = ref(-1)
  function keywordDown() {
    // if (!keyWordList.value.length) return
    keywordIdx.value++
    // if (keyWordListActive.value > keyWordList.value.length - 1) keyWordListActive.value = 0
    // serachValue.value = keyWordList.value[keyWordListActive.value]
  }
  function keywordUp() {
    // const keyWordListLength = keyWordList.value.length
    // if (!keyWordListLength) return
    keywordIdx.value--
    // if (keyWordListActive.value < 0) keyWordListActive.value = keyWordListLength - 1
    // serachValue.value = keyWordList.value[keyWordListActive.value]
  }

  function search() {
    console.log(searchValue.value)
  }
</script>

<template>
  <div
    class="max-w-600px px4 rounded-10px transition-all w-full"
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
        v-debounce="'input'"
        class="bg-transparent font-sans h-full opacity-85 outline-none px3 text-lg w-full"
        border="1 solid transparent"
        placeholder="Search..."
        autofocus
        @keydown.down="keywordDown"
        @keydown.up="keywordUp"
        @input="search"
      >
      <div v-show="searchValue" class="cursor-pointer  hover:opacity-80  i-carbon:close  opacity-60  text-2xl"/>
    </div>

    <div
      :class="{ '!h-0 !p-0 !b-none': !searchValue }"
      class="gap-y-2 h-250px overflow-hidden py-2 transition-all-300"
      flex="~ col"
      border-t="1 solid #62656a66"
    >
      <div
        v-for="(item, index) in 6"
        :key="item"
        :class="{ 'n-keyword-active keyword': index === keywordIdx }"
        class="cursor-pointer ease-in-out group hover:n-keyword-active p2 rounded-md transition-height-300"
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

<style lang="scss" scoped>
.keyword{
  div{
    opacity: 1;
  }
}
.transition-keyword{
  transition-property:padding,height;
  transition: 300ms ease-in-out;
}
</style>

