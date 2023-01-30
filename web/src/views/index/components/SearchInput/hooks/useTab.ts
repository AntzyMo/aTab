import { ref } from 'vue'

export default () => {
  const tabMap = ref([
    {
      name: 'Github',
      iconUrl: 'https://github.githubassets.com/favicons/favicon.svg',
      url: 'https://github.com'
    },
    {
      name: '掘金',
      iconUrl:
        'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-16x16.png',
      url: 'https://juejin.cn/'
    },
    {
      name: '知乎',
      iconUrl: 'https://static.zhihu.com/heifetz/favicon.ico',
      url: 'https://www.zhihu.com/'
    },
    {
      name: 'bilibili',
      iconUrl: 'https://www.bilibili.com/favicon.ico?v=1',
      url: 'https://www.bilibili.com/'
    },
    {
      name: 'gitee',
      iconUrl:
        'https://cn-assets.gitee.com/assets/favicon-9007bd527d8a7851c8330e783151df58.ico',
      url: 'https://gitee.com/zbano'
    },
    {
      name: '拉钩教育',
      iconUrl:
        'https://cn-assets.gitee.com/assets/favicon-9007bd527d8a7851c8330e783151df58.ico',
      url: 'https://kaiwu.lagou.com/'
    },
    {
      name: '公司导航页',
      iconUrl:
        'https://cn-assets.gitee.com/assets/favicon-9007bd527d8a7851c8330e783151df58.ico',
      url: 'http://192.168.60.201/'
    },
    {
      name: '摸摸鱼',
      iconUrl: 'https://momoyu.cc/favicon16.ico',
      url: 'https://momoyu.cc/'
    },
    {
      name: 'v2ex',
      iconUrl: 'https://momoyu.cc/favicon16.ico',
      url: 'https://www.v2ex.com/'
    },
    {
      name: 'cnode',
      iconUrl: 'https://momoyu.cc/favicon16.ico',
      url: 'https://cnodejs.org/'
    }
  ])
  const save = () => {
    console.log(111)

    chrome.storage.sync.set({ tabs: tabMap.value })
  }

  const getchreom = async () => {
    const res = await chrome.storage.sync.get(['tabs'])
    console.log('res', res)
  }
  return {
    tabMap,
    save,
    getchreom
  }
}
