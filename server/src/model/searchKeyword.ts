import axios from 'axios'

export interface searchKeywordListType {
  type: 'search'
  value: string
}

export const getBaiduSearchKeyWord = async (wd: string) => {
  const res = await axios.get('https://www.baidu.com/sugrec', {
    params: {
      prod: 'pc',
      wd
    }
  })

  let list: searchKeywordListType[] = []

  const { g } = res.data

  if (g) {
    list = g.map((item: { q: any }) => item.q)
  }
  return list
}
