<script setup lang="ts">
  import { Icon, disableCache } from '@iconify/vue'
  import { inject, reactive, ref, watch } from 'vue'
  import { createReusableTemplate } from '@vueuse/core'
  import type { IconType } from '@/types'

  import { tabsKey } from '@/shared/provideKey'

  const props = defineProps<{
    modelValue: boolean
    data: IconType | null
  }>()
  const emit = defineEmits(['update:modelValue', 'submit', 'close', 'delete'])

  const [DefineFetchedTemplate, ReuseFetchedTemplate] = createReusableTemplate<{ icon: string; text: string }>()
  disableCache('all')

  const isLoading = ref(false)
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
    } else if (tabs!.value.some(tab => tab.name === name) && !props.data) {
      validate.name = 'name already exists'
    } else {
      validate.name = ''
    }
  }

  async function fetchIcon() {
    validateUrl()
    if (validate.url) return

    const { url } = icon
    const isAddOrUpate = !props.data || props.data.url !== url

    if (isAddOrUpate) {
      icon.searchIconName = icon.name = getSLD(url)
    }

    const data = await fetchIconApi(icon.searchIconName)

    if (isAddOrUpate) icon.logo = data?.icons[0] || ''

    iconActiveIdx.value = data?.icons?.findIndex((item: string) => item === icon.logo)
  }

  async function fetchIconApi(keyword: string) {
    isLoading.value = true
    const res = await fetch(`https://api.iconify.design/search?query=${keyword}`)
    const data = await res.json()
    icons.value = data?.icons || []
    isLoading.value = false
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

    const isValidate = Object.values(validate).some(Boolean)
    if (!isValidate) {
      emit('submit', { ...icon })
      close()
    }
  }
</script>

<template>
  <DefineFetchedTemplate v-slot="{ ico, text }">
    <div flex="~ 1 col justify-center items-center">
      <div :class="`${ico}`" class="mb-1 opacity-20 text-8"/>
      <span class="opacity-20 text-12px">{{ text }}</span>
    </div>
  </DefineFetchedTemplate>
  <div v-if="modelValue" v-bind="$attrs" class="box-border n-dialog p-3 rounded shadow-xl w-300px z-999">
    <div v-if="validate.url || validate.name" class="c-orange dark:c-orange/60 flex text-1 translate-x-56px">
      <p class="scale-80">
        {{ validate.url || validate.name }}
      </p>
    </div>
    <div flex="~ items-start">
      <div class="mr-2 w-58px">
        <ASiteBlock :data="icon" border="1 solid b-base"/>
      </div>
      <div class="gap-5px" flex="~ col 1">
        <div>
          <AInput
            v-model="icon.url"
            :outside-class="{ '!border-color-orange dark:!border-color-orange/40': validate.url }"
            placeholder="The URL..."
            icon="i-carbon:content-delivery-network"
            @blur="fetchIcon"
          />
        </div>
        <AInput
          v-model="icon.name"
          :outside-class="{ '!border-color-orange dark:!border-color-orange/40': validate.name }"
          placeholder="The Name..."
          icon="i-carbon:text-align-center"
          @blur="validateName"
        />
      </div>
    </div>
    <div flex="~ justify-end">
      <AButton v-if="data" class="border-opacity-0  dark:hover:!c-white  dark:hover:opacity-80  hover:!border-color-transparent  hover:opacity-60  mr-1  opacity-30" @click="$emit('delete')">
        delete
      </AButton>
      <AButton class="dark:hover:border-color-green/60 dark:hover:c-green/80 dark:opacity-80 hover:border-color-green-700/60 hover:c-green-700" @click="submit">
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
            outside-class="!border-color-transparent bg-light-700 dark:bg-dark m-1 mb-3"
            placeholder="Search Icon..."
            @input="searchIcon"
          />
        </div>
        <div flex="~ col 1" class="overflow-hidden overflow-y-auto">
          <ReuseFetchedTemplate v-if="isLoading" ico="i-svg-spinners:gooey-balls-2 " text="loading..."/>
          <div v-else-if="icons.length" gap-8px flex="~ wrap">
            <div
              v-for="(item, index) in icons"
              :key="item"
              :class="{ 'icons-item-active': index === iconActiveIdx }"
              border="1 solid transparent"
              class="dark:hover:border-color-#32967266 group hover:border-color-green-700/60 p-1.5 rounded text-2"
              @click="selectIcon(item, index)"
            >
              <Icon
                :icon="item"
                :inline="true"
                class="dark:group-hover:c-#3ec795 dark:opacity-60 group-hover:c-green-700 icon opacity-70 text-xl"
              />
            </div>
          </div>
          <ReuseFetchedTemplate v-else ico="i-carbon:magnify" text="No Data"/>
        </div>
      </div>
    </div>
    <div class="-z-1 fixed po-xy" @click="close" @click.prevent.right="close"/>
  </div>
</template>

<style lang="scss" scoped>
.icons-item-active{
  border-color: rgba(21, 128, 61, 0.6);
  .icon{
      color: rgb(21, 128, 61);
    }
}
.dark .icons-item-active{
  border-color: #32967266;
  .icon{
      color: #3ec795;
    }
}
</style>
