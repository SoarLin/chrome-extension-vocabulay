import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // input: {
      //   background: 'src/background/background.ts',
      //   content_script: 'src/content_scripts/content_script.ts',
      //   index: 'src/main.tsx'
      // },
      // output: {
      //   entryFileNames: '[name].js',
      //   chunkFileNames: 'chunks/[name].js',
      //   assetFileNames: 'assets/[name].[ext]'
      // }
    },
    assetsInclude: ['manifest.json', 'icons/**']
  },
})
