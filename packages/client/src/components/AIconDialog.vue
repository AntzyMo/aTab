<script setup lang="ts">
  import { inject, reactive, ref } from 'vue'
  import { Icon, disableCache } from '@iconify/vue'
  import type { IconType } from '@/types'

  import { tabsKey } from '@/shared/provideKey'

  defineProps<Props>()
  const emit = defineEmits(['update:modelValue', 'submit'])
  disableCache('all')

  interface Props {
    modelValue: boolean
  }

  const icons = ref([])
  const iconActiveIdx = ref(0)
  const tabs = inject(tabsKey)

  const validate = reactive({
    url: '',
    name: ''
  })
  const icon = reactive<IconType>({
    url: '',
    name: '',
    logo: ''
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
    icon.name = getSLD(url)
    const res = await fetch(`https://api.iconify.design/search?query=${icon.name}`)
    const data = await res.json()

    icon.logo = data.icons[0]
    icons.value = data.icons
  }

  function selectIcon(item: string, index: number) {
    icon.logo = item
    iconActiveIdx.value = index
  }

  function clearObj(obj: object) {
    // @ts-expect-error
    Object.keys(obj).forEach(key => obj[key] = '')
  }

  function close() {
    emit('update:modelValue', false)
    clearObj(icon)
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
  <div v-if="modelValue" class="absolute box-border left-65% n-dialog p-3 rounded shadow-xl top-45% w-300px z-999">
    <div v-if="validate.url || validate.name" class="c-orange flex opacity-60 text-1 translate-x-56px">
      <p class="scale-80">
        {{ validate.url || validate.name }}
      </p>
    </div>
    <div flex="~ items-start">
      <div class="mr-2 w-58px">
        <ASiteBlock :icon="icon.logo" :name="icon.name"/>
      </div>
      <div class="gap-5px" flex="~ col 1">
        <div>
          <AInput
            v-model="icon.url"
            :outside-class="{ 'border-color-orange/40': validate.url }"
            placeholder="The URL..."
            icon="i-carbon:content-delivery-network"
            @blur="fetchIcon"
          />
        </div>
        <AInput
          v-model="icon.name"
          :outside-class="{ 'border-color-orange/40': validate.name }"
          placeholder="The Name..."
          icon="i-carbon:text-align-center"
          @blur="validateName"
        />
      </div>
    </div>
    <div flex="~ justify-end">
      <AButton class="border-opacity-0 hover:!border-color-transparent hover:!c-white hover:opacity-80 mr-1 opacity-30" @click="close">
        close
      </AButton>
      <AButton @click="submit">
        submit
      </AButton>
    </div>

    <div
      v-show="icons.length"
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

      <div class="col gap-8px max-h-40 overflow-hidden overflow-y-auto p-1 select-none" flex="~ wrap 1">
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
