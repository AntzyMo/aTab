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
