import request from '@/utils/request'

interface searchIconType {
  iconArr: string[]
  url: string
  name: string
}

export const searchIconApi = (url: string) => {
  return request<null, searchIconType>({
    url: '/getIcon',
    method: 'get',
    params: {
      url
    }
  })
}

interface searchKeyWordType {
  kw: string
  list: string[]
}

// 搜索联锁词
export const searchKeywordApi = (wd: string) => {
  return request<null, searchKeyWordType>({
    url: '/searchKeyword',
    method: 'get',
    params: {
      wd
    }
  })
}
