<template>
  <div class="flex justify-center pt-4 px-2 lg:px-0">
    <div class="w-full max-w-lg">
      <div v-for="item in cart.items" :key="item.id" class="border-b py-2 flex">
        <div class="flex-grow">
          <h2>{{ item.name }}</h2>
          <p class="text-grey-darker mt-2">{{ item.quantity }}x {{ item.meta.display_price.with_tax.value.formatted }}
          </p>
        </div>
        <div class="flex items-center">
          <button class="border px-2 py-1 rounded bg-red-light hover:bg-red text-white border-red" @click="remove(item.id)">x</button>
        </div>
      </div>
      <div v-if="!cart || !cart.items || !cart.items.length" class="text-center">
        <h2>Your cart is empty</h2>
      </div>
      <div class="flex items-center justify-between mt-3" v-if="cart && cart.items && cart.items.length">
        <div>
          <span class="font-bold">Sub total: </span>
          {{ cart.meta.display_price.with_tax.formatted }}</div>
        <button @click="checkout" class="bg-green hover:bg-green-dark text-sm rounded px-3 py-2 leading-none border border-green hover:border-green-dark text-white">Check out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['connected', 'cart']),
  methods: {
    async removeProduct(productId) {
      await this.$moltin.removeFromCart(this.cart.id, productId)
    },
    checkout() {
      this.$checkout.open({
        name: 'Nuxt.js demo',
        currency: 'USD',
        amount: 99999,
        token: (data) => this.createOrder(data)
      });
    },
    async createOrder(data) {
      const {
        id: token,
        email,
        card: {
          name,
          address_line1: line_1,
          address_city: city,
          address_country: country,
          address_state: county,
          address_zip: postcode
        }
      } = data

      const customer = {
        name,
        email
      }

      const address = {
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1],
        line_1,
        city,
        county,
        country,
        postcode
      }

      try {
        const { json: { data: { id } } } = await this.$moltin.checkoutCart(
          this.$store.state.cartId,
          customer,
          address
        )
        await this.$moltin.payForOrder(id, token, email)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
