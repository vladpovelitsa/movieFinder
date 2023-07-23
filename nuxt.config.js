// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    "~/assets/style/style.css",
  ],
  components: true,  
  runtimeConfig: {
    public: {
       omdbApiKey: "21eac196"
    }
  },
  modules: [
    '@element-plus/nuxt',
    'nuxt-swiper',
    '@pinia/nuxt',
  ],
  swiper: {},
})
