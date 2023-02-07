import axios from 'axios'
import * as cheerio from 'cheerio'

// 获取 Infinityicon
export const getInfinityIconApi = async (url: string) => {
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
  console.log(iconRes.data.data, ' iconRes.data.data')
  const resData = {
    name: res.data.data.title,
    iconArr: [] as string[]
  }
  if (iconArr.length) resData.iconArr = iconArr

  return resData
}

// 爬取网站icon
export const getUrlIcon = async (url: string) => {
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
