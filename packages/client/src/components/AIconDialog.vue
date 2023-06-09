<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const url = ref('')
  const iconArr = ref([])

  async function fetchIcon() {
    const res = await fetch('https://api.iconify.design/search?query=zhihu')
    const { icons } = await res.json()
    console.log('res', 'icons')
    iconArr.value = icons
  }

  onMounted(() => {
    fetchIcon()
  })
</script>

<template>
  <div class="n-dialog p-3 rounded shadow-xl">
    <div
      class="mb-6"
      flex="~ items-start"
    >
      <ASiteBlock :icon="iconArr[0]" class="mr-2"/>
      <div class="gap-1 grid">
        <AInput v-model="url" placeholder="The URL..." icon="i-carbon:earth-europe-africa-filled"/>
        <AInput v-model="url" placeholder="The Name..." icon="i-carbon:text-align-center"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
