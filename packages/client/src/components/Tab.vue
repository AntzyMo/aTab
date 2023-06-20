<script setup lang="ts">
  import { ref } from 'vue'
  import Draggable from 'vuedraggable'
  import type { IconType } from '@/types'

  import useTabs from '@/hooks/useTabs'

  const addIconActive = ref(false)
  const {
    tabs,
    addTab,
    deleteTab,
    updateTab,
    replaceChromeTabs,
    triggerIconDialog
  } = useTabs()
</script>

<template>
  <div v-bind="$attrs" class="font-sans  max-w-1000px  w-full">
    <Draggable
      v-model="tabs"
      item-key="name"
      :component-data="{
        class: 'gap-10',
        flex: '~ 1 !justify-start wrap',
      }"
      @end="replaceChromeTabs"
    >
      <template #item="{ element: tab, index }">
        <div class="relative" @click.prevent.right="triggerIconDialog(tab)">
          <ASiteBlock
            :data="tab.data"
            el="a"
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
      </template>
      <template #footer>
        <div class="relative">
          <div
            :class="{ 'addIcon-active': addIconActive }"
            class="cursor-pointer dark:hover:b-color-purple-500/40 group h-14 hover:b-color-purple-500/60 mb-2 rounded-xl transition-all-300 w-14"
            flex="~ justify-center items-center"
            border="1 dashed b-base"
            @click="addIconActive = true"
            @click.prevent.right="addIconActive = true"
          >
            <div class="dark:group-hover:opacity-35 group-hover:c-purple-500 group-hover:opacity-55 i-carbon:add opacity-20 text-3xl transition-all-300"/>
          </div>
          <AIconDialog
            v-model="addIconActive"
            class="absolute left-62px top-45px"
            @submit="addTab"
            @close="addIconActive = false"
          />
        </div>
      </template>
    </Draggable>
  </div>
</template>

<style lang="scss" scoped>
.addIcon-active{
  border-color:#a855f799;
  div{
    color: rgba(168, 85, 247);
      opacity: .55;
  }
}
.dark .addIcon-active{
  border-color:#a855f766;
  div{
      color: rgba(168, 85, 247);
      opacity: .35;
  }
}
</style>
