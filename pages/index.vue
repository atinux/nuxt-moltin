<template>
  <div class="flex flex-wrap items-center">
    <nuxt-link
      v-for="product in products"
      :key="product.id"
      :to="`/products/${product.id}`"
      class="product flex-grow border rounded m-3 text-black no-underline">
      <div class="text-center" style="background-color: rgba(0,0,0,.05);">
        <img :src="product.image" :alt="product.name" width="200">
      </div>
      <div class="p-3">
        <h3>{{ product.name }}</h3>
        <span>{{ product.meta.display_price.with_tax.formatted }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData({ app, error }) {
    const { json: { data, included: { main_images } } } = await app.$moltin.getProducts()
    const products = data.map(product => {
      const imageId = product.relationships.main_image
        ? product.relationships.main_image.data.id
        : false

      return {
        ...product,
        image: imageId
          ? main_images.find(img => img.id === imageId).link.href
          : '/static/moltin-light-hex.svg'
      }
    })

    return { products }
  }
}
</script>

<style scoped>
.product {
  transition: box-shadow .1s ease,transform .1s ease,-webkit-transform .1s ease;
}
.product:hover {
  /* border: none; */
  box-shadow: 0 1px 3px 0 #BCBDBD;
  transform: translateY(-3px);
}
</style>
