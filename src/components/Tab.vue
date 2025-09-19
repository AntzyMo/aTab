<script setup lang="ts">
  import { VueDraggable } from 'vue-draggable-plus'
  import type { IconType } from './types'

  import IconDialog from './IconDialog.vue'

  const addIconActive = ref(false)

  const tabs = ref<IconType[]>([])

  const iconDialogRef = useTemplateRef<InstanceType<typeof IconDialog>>('iconDialog')
  const addIconDialogRef = useTemplateRef<InstanceType<typeof IconDialog>>('addIconDialog')

  async function initTabs() {
    tabs.value = await getTabs()
    console.log('tabs.value ', tabs.value)
  }

  initTabs()

  function handleAddIcon() {
    addIconActive.value = true
    addIconDialogRef.value?.openIconDialog()
  }

  async function handleAddIconSubmit(data: IconType) {
    await addTab(data)
    addIconActive.value = false
  }
</script>

<template>
  <div class="font-sans  max-w-1000px  w-full">
    <VueDraggable v-model="tabs" :animation="150">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="gap-10"
        flex="~ justify-start wrap"
      >
        <IconDialog
          ref="iconDialog"
          :data="tab"
          class="absolute left-62px top-45px"
          @submit="data => updateTab(data)"
        >
          <ASiteBlock
            :data="tab"
            el="a"
            @click.prevent.right="iconDialogRef?.openIconDialog()"
          />
        </IconDialog>
      </div>
    </VueDraggable>

    <IconDialog ref="addIconDialog" class="absolute left-62px top-45px" @submit="handleAddIconSubmit">
      <div
        :class="{ 'addIcon-active': addIconActive }"
        class="cursor-pointer dark:hover:b-color-purple-500/40 group h-14 hover:b-color-purple-500/60 mb-2 rounded-xl transition-all-300 w-14"
        flex="~ justify-center items-center"
        border="1 dashed b-base"
        @click="handleAddIcon"
      >
        <div class="dark:group-hover:opacity-35 group-hover:c-purple-500 group-hover:opacity-55 i-carbon:add opacity-20 text-3xl transition-all-300" />
      </div>
    </IconDialog>
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
