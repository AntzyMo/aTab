import { getItabBingWallpaper as getItabBingWallpaperApi } from '../api'

const replacePngToWebp = (str: string) => str.replaceAll(/\png|jpg|gif|jpeg/g, 'webp')

export const getItabBingWallpaper = async (page: string) => {
  const { data } = await getItabBingWallpaperApi(page)
  data.forEach(item => {
    item.fullSrc = replacePngToWebp(item.fullSrc)
    item.thumb = replacePngToWebp(item.thumb)
  })
  return data
}
