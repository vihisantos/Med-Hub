import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base for GitHub Pages — use repository name (case-sensitive) so assets and routes load
  // If you deploy to e.g. https://<user>.github.io/Med-Hub/ use base: '/Med-Hub/'
  base: '/Med-Hub/',
  plugins: [react()]
})