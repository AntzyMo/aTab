<script setup lang="ts">
  interface propsType {
    modelValue: boolean
  }
  interface emitType {
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
  }
  const { modelValue = false } = defineProps<propsType>()
  const emit = defineEmits<emitType>()
  const closeDialog = () => {
    emit('update:modelValue', false)
    emit('close')
  }
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    width="724px"
    class="dialog"
    :show-close="false"
    draggable
    :modal="false"
    @close="closeDialog"
  >
    <template #header>
      <header>
        <slot name="header" />
      </header>
    </template>
    <slot />
  </el-dialog>
</template>

<style lang="scss">
  .dialog {
    border-radius: 10px;

    header {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      margin-right: 0;
    }
  }
</style>
