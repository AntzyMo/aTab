import Router from '@koa/router'

import { getItabIcon, getUrlIcon } from '../model/getIcon'
import { getBaiduSearchKeyWord } from '../model/searchKeyword'
import { getItabBingWallpaper } from '../model/wallpaper'

const router = new Router()

// 获取网站的 icon
router.get('/getIcon', async ctx => {
  const { url } = ctx.request.query as { url: string }
  let params = await getItabIcon(url)

  if (!params.iconArr.length) {
    params = await getUrlIcon(url)
  }
  return params
})

// 获取输入框联锁词
router.get('/searchKeyword', async ctx => {
  const { wd } = ctx.request.query as { wd: string }
  const list = await getBaiduSearchKeyWord(wd)
  return {
    kw: wd,
    list
  }
})

// 获取壁纸
router.get('/getWallpaper', async ctx => {
  const { page, type } = ctx.request.query as { page: string; type: string }
  const list = await getItabBingWallpaper(page)
  return list
})

export default router
