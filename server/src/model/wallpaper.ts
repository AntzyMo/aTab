import { getItabBingWallpaper as getItabBingWallpaperApi } from '../api'

export const getItabBingWallpaper = async (page: string) => {
  const { data } = await getItabBingWallpaperApi(page)

  return data
}
