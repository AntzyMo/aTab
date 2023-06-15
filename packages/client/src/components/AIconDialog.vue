<script setup lang="ts">
  import { Icon, disableCache } from '@iconify/vue'
  import { inject, reactive, ref, watch } from 'vue'
  import type { IconType } from '@/types'

  import { tabsKey } from '@/shared/provideKey'

  const props = defineProps<{
    modelValue: boolean
    data: IconType | null
  }>()

  const emit = defineEmits(['update:modelValue', 'submit', 'close', 'delete'])
  disableCache('all')

  const icons = ref([])
  const iconActiveIdx = ref(-1)
  const tabs = inject(tabsKey)

  const validate = reactive({
    url: '',
    name: ''
  })
  const icon = reactive<IconType>({
    url: '',
    name: '',
    logo: '',
    searchIconName: ''
  })

  watch(() => props.modelValue, (isTrue: boolean) => {
    const { data } = props

    if (isTrue && data) {
      Object.assign(icon, data)
      fetchIcon()
    }
  })

  // 获取二级域名
  function getSLD(url: string) {
    const domain = new URL(url).hostname.split('.')
    return domain.length > 2 ? domain[1] : domain[0]
  }

  function validateUrl() {
    const { url } = icon
    if (!url) {
      validate.url = 'URL can\'t be blank'
    } else if (!url.includes('http')) {
      validate.url = 'Add a URL with http:// or https://'
    } else {
      validate.url = ''
    }
  }

  function validateName() {
    const { name } = icon

    if (!name.trim()) {
      validate.name = 'Name can\'t be blank'
    } else if (tabs!.value.some(tab => tab.name === name)) {
      validate.name = 'name already exists'
    } else {
      validate.name = ''
    }
  }

  async function fetchIcon() {
    validateUrl()
    if (validate.url) return

    const { url } = icon
    if (!icon.searchIconName) icon.searchIconName = getSLD(url)
    if (!icon.name) icon.name = icon.searchIconName

    const data = await fetchIconApi(icon.searchIconName)

    if (!icon.logo) icon.logo = data.icons[0]

    iconActiveIdx.value = data.icons.findIndex((item: string) => item === icon.logo)
  }

  async function fetchIconApi(keyword: string) {
    const res = await fetch(`https://api.iconify.design/search?query=${keyword}`)
    const data = await res.json()
    icons.value = data?.icons || []
    return data
  }

  async function searchIcon(e: Event) {
    const value = (e.target as HTMLInputElement).value
    await fetchIconApi(value)
  }

  function selectIcon(item: string, index: number) {
    icon.logo = item
    iconActiveIdx.value = index
  }

  function clearEffect(obj: object) {
    // @ts-expect-error
    Object.keys(obj).forEach(key => obj[key] = '')
  }

  function close() {
    emit('close')
    emit('update:modelValue', false)
    clearEffect(icon)
    clearEffect(validate)
    icons.value = []
  }

  function submit() {
    validateUrl()
    validateName()

    const isValidate = Object.values(validate).every(() => Boolean)
    if (isValidate) {
      emit('submit', { ...icon })
      close()
    }
  }
</script>

<template>
  <div v-if="modelValue" v-bind="$attrs" class="box-border n-dialog p-3 rounded shadow-xl w-300px z-999">
    <div v-if="validate.url || validate.name" class="c-orange/60 flex text-1 translate-x-56px">
      <p class="scale-80">
        {{ validate.url || validate.name }}
      </p>
    </div>
    <div flex="~ items-start">
      <div class="mr-2 w-58px">
        <ASiteBlock :data="icon"/>
      </div>
      <div class="gap-5px" flex="~ col 1">
        <div>
          <AInput
            v-model="icon.url"
            :outside-class="{ '!border-color-orange/40': validate.url }"
            placeholder="The URL..."
            icon="i-carbon:content-delivery-network"
            @blur="fetchIcon"
          />
        </div>
        <AInput
          v-model="icon.name"
          :outside-class="{ '!border-color-orange/40': validate.name }"
          placeholder="The Name..."
          icon="i-carbon:text-align-center"
          @blur="validateName"
        />
      </div>
    </div>
    <div flex="~ justify-end">
      <AButton v-if="data" class="border-opacity-0 hover:!border-color-transparent hover:!c-white hover:opacity-80 mr-1 opacity-30" @click="$emit('delete')">
        delete
      </AButton>
      <AButton @click="submit">
        submit
      </AButton>
    </div>

    <div
      flex="~ col 1"
      class="mt-2"
      border="1 solid b-base"
    >
      <div flex="~">
        <button
          class="b-none bg-transparent px-4 py-2"
          border-r="1 solid b-base"
        >
          Icons
        </button>
        <div class="" flex="~ 1" border-b="1 solid b-base"/>
      </div>

      <div class="max-h-40 min-h-40 p-1 select-none" flex="~ col">
        <div>
          <AInput
            v-model=" icon.searchIconName"
            outside-class="!border-color-transparent bg-dark m-1 mb-3"
            placeholder="Search Icon..."
            @input="searchIcon"
          />
        </div>
        <div flex="~ col 1" class="overflow-hidden overflow-y-auto">
          <div v-if="icons.length" gap-8px flex="~ wrap">
            <div
              v-for="(item, index) in icons"
              :key="item"
              :class="{ 'icons-item-active': index === iconActiveIdx }"
              border="1 solid transparent"
              class="group hover:border-color-#32967266 p-1.5 rounded text-2"
              @click="selectIcon(item, index)"
            >
              <Icon
                :icon="item"
                :inline="true"
                class="group-hover:c-#3ec795 icon opacity-60 text-xl"
              />
            </div>
          </div>
          <div v-else flex="~ 1 col justify-center items-center">
            <div class="i-carbon:magnify mb-1 opacity-20 text-8"/>
            <span class="opacity-20 text-12px">No Data</span>
          </div>
        </div>
      </div>
    </div>
    <div class="-z-1 fixed po-xy" @click="close"/>
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
