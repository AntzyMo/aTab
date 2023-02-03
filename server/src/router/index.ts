import Router from '@koa/router'

import { getInfinityIconApi, getUrlIcon } from '../model/getIcon'
import type { searchKeywordListType } from '../model/searchKeyword'
import { getBaiduSearchKeyWord } from '../model/searchKeyword'
import { successRes } from '../utils/bodyRes'
const router = new Router()

// 获取网站的 icon
router.get('/getIcon', async ctx => {
  const { url } = ctx.request.query as { url: string }
  const data = await getInfinityIconApi(url)

  if (!data.iconArr.length) {
    data.iconArr = await getUrlIcon(url)
  }
  ctx.body = successRes(data)
})

// 获取输入框联锁词
router.get('/searchKeyword', async ctx => {
  const { wd } = ctx.request.query as { wd: string }
  const list = await getBaiduSearchKeyWord(wd)
  ctx.body = successRes({
    kw: wd,
    list
  })
})

export default router
