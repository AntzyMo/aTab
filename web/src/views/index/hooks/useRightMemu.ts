import { reactive, ref } from 'vue'

export default () => {
  const showRightMenu = ref(false)
  const mouseXY = reactive({
    x: 0,
    y: 0
  })

  const rightClick = (e: MouseEvent) => {
    showRightMenu.value = true
    mouseXY.x = e.x
    mouseXY.y = e.y
  }

  return {
    showRightMenu,
    rightClick,
    mouseXY
  }
}
