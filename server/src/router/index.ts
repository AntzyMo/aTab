import Router from '@koa/router'
import axios from 'axios'
import * as cheerio from 'cheerio'

import { successRes } from '../utils/bodyRes'
const router = new Router()

const getInfinityIconApi = async (url: string) => {
  const res = await axios.get('https://api.infinitynewtab.com/v2/icon/title', {
    params: {
      url
    }
  })

  const iconRes = await axios.get('https://api.infinitynewtab.com/v2/icon/get_logo_list', {
    params: {
      host: url,
      limit: 100
    }
  })
  const iconArr = iconRes.data.data.map((item: { src: any }) => item.src)
  return { name: res.data.data.title, iconArr }
}

// 爬取网站icon
const getUrlIcon = async (url: string) => {
  if (url.at(-1) === '/') url = url.slice(0, -1)

  const iconMap: string[] = []

  const res = await axios.get(url)
  const $ = cheerio.load(res.data)

  $('link[rel*=icon]').each(function (i) {
    const iconUrl = $(this).attr('href')!
    console.log('iconUrl', iconUrl)
    const hasCom = iconUrl.includes('com')
    const hasHttp = iconUrl.includes('http')

    if (hasCom && !hasHttp) {
      iconMap[i] = `https:${iconUrl}`
    } else if (!hasHttp) {
      iconMap[i] = url + iconUrl
    } else {
      iconMap[i] = iconUrl
    }
  })
  return [...new Set(iconMap)]
}

// 获取网站的 icon
router.get('/getIcon', async ctx => {
  const { url } = ctx.request.query as { url: string }
  const data = await getInfinityIconApi(url)

  if (!data.iconArr.length) {
    data.iconArr = await getUrlIcon(url)
  }
  ctx.body = successRes(data)
})

export default router
