const colors = require("vuetify/es5/util/colors").default;
// const dotenv = require('@nuxtjs/dotenv')
require("dotenv").config();

module.exports = {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "小阮的博客",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "rmq",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        ref: "https://fonts.googleapis.com/css?family=Material+Icons",
        rel: "stylesheet"
      },
      {
        ref:
          "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
        rel: "stylesheet"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: ["assets/page-transletion.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/highlight.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
    // '@nuxtjs/style-resources',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#B388FF",
          secondary: "#7C4DFF",
          accent: "#8c9eff",
          error: "#b71c1c"
        }
      }
    }
  },
  styleResources: {
    less: "./assets/**/*.less"
    // sass: ...
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
  // generate: {
  //   routes() {
  //     return axios.get(process.env.API_URL)
  //       .then((res) => {
  //         return res.data.map((blog) => {
  //           return '/blog/' + blog.id
  //         })
  //       })
  //   }
  // }
};
