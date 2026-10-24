import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdownPlugin from './vite/markdown-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdownPlugin(), react()],
  base: '/',
})
