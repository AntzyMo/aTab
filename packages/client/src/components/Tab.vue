<script setup lang="ts">

</script>

<template>
  <div class="max-w-1000px w-full" flex="~ 1 !justify-start">
    <div flex="~ col items-center">
      <div
        class="b-base h-14 mb-2 rounded-xl w-14"
        flex="~ justify-center items-center"
        border="1 solid "
      >
        <div class="opacity-60">
          icon
        </div>
      </div>
      <span class="opacity-60">aTab</span>
    </div>

    <div flex="~ col items-center">
      <div
        class="b-base border-base cursor-pointer group h-14 hover:!border-opacity-40 hover:b-color-purple-500 mb-2 rounded-xl transition-all-300 w-14"
        flex="~ justify-center items-center"
        border="1 dashed"
      >
        <div class="group-hover:c-purple-500 group-hover:opacity-35 i-carbon:add opacity-20 text-3xl transition-all-300"/>
      </div>
    </div>
    <AIconDialog/>
  </div>
</template>

<style lang="scss" scoped>

</style>
