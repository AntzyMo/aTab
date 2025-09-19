import type { IconType } from '@/components/types'

export async function getTabs(): Promise<IconType[]> {
  return (await storage.getItem('sync:tabs')) || []
}

export async function updateTab(data: IconType[]) {
  storage.setItem('sync:tabs', data)
}

export async function deleteTab(index: number) {
  const tabs = await getTabs()
  tabs.splice(index, 1)
  updateTab(tabs)
}
