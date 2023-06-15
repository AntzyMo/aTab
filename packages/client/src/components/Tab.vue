<script setup lang="ts">
  import { ref } from 'vue'
  import type { IconType } from '@/types'

  import useTabs from '@/hooks/useTabs'

  const addIconActive = ref(false)
  const { tabs, addTab, updateTab, triggerIconDialog, deleteTab } = useTabs()
</script>

<template>
  <div v-bind="$attrs" class="font-sans gap-10 max-w-1000px w-full" flex="~ 1 !justify-start wrap">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="relative"
    >
      <ASiteBlock
        :data="tab.data"
        el="a"
        @click.prevent.right="triggerIconDialog(tab)"
      />
      <AIconDialog
        v-model="tab.show"
        :data="tab.data"
        class="absolute left-62px top-45px"
        @submit="(data:IconType) => updateTab(data, index)"
        @close="triggerIconDialog(tab)"
        @delete="deleteTab(index)"
      />
    </div>
    <div class="relative">
      <div
        :class="{ 'addIcon-active': addIconActive }"
        class="cursor-pointer  group  h-14  hover:b-color-purple-500/40  mb-2  rounded-xl  transition-all-300  w-14"
        flex="~ justify-center items-center"
        border="1 dashed b-base"
        @click="addIconActive = true"
      >
        <div class="group-hover:c-purple-500 group-hover:opacity-35 i-carbon:add opacity-20 text-3xl transition-all-300"/>
      </div>
      <AIconDialog
        v-model="addIconActive"
        class="absolute left-62px top-45px"
        @submit="addTab"
        @close="addIconActive = false"
      />
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
