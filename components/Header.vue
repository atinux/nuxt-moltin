<template>
  <div class="bg-white border-b">
    <nav class="container mx-auto  flex items-center justify-between flex-wrap bg-white px-4 lg:px-0 py-4">
      <nuxt-link to="/" class="flex items-center flex-no-shrink text-white mr-6">
        <img src="/nuxt.svg" width="40" />
        <span class="font-semibold text-xl tracking-tight mx-2 text-black">Nuxt & Moltin</span>
        <img src="/moltin.svg" width="40" />
      </nuxt-link>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <nuxt-link v-if="connected" to="/account" class="block mt-4 no-underline lg:inline-block lg:mt-0 text-grey-darker hover:text-grey-darkest mr-4">
            My account
          </nuxt-link>
          <nuxt-link v-if="!connected" to="/register" class="block mt-4 no-underline lg:inline-block lg:mt-0 text-grey-darker hover:text-grey-darkest mr-4">
            Register
          </nuxt-link>
          <nuxt-link v-if="!connected" to="/login" class="block mt-4 no-underline lg:inline-block lg:mt-0 text-grey-darker hover:text-grey-darkest mr-4">
            Login
          </nuxt-link>
          <nuxt-link to="/cart" class="block mt-4 no-underline lg:hidden lg:mt-0 text-grey-darker hover:text-grey-darkest mr-4">
            Cart <span v-if="cart.items.length">({{ cart.items.length }})</span>
          </nuxt-link>
        </div>
        <div class="border-l hidden lg:inline-block">
          <nuxt-link to="/cart" class="flex items-center no-underline text-sm px-4 py-2 leading-none text-black mt-4 lg:mt-0">
            <icon-shopping-cart/>
            <span class="ml-2">Cart</span>
            <span class="ml-1" v-if="cart.items.length"> ({{ cart.items.length }})</span>
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import IconShoppingCart from './icons/shopping-cart.vue'

export default {
  computed: mapState(['connected', 'cart']),
  components: {
    IconShoppingCart
  }
}
</script>
