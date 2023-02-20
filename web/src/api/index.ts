import request from '@/utils/request'

import type { iTabBindWallpaperResType } from '../../../server/src/api/modules/wallpaper'

export interface searchIconType {
  iconArr: { img: string; bgColor: string }[]
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

// 获取壁纸
export const getWallpaper = (page = 1, type = 1) => {
  return request<null, iTabBindWallpaperResType[]>({
    url: '/getWallpaper',
    method: 'get',
    params: {
      page,
      type
    }
  })
}
