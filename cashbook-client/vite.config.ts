import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// ui组件的按需加载
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    // 开启css modules模式，文件名以 .module.less结尾
    modules: {
      localsConvention: 'dashesOnly'
    },
    // 配置支持less
    preprocessorOptions:{
      less:{
        modifyVars:{},
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    react(),
    // 按需加载配置
    styleImport({
      libs:[
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: name => `zarm/es/${name}/style/css`
        }
      ]
    })
  ],
})
