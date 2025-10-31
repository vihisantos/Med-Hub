import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // use relative base so the built site works when served from GitHub Pages
  base: './',
  plugins: [react()]
})