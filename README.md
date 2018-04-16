# Nuxt.js demo store

> 🛍 Nuxt.js demo store built with moltin

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/Atinux/nuxt-moltin&env=MOLTIN_CLIENT_ID&env=STRIPE_KEY)

Next.js webshop built using [Stripe checkout](https://stripe.com/checkout) and [moltin](https://moltin.com).

Check out the [demo](https://moltin.nuxtjs.org).

## 🛠 Configuration

Both a moltin and Stripe account are needed for this store to run successfully.

Create a `.env` file at the project root with your moltin `client_id` and Stripe test `publishable key`.

```dosini
MOLTIN_CLIENT_ID=
STRIPE_KEY=
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
