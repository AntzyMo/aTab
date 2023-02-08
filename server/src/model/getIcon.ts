import axios from 'axios'
import * as cheerio from 'cheerio'

// 获取 Infinityicon
export const getInfinityIconApi = async (url: string) => {
  const resData = {
    name: '',
    iconArr: [] as string[]
  }
  // 1. 获取名称
  const res = await axios.get('https://api.infinitynewtab.com/v2/icon/title', {
    params: {
      url
    }
  })
  if (!res.data.data) return resData

  // 2. 获取icon
  const iconRes = await axios.get('https://api.infinitynewtab.com/v2/icon/get_logo_list', {
    params: {
      host: url,
      limit: 100
    }
  })
  resData.name = res.data.data.title
  const iconArr = iconRes.data.data.map((item: { src: any }) => item.src)
  if (iconArr.length) resData.iconArr = iconArr
  return resData
}

// 爬取网站icon
export const getUrlIcon = async (url: string) => {
  if (url.endsWith('/')) url = url.slice(0, -1)

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
