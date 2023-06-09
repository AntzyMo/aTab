<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    modelValue: string
    icon: string
    clear: boolean
    placeholder: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    icon: 'i-carbon:search',
    clear: false,
    placeholder: 'Search...'
  })

  const searchValue = ref(props.modelValue)
</script>

<template>
  <div
    class="b-base px2 py-1 rounded transition-all"
    border="1 solid"
    flex="~ 1 items-center"
  >
    <div :class="icon" class="opacity-60 text-base"/>
    <input
      v-bind="$attrs"
      v-model="searchValue"
      class="bg-transparent flex-1 font-sans h-full opacity-85 outline-none px-2 w-full"
      border="1 solid transparent"
      :placeholder="placeholder"
      autofocus
    >
    <div
      v-if="clear"
      :class="{ invisible: !searchValue }"
      class="cursor-pointer  hover:opacity-80  i-carbon:close  opacity-60  text-base"
      @click="searchValue = ''"
    />
  </div>
</template>

