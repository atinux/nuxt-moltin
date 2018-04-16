<template>
  <pre>My Account</pre>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    logout() {
      this.$store.dispatch('removeToken')
    }
  }
}
</script>
