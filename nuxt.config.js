import dotenv from 'dotenv'

// Load .env file
dotenv.config()

export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt.js with Moltin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js demo with Moltin API for e-commerce' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /**
   * Environment variables
   */
  env: {
    MOLTIN_CLIENT_ID: process.env.MOLTIN_CLIENT_ID,
    STRIPE_KEY: process.env.STRIPE_KEY
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/moltin.js',
    { ssr: false, src: '~/plugins/stripe.js' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'cookie-universal-nuxt'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
