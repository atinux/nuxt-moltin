<template>
  <div>
    <Header/>
    <div class="container mx-auto mt-2 mb-2 lg:mt-4 lg:mb-4">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  }
}
</script>
