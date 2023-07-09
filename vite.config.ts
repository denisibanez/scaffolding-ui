import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from "url";
import { resolve, dirname } from "node:path";

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
   // expose .env as process.env instead of import.meta since jest does not import meta yet
   const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      }
    },
    {},
  )

  return {
    define: envWithProcessPrefix,
    rollupOptions: {
      input: 'src/main.ts',
      format: 'system',
      preserveEntrySignatures: true
    },
    base: '',
    test: {
      environment: "jsdom"
    },
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            base: '/src'
          }
        }
      }),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/index'),
      }),
  
      quasar({
        sassVariables: 'src/quasar-variables.sass'
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ` // just variables loaded globally
          `
        }
      }
    }
  }
})
