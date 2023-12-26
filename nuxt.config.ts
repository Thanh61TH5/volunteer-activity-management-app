// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase","nuxt-icon","@element-plus/nuxt","@pinia/nuxt"],
  supabase: {
    redirect: false,
  },
  auth: {
    globalAppMiddleware: {
      isEnabled: true,
    },
    provider: {
      pages: {
        login: "/login",
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
  },
  // @ts-ignore
  runtimeConfig: {
    public: {
      baseUrl: "http://localhost:3000/",
      baseImageUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/`,
    },
  },
  components: true,
  app: {
    head: {
      title: '',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, user-scalable=0',
        },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '',
        },

      ],
    },
  },
  css: [
    '~/assets/css/main.css'
  ]
});
