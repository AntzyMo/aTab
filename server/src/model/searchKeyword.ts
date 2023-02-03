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

  const { q, g } = res.data

  if (g) {
    list = g.map((item: { q: any }) => ({
      type: 'search',
      value: item.q
    }))
  } else {
    list.push({ type: 'search', value: q })
  }
  return list
}
