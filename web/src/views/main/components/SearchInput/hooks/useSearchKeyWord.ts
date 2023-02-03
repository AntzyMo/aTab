import { ref } from 'vue'

import type { searchKeyWordListType } from '@/api'
import { searchKeywordApi } from '@/api'

export default () => {
  const keyWordList = ref<searchKeyWordListType[]>([])

  const searchKeyWord = async (val: string) => {
    if (!val) return (keyWordList.value = [])

    const { list } = await searchKeywordApi(val)
    keyWordList.value = list
  }

  return {
    keyWordList,
    searchKeyWord
  }
}
