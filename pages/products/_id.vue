<template>
  <div class="flex items-center flex-wrap content-center">
    <div class="w-1/2 text-right">
      <img :src="product.image" height="200" class="mr-8" />
    </div>
    <div class="w-1/2 text-left">
      <div class="flex flex-col">
        <h2>{{ product.name }}</h2>
        <div class="mt-2">{{ product.meta.display_price.with_tax.formatted }}</div>
        <div class="mt-3">
          <div class="inline bg-moltin-grey-lighter rounded text-grey-darkest text-sm px-2 py-1">SKU: {{ product.sku }}</div>
        </div>
        <div>
          <div class="flex flex-wrap items-stretch w-full mb-4 relative mt-4">
            <input type="number" v-model="form.qty" class="w-48 leading-normal border h-10 border-grey-light rounded rounded-r-none px-3 relative">
            <div class="flex -mr-px cursor-pointer" @click="addToCart()">
              <span class="flex items-center leading-normal bg-blue text-white rounded rounded-l-none border border-l-0 border-blue px-3 whitespace-no-wrap text-sm">
                Add to cart
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <h3 class="font-bold text-md">About this product</h3>
      <p class="mt-2">{{ product.description }}</p>
      {{ product }}
    </div>
    <table class="w-full border rounded">
      <thead>
        <tr class="text-left">
          <th class="bg-grey-lighter p-2" colspan="2">Attributes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Material</td>
          <td>{{ product.material }}</td>
        </tr>
        <tr>
          <td>Max watt.</td>
          <td>{{ product.max_watt }}</td>
        </tr>
        <tr>
          <td>Bulb qty.</td>
          <td>{{ product.bulb_qty }}</td>
        </tr>
        <tr>
          <td>Finish</td>
          <td>{{ product.finish }}</td>
        </tr>
        <tr>
          <td>Fitting</td>
          <td>{{ product.bulb }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params, error }) {
    try {
      const { json: { data, included: { main_images } } } = await app.$moltin.getProductById(params.id)

      const imageId = data.relationships.main_image
        ? data.relationships.main_image.data.id
        : false

      console.log("data :", data)

      return {
        form: {
          qty: 1
        },
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
  },
  methods: {
    addToCart() {

    }
  }
}
</script>
