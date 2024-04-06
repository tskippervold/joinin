// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  },
  modules: [
    '@nuxtjs/supabase',
    'dayjs-nuxt'
  ],
  supabase: {
    url: 'https://uvutgsgxjlmtqfyasbnx.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dXRnc2d4amxtdHFmeWFzYm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3MjMxNjAsImV4cCI6MjAyMDI5OTE2MH0.ius4gKS4OCVOrbanOQh90ZSem0URyx5msw07iG-cb0w'
  },
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
  plugins: ["~/plugins/preline.client.ts"]
})
