import Router from '@koa/router'

import { getItabIcon, getUrlIcon } from '../model/getIcon'
import { getBaiduSearchKeyWord } from '../model/searchKeyword'
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

export default router
