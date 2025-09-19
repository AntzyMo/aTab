// 监听页面离开
export function pageVisibilitychange(callback: () => void) {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      callback()
    }
  })
}
