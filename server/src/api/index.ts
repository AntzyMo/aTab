import request from '../utils/request'

interface DataResType<T> {
  data: T
}

interface iTabIconResType {
  backgroundColor: string
  imgSrc: string
  name: string
  src: string
  type: string
  url: string
  _id: string
  icon: string[]
}

// 获取iTabicon
export const getItabIconApi = async (url: string) => {
  return request<null, DataResType<iTabIconResType>>('https://api.codelife.cc/website/info', {
    method: 'get',
    headers: {
      signaturekey: '123',
      version: '123'
    },
    params: {
      lang: 'cn',
      url
    }
  })
}

interface baiduSearchKeyWordResType {
  g: { q: string }[] | null
}
// 百度联想词
export const baiduSearchKeyWordApi = async (wd: string) => {
  return request<null, baiduSearchKeyWordResType>('https://www.baidu.com/sugrec', {
    method: 'get',
    params: {
      prod: 'pc',
      wd
    }
  })
}
