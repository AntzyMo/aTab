import { baiduSearchKeyWordApi } from '../api'

export const getBaiduSearchKeyWord = async (wd: string) => {
  let list: string[] = []

  const { g } = await baiduSearchKeyWordApi(wd)
  if (g) {
    list = g.map(item => item.q)
  }
  return list
}
