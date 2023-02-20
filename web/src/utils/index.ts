// 监听页面进入
export const pageVisibilitychange = (callback: () => void) => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      callback()
    }
  })
}

export const watchImageOnLoad = (src: string, callback: () => void) => {
  const img = new Image()
  img.src = src
  img.onload = () => callback()
}
