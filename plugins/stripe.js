import Vue from 'vue'
import VueStripeCheckout from 'vue-stripe-checkout'

const options = {
  key: process.env.STRIPE_KEY,
  locale: 'auto',
  currency: 'USD',
  billingAddress: true,
  panelLabel: 'Pay {{amount}}'
}

Vue.use(VueStripeCheckout, options)
