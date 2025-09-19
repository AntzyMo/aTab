<script setup lang="ts">
  import { ref, toValue } from 'vue'

  import { vDebounce } from '@/directives'
  import { pageVisibilitychange } from '@/shared/helper'

  const searchValue = ref('')
  const keywordIdx = ref(-1)
  const keywordList = ref<{ text: string }[]>([])
  const searchInputRef = ref<HTMLInputElement | null>(null)

  function keywordDown() {
    if (!keywordList.value.length) return
    keywordIdx.value++
    if (keywordIdx.value > keywordList.value.length - 1) keywordIdx.value = 0
    searchValue.value = keywordList.value[keywordIdx.value].text
  }
  function keywordUp() {
    const keywordListLength = keywordList.value.length
    if (!keywordListLength) return
    keywordIdx.value--
    if (keywordIdx.value < 0) keywordIdx.value = keywordListLength - 1
    searchValue.value = keywordList.value[keywordIdx.value].text
  }
  function keywordEnter() {
    const val = toValue(searchValue)
    if (!val) return
    window.open(`https://www.baidu.com/s?wd=${val}`)
    clear()
  }

  // 清空输入框
  function clear() {
    searchValue.value = ''
    searchInputRef.value?.focus()
    keywordList.value = []
    keywordIdx.value = -1
  }

  // 监听页面进入
  pageVisibilitychange(() => {
    clear()
  })

  async function search() {
    const val = toValue(searchValue)
    if (!val) return clear()

    const script = document.createElement('script')
    script.id = 'kwScript'
    script.src = `https://www.baidu.com/sugrec?prod=pc&wd=${val}&cb=kwCallback`
    document.body.appendChild(script)
  }

  (window as any).kwCallback = function (res: any) {
    document.body.removeChild(document.getElementById('kwScript')!)

    if (!res.g) return keywordList.value = []
    keywordList.value = res.g.map((item: any) => ({ text: item.q })).slice(0, 6)
  }
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
      <div class="i-carbon:search opacity-60 text-2xl"/>
      <input
        ref="searchInputRef"
        v-model="searchValue"
        v-debounce="'input'"
        class="bg-transparent  font-sans  h-full  opacity-85  outline-none  px3  text-16px  w-full"
        border="1 solid transparent"
        placeholder="Search..."
        autofocus
        @keydown.down="keywordDown"
        @keydown.up="keywordUp"
        @input="search"
        @keyup.enter="keywordEnter"
      >
      <div v-show="searchValue" class="cursor-pointer  hover:opacity-80  i-carbon:close  opacity-60  text-2xl" @click="clear"/>
    </div>

    <div
      :class="{ '!h-0 !p-0 !b-none': !keywordList.length }"
      class="backdrop-blur-10px gap-y-2 h-250px overflow-hidden px-4 py-2 transition-all-300"
      flex="~ col"
      border-t="1 solid b-base"
    >
      <a
        v-for="(item, index) in keywordList"
        :key="item.text"
        :class="{ 'n-keyword-active keyword': index === keywordIdx }"
        class="cursor-pointer ease-in-out group hover:n-keyword-active p2 rounded-md transition-height-300"
        flex="~ justify-between items-center"
        :href="`https://www.baidu.com/s?wd=${item.text}`"
        target="_blank"
      >
        <div class="group-hover:opacity-100  opacity-75  transition-all-300">
          {{ item.text }}
        </div>
        <div class="group-hover:opacity-100 i-carbon:arrow-up-right opacity-75 text-lg transition-all-300"/>
      </a>
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

