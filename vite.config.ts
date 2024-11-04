import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: '0.0.0.0'
  },
  preview: {
    port: parseInt(process.env.PORT || '3000'),
    host: '0.0.0.0'
  }
})
