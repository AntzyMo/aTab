import {
  defineConfig, presetAttributify,
  presetIcons, presetTypography,
  presetUno
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default)
      }
    })
  ],
  theme: {
    colors: {
      'b-base': '#62656a66'
    }
  },
  shortcuts: {
    'n-dialog': 'bg-light  dark:bg-#1a1a1a',
    'n-keyword-active': 'bg-black bg-opacity-4  dark:bg-opacity-4 dark:bg-white'

  }
})
