// https://nuxt.com/docs/api/configuration/nuxt-config
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/prisma-nuxt-module#getting-started
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
        },
        {
          rel: "stylesheet",
          href: "//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic",
        },
        { rel: "stylesheet", href: "//demo.productionready.io/main.css" },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  modules: ["@prisma/nuxt"],
});
