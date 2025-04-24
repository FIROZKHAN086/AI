import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from 'tailwindcss'
export default {
  plugins: [
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'images.jpg', 'icon-512x512.png'],
      manifest: {
        name: 'AI Chatbot by Firoz',
        short_name: 'Firoz AI',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#1d4ed8',
        icons: [
          {
            src: '/images.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images.jpg',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]
}
