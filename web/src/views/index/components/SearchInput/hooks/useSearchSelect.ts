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

  // 按住 ctrl + 方向键下 切换搜索引擎
  const keyCtrlDown = () => {
    if (searchSelectValue.value >= searchUrlMap.value.length - 1) {
      searchSelectValue.value = 0
    } else {
      searchSelectValue.value++
    }
  }

  // 按住 ctrl + 方向键上 切换搜索引擎
  const keyCtrlUp = () => {
    searchSelectValue.value--
    if (searchSelectValue.value < 0) {
      searchSelectValue.value = searchUrlMap.value.length - 1
    }
  }

  return {
    searchSelectValue,
    searchUrlMap,
    selectUrl,
    showSearchselect,
    keyCtrlDown,
    keyCtrlUp
  }
}
