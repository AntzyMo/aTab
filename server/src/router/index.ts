import Router from '@koa/router'
import axios from 'axios'
import * as cheerio from 'cheerio'

import { successRes } from '../utils/bodyRes'
const router = new Router()

// 获取网站的 icon
router.get('/getIcon', async ctx => {
  let { url } = ctx.request.query as { url: string }
  if (url.at(-1) === '/') url = url.slice(0, -1)

  const iconMap: string[] = []

  const res = await axios.get(url)
  const $ = cheerio.load(res.data)

  $('link[rel*=icon]').each(function (i) {
    console.log($(this).attr('href')!, 'sss')
    const iconUrl = $(this).attr('href')!
    if (!iconUrl.includes('http')) {
      iconMap[i] = url + iconUrl
    } else {
      iconMap[i] = iconUrl
    }
  })

  ctx.body = successRes({
    url,
    name: $('title').html(),
    iconArr: [...new Set(iconMap)]
  })
})

export default router
