import axios from 'axios'
import * as cheerio from 'cheerio'
import * as nodeURL from 'node:url'

import { getItabIconApi } from '../api'

interface createIconDataType {
  name: string
  iconArr: { img: string; bgColor: string }[]
}
class CreateIconData {
  name: string
  iconArr: createIconDataType['iconArr']

  constructor(options?: createIconDataType) {
    this.name = options?.name || ''
    this.iconArr = options?.iconArr || []
  }
}

// 获取iTab的Icon
export const getItabIcon = async (url: string) => {
  const data = new CreateIconData()
  const res = await getItabIconApi(url)
  if (!res.data) return data

  data.name = res.data.name
  if (res.data.icon) {
    data.iconArr = res.data.icon.map(item => ({ img: item, bgColor: '' }))
  } else {
    data.iconArr = [{ img: res.data.imgSrc, bgColor: res.data.backgroundColor }]
  }
  return data
}

// 爬取网站icon
export const getUrlIcon = async (url: string) => {
  const { host, protocol } = nodeURL.parse(url)
  const iconUrl = `${protocol}//${host}`

  const iconMap: string[] = []

  const res = await axios.get(iconUrl)
  const $ = cheerio.load(res.data)

  $('link[rel*=icon]').each(function () {
    const imgHref = $(this).attr('href')!
    const parseUrl = nodeURL.parse(imgHref)
    if (!host) iconMap.push(iconUrl + parseUrl)
  })

  // 去重
  const handleSameIconMap = [...new Set(iconMap)]

  return new CreateIconData({
    name: $('title').text(),
    iconArr: handleSameIconMap.map(item => ({ img: item, bgColor: '' }))
  })
}
