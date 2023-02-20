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
    width="1000px"
    class="rightLeftDialog"
    :show-close="false"
    draggable
    :modal="false"
    @close="closeDialog"
  >
    <div class="box">
      <div class="leftCol">
        <slot name="left" />
      </div>
      <div class="rightCol">
        <slot />
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .rightLeftDialog {
    .box {
      display: flex;
      flex: 1;

      .leftCol {
        height: 620px;
      }
      .rightCol {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>

<style lang="scss">
  .rightLeftDialog {
    border-radius: 5px;

    .el-dialog__header {
      padding: 0;
    }

    .el-dialog__body {
      padding: 0;
    }
  }
</style>
