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
      title: 'Hỗ trợ người già neo đơn',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, user-scalable=0',
        },
        {
          hid: 'hệ thống hỗ trợ người già neo đơn',
          name: 'hệ thống hỗ trợ người già neo đơn',
          content: 'Hệ thống quản lý hoạt động thiện nguyện h trợ người già neo đơn',
        },
        {
          hid: 'người già neo đơn',
          name: 'người già neo đơn',
          content: 'người già neo đơn',
        },
        {
          hid: 'hệ thống thiện nguyện',
          name: 'hệ thống thiện nguyện',
          content: 'hệ thống thiện nguyện',
        },
        {
          hid: 'thiện nguyện',
          name: 'thiện nguyện',
          content: 'thiện nguyện',
        },
        {
          hid: 'tình nguyện',
          name: 'tình nguyện',
          content: 'tình nguyện',
        },
      ],
    },
  },
  css: [
    '~/assets/css/main.css'
  ]
});
