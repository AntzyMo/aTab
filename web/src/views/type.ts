import type { Component } from 'vue'

import type IconDialog from './components/IconDialog/index.vue'

export type iconDialogRefType = InstanceType<typeof IconDialog> | null

export interface memuItem {
  name: string
  icon: Component
  click: () => void
}
