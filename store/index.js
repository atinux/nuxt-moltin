export const state = () => ({
  connected: false,
  token: null,
  cart: {
    id: null,
    items: [],
    meta: null
  }
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    state.connected = !!token
  },
  SET_CART_ID(state, cartId) {
    state.cart.id = cartId
  },
  SET_CART_DATA(state, { data, meta }) {
    state.cart.items = data
    state.cart.meta = meta
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    // Get if user is connected
    commit('SET_TOKEN', app.$cookies.get('token') || null)

    // Get Cart ID
    let cartId = app.$cookies.get('cart-id')

    if (!cartId) {
      cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
      app.$cookies.set('cart-id', cartId)
    }
    commit('SET_CART_ID', cartId)

    // Get Cart items
    const { json } = await app.$moltin.getCartItems(cartId)

    commit('SET_CART_DATA', json)
  }
}
