import Router from '@koa/router'

import { getInfinityIconApi, getUrlIcon } from '../model/getIcon'
import { getBaiduSearchKeyWord } from '../model/searchKeyword'
const router = new Router()

// 获取网站的 icon
router.get('/getIcon', async ctx => {
  const { url } = ctx.request.query as { url: string }
  const data = await getInfinityIconApi(url)

  if (!data.iconArr.length) {
    data.iconArr = await getUrlIcon(url)
  }
  return data
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
