import { type Ref, ref } from 'vue'

import type { searchKeyWordListType } from '@/api'
import { searchKeywordApi } from '@/api'

let timer: number
export default (serachValue: Ref<string>) => {
  const keyWordList = ref<searchKeyWordListType[]>([])
  const keyWordListActive = ref(-1)

  const searchKeyWord = (val: string) => {
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

  const searchKeyWordDown = () => {
    if (!keyWordList.value.length) return
    keyWordListActive.value++
    serachValue.value = keyWordList.value[keyWordListActive.value].value
    if (keyWordListActive.value === keyWordList.value.length) keyWordListActive.value = 0
  }

  return {
    keyWordList,
    searchKeyWord,
    searchKeyWordDown,
    keyWordListActive
  }
}
