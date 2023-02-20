import type { Component } from 'vue'

import type IconDialog from './components/IconDialog/index.vue'
import type wallpaperDialog from './components/wallpaperDialog/index.vue'

export type iconDialogRefType = InstanceType<typeof IconDialog> | null

export type wallpaperDialogRefType = InstanceType<typeof wallpaperDialog> | null

export interface memuItem {
  name: string
  icon: Component
  type: 1 | 2
  click: () => void
}
