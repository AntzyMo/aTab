import type { IconType } from '@/types'
import type { InjectionKey } from 'vue'
import type { RemovableRef } from '@vueuse/core'

export const tabsKey: InjectionKey<RemovableRef<IconType[]>> = Symbol('tabs')
