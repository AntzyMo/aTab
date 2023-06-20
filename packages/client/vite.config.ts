import fs from 'fs-extra'
import UnoCSS from 'unocss/vite'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import zipPack from 'vite-plugin-zip-pack'
import { URL, fileURLToPath } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(config => {
  const { mode } = config
  const isExtension = mode === 'extension'
  return {
    base: isExtension ? './' : '/',
    plugins: [
      vue(),
      UnoCSS(),
      Components(),
      clearDist(),
      isExtension && zipPack({
        inDir: resolve(__dirname, '../chrome'),
        outDir: resolve(__dirname, '../'),
        outFileName: 'chrome.zip'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: isExtension ? '../chrome/dist' : 'dist',
      emptyOutDir: false
    }
  } })

function clearDist(): PluginOption {
  return {
    name: 'clearDist',
    apply(config, { mode }) {
      return mode === 'extension'
    },
    buildEnd() {
      fs.remove(resolve(__dirname, '../chrome/dist/assets'))
    }
  }
}
