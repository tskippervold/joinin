// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  },
  modules: [
    'dayjs-nuxt'
  ],
  dayjs: {
    plugins: ['localeData'],
    locales: ['en', 'nb']
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  plugins: ["~/plugins/preline.client.ts"],
})
