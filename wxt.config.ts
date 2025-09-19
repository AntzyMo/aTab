import UnoCSS from 'unocss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [UnoCSS()]
  }),
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'aTab - 新标签页',
    description: 'Antzy的新标签页',
    version: '3.0.0',
    permissions: [
      'storage'
    ],
    host_permissions: [
      '<all_urls>'
    ],
    icons: {
      128: 'icon/128.png'
    }
  }
})
