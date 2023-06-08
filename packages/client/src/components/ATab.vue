<script setup lang="ts">

</script>

<template>
  <div flex="~ col items-center">
    <div
      class="border-base h-14 mb-2 rounded-xl w-14"
      flex="~ justify-center items-center"
      border="1 solid #62656a66"
    >
      <div class="opacity-60">
        icon
      </div>
    </div>
    <span class="opacity-60">aTab</span>
  </div>
  <div flex="~ col items-center">
    <div
      class="border-base cursor-pointer group h-14 hover:!border-opacity-40 hover:b-color-purple-500 mb-2 rounded-xl transition-all-300 w-14"
      flex="~ justify-center items-center"
      border="1 dashed #62656a66"
    >
      <div class="group-hover:!c-opacity-60 group-hover:c-purple-500">
        +
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
