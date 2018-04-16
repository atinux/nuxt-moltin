<template>
  <div class="Account p-4 lg:px-0">
    <button class="Account__Button" type="button" @click="logout" :disabled="loading">
      <icon-loading v-show="loading"/>{{ loading ? 'Please wait' : 'Logout' }}
    </button>
    <h1 class="Account__Title">My account</h1>
    <div class="Account__Details">
      <h4 style="padding-bottom: 8px;">No recent orders</h4>
      <p>When you place an order, they will appear here.</p>
    </div>
  </div>
</template>

<script>
import iconLoading from '@/components/icons/loading'

export default {
  middleware: 'auth',
  components: {
    iconLoading
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    logout() {
      this.loading = true
      this.$store.dispatch('removeToken')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.Account {

}
.Account__Button {
  color: #fff;
  background-color: #42b883;
  border-radius: 4px;
  padding: 10px 20px;
  float: right;
}
.Account__Button:hover {
  background-color: #3C8171;
}
.Account__Button:focus {
  outline: none;
}
.Account__Title {
  font-size: 24px;
  font-weight: 400;
  padding-bottom: 30px;
}
.Account__Details {
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}
</style>
