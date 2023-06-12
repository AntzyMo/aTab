<script setup lang="ts">
  import { inject, ref } from 'vue'
  import type { IconType } from '@/types'

  import { tabsKey } from '@/shared/provideKey'

  const tabs = inject(tabsKey)
  const showIconDialog = ref(false)

  function saveTab(data: IconType) {
    tabs?.value.push(data)
  }
</script>

<template>
  <div class="gap-10 max-w-1000px w-full" flex="~ 1 !justify-start wrap">
    <ASiteBlock
      v-for="tab in tabs"
      :key="tab.name"
      :icon="tab.logo"
      :name="tab.name"
    />

    <div class="relative">
      <div
        :class="{ 'addIcon-active': showIconDialog }"
        class="cursor-pointer  group  h-14  hover:b-color-purple-500/40  mb-2  rounded-xl  transition-all-300  w-14"
        flex="~ justify-center items-center"
        border="1 dashed b-base"
        @click=" showIconDialog = true"
      >
        <div class="group-hover:c-purple-500 group-hover:opacity-35 i-carbon:add opacity-20 text-3xl transition-all-300"/>
      </div>
      <AIconDialog v-model="showIconDialog" @submit="saveTab"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.addIcon-active{
  border-color:#a855f766;
  div{
      color: rgba(168, 85, 247);
      opacity: .35;
  }
}
</style>
