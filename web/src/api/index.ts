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

export interface searchKeyWordListType {
  type: 'stearch'
  value: string
}

interface searchKeyWordType {
  kw: string
  list: searchKeyWordListType[]
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
