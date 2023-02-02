// 监听页面进入
export const pageVisibilitychange = (callback: () => void) => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      callback()
    }
  })
}
