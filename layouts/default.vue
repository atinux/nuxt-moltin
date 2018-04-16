<template>
  <div>
    <Header/>
    <div class="container mx-auto">
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
