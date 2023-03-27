import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from "url";

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
    test: {
      environment: "jsdom"
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
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
