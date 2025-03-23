import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_ENV': JSON.stringify(mode)
  },
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        options: 'options.html',
        background: 'src/background.ts'
      },
      // input: {
      //   background: 'src/background/background.ts',
      //   content_script: 'src/content_scripts/content_script.ts',
      //   index: 'src/main.tsx'
      // },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    assetsInclude: ['manifest.json', 'icons/**']
  },
}))
