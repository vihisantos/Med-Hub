import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use a dynamic base: in dev serve from '/', in production build use the repo subpath for GitHub Pages
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Med-Hub/' : '/',
  plugins: [react()]
}))