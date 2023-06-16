import type { Directive, DirectiveBinding, VNode } from 'vue'

function debounce(fn: (playLoad: Event) => void, delay: number) {
  let timer: number | null
  return (arg: Event) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn && fn(arg)
    }, delay)
  }
}

function toArray(value: string | []) {
  if (Array.isArray(value)) return value
  return value ? [value] : null
}

function vDebounceFn(binding: DirectiveBinding, vnode: VNode) {
  const { props } = vnode

  const events = props && Object.keys(props!).filter(key => key.startsWith('on') && !key.startsWith('onUpdate'))
  if (!events?.length) return

  const debounceFnArr = toArray(binding.value)

  // 绑定事件
  const onEvent = (event: string) => {
    const eventUpperCase = event.startsWith('on') ? event : `on${event.replace(/^\S/, s => s.toUpperCase())}`
    const fn = Array.isArray(props![eventUpperCase]) ? props![eventUpperCase][0] : props![eventUpperCase]
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

const vDebounce: Directive = {
  created(el, binding, vnode) {
    vDebounceFn(binding, vnode)
  },
  beforeUpdate(el, binding, vnode) {
    vDebounceFn(binding, vnode)
  }
}

export default vDebounce

