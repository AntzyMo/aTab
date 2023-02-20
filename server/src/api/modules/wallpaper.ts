import request from '../../utils/request'
import type { DataResType } from '../type'

export interface iTabBindWallpaperResType {
  copyright: string
  enddate: string
  fullSrc: string
  raw: string
  thumb: string
  urlbase: string
  _id: string
}

// 获取iTab必应图片
export const getItabBingWallpaper = async (page: string) => {
  return request<null, DataResType<iTabBindWallpaperResType[]>>('https://api.codelife.cc/bing/list?=1', {
    method: 'get',
    headers: {
      signaturekey: '123',
      version: '123'
    },
    params: {
      page
    }
  })
}
