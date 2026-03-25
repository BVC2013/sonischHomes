import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.simplyrets.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/listings/, '/properties'),
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.SIMPLYRETS_USER || 'simplyrets'}:${process.env.SIMPLYRETS_PASS || 'simplyrets'}`
            ).toString('base64'),
        },
      },
    },
  },
})
