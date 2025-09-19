import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'n-dialog': 'bg-light  dark:bg-#1a1a1a',
    'n-keyword-active': 'bg-black bg-opacity-4  dark:bg-opacity-4 dark:bg-white',
    'po-xy': 'top-0 left-0 right-0 bottom-0'
  },
  theme: {
    colors: {
      'b-base': '#62656a66'
    }
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {}
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
