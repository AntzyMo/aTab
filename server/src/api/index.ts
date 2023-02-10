import request from '../utils/request'

// 获取网站名称
interface DataResType<T> {
  data: T
}
export const getInfinityTitle = async (url: string) => {
  return request<null, DataResType<{ title: string } | null>>('https://api.infinitynewtab.com/v2/icon/title', {
    method: 'get',
    params: {
      url
    }
  })
}

interface InfinityIconResType {
  _id: string
  url: string
  src: string
  source: string
}
// 获取网站名称
export const getInfinityIcon = async (url: string) => {
  return request<null, DataResType<InfinityIconResType[]>>('https://api.infinitynewtab.com/v2/icon/get_logo_list', {
    method: 'get',
    params: {
      host: url,
      limit: 100
    }
  })
}

interface baiduSearchKeyWordResType {
  g: { q: string }[] | null
}
// 获取网站名称
export const baiduSearchKeyWordApi = async (wd: string) => {
  return request<null, baiduSearchKeyWordResType>('https://www.baidu.com/sugrec', {
    method: 'get',
    params: {
      prod: 'pc',
      wd
    }
  })
}
