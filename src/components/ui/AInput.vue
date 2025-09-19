<script setup lang="ts">
  interface Props {
    icon?: string
    clear?: boolean
    placeholder?: string
    outsideClass: any
  }
  defineOptions({ inheritAttrs: false })

  withDefaults(defineProps<Props>(), {
    icon: 'i-carbon:search',
    clear: false,
    placeholder: 'Search...'
  })

  const modelValue = defineModel()
</script>

<template>
  <div
    class="px2 py-1 rounded transition-all"
    border="1 solid b-base"
    flex="~ 1 items-center"
    :class="outsideClass"
  >
    <div :class="icon" class="opacity-60 text-base" />
    <input
      v-bind="$attrs"
      v-model.trim="modelValue"
      class="bg-transparent flex-1 font-sans opacity-85 outline-none px-2"
      border="1 solid transparent"
      :placeholder="placeholder"
      autofocus
    >
    <div
      v-if="clear"
      :class="{ invisible: !modelValue }"
      class="cursor-pointer  hover:opacity-80  i-carbon:close  opacity-60  text-base"
      @click="modelValue = ''"
    />
  </div>
</template>
