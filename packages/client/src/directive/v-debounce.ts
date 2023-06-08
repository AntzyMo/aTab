import type { Directive } from 'vue'

function debounce(fn: () => void, delay: number) {
  let timer: number | null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn && fn()
    }, delay)
  }
}

function toArray(value: string | []) {
  if (Array.isArray(value)) return value
  return value ? [value] : null
}

const vDebounce: Directive = {
  created(el, binding, vnode) {
    const { props } = vnode

    const events = props && Object.keys(props!).filter(key => key.startsWith('on') && key !== 'onUpdate')
    if (!events?.length) return

    const debounceFnArr = toArray(binding.value)

    // 绑定事件
    const onEvent = (event: string) => {
      const eventUpperCase = `on${event.replace(/^\S/, s => s.toUpperCase())}`
      const fn = props![eventUpperCase]
      const delay = binding?.arg || 100
      vnode.props![eventUpperCase] = debounce(fn, +delay)
    }

    if (debounceFnArr) {
      debounceFnArr.forEach(event => onEvent(event))
    } else {
      // 不填且事件只有一个 默认绑定
      if (events.length === 1) {
        onEvent(events[0])
      }
    }
  }
}

export default vDebounce

