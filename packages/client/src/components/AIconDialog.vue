<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useFetch } from '@vueuse/core'
  import { reactive, ref, unref } from 'vue'

  const icon = reactive({
    url: '',
    name: '',
    logo: ''
  })
  const fetchUrl = ref('')
  const icons = ref([])
  const iconActiveIdx = ref(0)
  const { data: resData, execute } = useFetch(fetchUrl, { immediate: false }).json()

  // 获取二级域名
  function getSLD(url: string) {
    const domain = new URL(url).hostname.split('.')
    return domain.length > 2 ? domain[1] : domain[0]
  }

  async function fetchIcon() {
    const { url } = icon
    if (!url) return// TODO: 警告 黄色框
    icon.name = getSLD(url)
    fetchUrl.value = `https://api.iconify.design/search?query=${icon.name}`
    await execute()
    const data = unref(resData)
    icon.logo = data.icons[0]
    icons.value = data.icons
  }

  function selectIcon(item: string, index: number) {
    icon.logo = item
    iconActiveIdx.value = index
  }
</script>

<template>
  <div class="box-border n-dialog p-3 rounded shadow-xl w-300px">
    <div flex="~ items-start">
      <ASiteBlock :icon="icon.logo" :name="icon.name" class="mr-2"/>
      <div class="gap-5px" flex="~ col 1">
        <AInput
          v-model="icon.url"
          placeholder="The URL..."
          icon="i-carbon:content-delivery-network"
          @blur="fetchIcon"
        />
        <AInput v-model="icon.name" placeholder="The Name..." icon="i-carbon:text-align-center"/>
      </div>
    </div>
    <div flex="~ justify-end">
      <AButton>submit</AButton>
    </div>

    <div
      v-show="icons.length"
      flex="~ col 1"
      class="b-base mt-2"
      border="1 solid"
    >
      <div flex="~">
        <button
          class="b-base b-none bg-transparent px-4 py-2"
          border-r="1 solid"
        >
          Icons
        </button>
        <div class="b-base" flex="~ 1" border-b="1 solid"/>
      </div>

      <div class="h-40 overflow-hidden overflow-y-auto p-1 select-none" flex="~ wrap">
        <div
          v-for="(item, index) in icons"
          :key="item"
          :class="{ 'icons-item-active': index === iconActiveIdx }"
          border="1 solid transparent"
          class="b-base group hover:border-color-#32967266 p-1.5 rounded text-2"
          @click="selectIcon(item, index)"
        >
          <Icon
            :icon="item"
            :inline="true"
            class="group-hover:c-#3ec795 icon opacity-60 text-xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icons-item-active{
  border-color: #32967266;
  .icon{
      color: #3ec795;
    }
}
</style>
