<script setup lang="ts">
  // @ts-expect-error
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

  import Main from './views/index.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <Main />
  </el-config-provider>
</template>
