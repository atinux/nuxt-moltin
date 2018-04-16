<template>
  <pre>{{ product }}</pre>
</template>

<script>
export default {
  async asyncData({ app, params, error }) {
    try {
      const { json: { data, included: { main_images } } } = await app.$moltin.getProductById(params.id)

      const imageId = data.relationships.main_image
        ? data.relationships.main_image.data.id
        : false

      return {
        product: {
          ...data,
          image: imageId
            ? main_images.find(img => img.id === imageId).link.href
            : '/static/moltin-light-hex.svg'
        }
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Product not found' })
    }
  }
}
</script>
