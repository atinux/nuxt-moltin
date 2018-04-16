import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id:
    process.env.MOLTIN_CLIENT_ID || 'j6hSilXRQfxKohTndUuVrErLcSJWP15P347L6Im0M4'
})

const $moltin = {
  // Products
  getProducts: () => Moltin.Products.With('main_image').All(),
  getProductById: (id) => Moltin.Products.With('main_image').Get(id),
  // Cart
  addToCart: (cartId, productId, quantity) => Moltin.Cart(cartId).AddProduct(productId, quantity),
  getCartItems: (id) => Moltin.Cart(id).Items(),
  removeFromCart: (cartId, productId) => Moltin.Cart(cartId).RemoveItem(productId),
  checkoutCart: (cartId, customer, billing) => Moltin.Cart(cartId).Checkout(customer, billing),
  // Order
  getOrders: (token) => Moltin.Orders.With('items').All(token),
  payForOrder(orderId, token, email) {
    return Moltin.Orders.Payment(orderId, {
      gateway: 'stripe',
      method: 'purchase',
      payment: token,
      options: {
        receipt_email: email
      }
    })
  },
  // Users
  async register({ email, password, ...rest }) {
    const { json: { data: { name, id } } } = await Moltin.Customers.Create({
      email,
      password,
      type: 'customer',
      ...rest
    })

    const { token } = await this.login({ email, password })

    return { id, name, email, token }
  },
  async login({ email, password }) {
    const { json: { data: { token } } } = await Moltin.Customers.Token(
      email,
      password
    )

    return { token }
  }
}

export default function (context, inject) {
  inject('moltin', $moltin)
}
