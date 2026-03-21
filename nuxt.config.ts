// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Sergio Piza | Data Engineer',
      htmlAttrs: {
        lang: 'en-US',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Sergio Piza\'s portfolio website. I am a data and software engineer. Most of my work sits where data pipelines, platform decisions, and real business constraints meet.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],

  compatibilityDate: '2025-01-06',

  vite: {
    optimizeDeps: {
      include: ['pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts'],
    },
  },
})
