import { type Ref, reactive, ref } from 'vue'

import type { searchKeyWordListType } from '@/api'
import { searchKeywordApi } from '@/api'

let timer: number

export default (serachValue: Ref<string>) => {
  const keyWordList = ref<searchKeyWordListType[]>([])
  const keyWordListActive = ref(-1)

  const pinyin = reactive({
    start: 0,
    end: 0,
    flag: false
  })

  // 防抖搜索
  const debounceSearchKeyWord = (val: string) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(async () => {
      if (!val) {
        keyWordList.value = []
        return
      }

      const { list } = await searchKeywordApi(val)
      keyWordList.value = list
    }, 100)
  }

  const searchKeyWord = (val: string) => {
    if (pinyin.flag) return
    debounceSearchKeyWord(val)
  }

  const searchKeyWordDown = () => {
    if (!keyWordList.value.length) return
    keyWordListActive.value++
    if (keyWordListActive.value > keyWordList.value.length - 1) keyWordListActive.value = 0
    serachValue.value = keyWordList.value[keyWordListActive.value].value
  }

  const searchKeyWordUp = () => {
    if (!keyWordList.value.length) return
    keyWordListActive.value--
    if (keyWordListActive.value < 0) keyWordListActive.value = keyWordList.value.length - 1
    serachValue.value = keyWordList.value[keyWordListActive.value].value
  }

  // 拼音开始输入
  const inputPinyinStart = (searchInputRef: HTMLInputElement) => {
    pinyin.flag = true
    pinyin.start = searchInputRef.selectionStart!
    pinyin.end = searchInputRef.selectionEnd!
    console.log(searchInputRef.selectionStart, searchInputRef.selectionEnd)
  }

  // 拼音输入时
  const inputPinyinSearch = (e: CompositionEvent, value: string) => {
    const { data } = e

    const valueStart = value.slice(0, pinyin.start)
    const valueEnd = value.slice(pinyin.end)

    const searchValue = valueStart + data + valueEnd
    debounceSearchKeyWord(searchValue)
  }

  // 拼音完成输入
  const inputPinyinEnd = () => {
    pinyin.flag = false
  }

  return {
    keyWordList,
    searchKeyWord,
    searchKeyWordDown,
    keyWordListActive,
    searchKeyWordUp,
    inputPinyinStart,
    inputPinyinSearch,
    inputPinyinEnd
  }
}
