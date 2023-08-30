import {  UserConfigExport, ConfigEnv } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import { format } from "date-fns"
import svgLoader from "vite-svg-loader"

import { defDTFormat } from "./src/config/dt"
import pkg from "./package.json"

const { name, version } = pkg
const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: format(new Date(), defDTFormat.dateTime),
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  return {
    root,
    resolve: {
      alias,
    },
    plugins: [
      vue(),

      // svg组件化支持
      svgLoader(),
      
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: 'types/auto-generate/auto-import.d.ts',
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass",
          })
        ],
      }),
      ElementPlus({}),
    ],
    build: {
      sourcemap: mode != "prod",
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("index.html"),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }
}

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir)
}

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build"),
}