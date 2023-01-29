import { ref } from 'vue'

export default () => {
  const showSearchselect = ref(false)
  const searchSelectValue = ref(0)
  const searchUrlMap = ref([
    {
      name: '百度',
      iconUrl: 'https://files.codelife.cc/itab/search/baidu.svg',
      url: 'https://www.baidu.com/s?wd='
    },
    {
      name: 'Google',
      iconUrl: 'https://files.codelife.cc/itab/search/google.svg',
      url: 'https://www.google.com/search?q='
    }
  ])

  const selectUrl = (idx: number) => {
    searchSelectValue.value = idx
  }

  return {
    searchSelectValue,
    searchUrlMap,
    selectUrl,
    showSearchselect
  }
}
