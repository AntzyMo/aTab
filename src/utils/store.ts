import type { IconType } from '@/components/types'

export async function getTabs(): Promise<IconType[]> {
  return (await storage.getItem('sync:tabs')) || []
}

async function setTab(data: IconType[]) {
  storage.setItem('sync:tabs', data)
}

export async function addTab(data: IconType) {
  const tabs = await getTabs()
  tabs.push(data)
  setTab(tabs)
}

export async function updateTab(data: IconType) {
  const tabs = await getTabs()
  const index = tabs.findIndex(tab => tab.name === data.name)
  tabs[index] = data
  setTab(tabs)
}

export async function deleteTab(data: IconType) {
  const tabs = await getTabs()
  const index = tabs.findIndex(tab => tab.name === data.name)
  tabs.splice(index, 1)
  setTab(tabs)
}
