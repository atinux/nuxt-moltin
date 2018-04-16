<template>
  <div class="Login p-4 lg:px-0">
    <h1 class="Login__Title">Log in to your account</h1>
    <form action="/" @submit.prevent="login">
      <label class="Login__Form__Label" for="email">Email</label>
      <input v-model="form.email" class="Login__Form__Input" id="email" type="email">
      <label class="Login__Form__Label" for="pwd">Password</label>
      <input v-model="form.password" class="Login__Form__Input" id="pwd" type="password">
      <button class="Login__Form__Button" type="submit" :disabled="loading">
        <icon-loading v-show="loading"/>{{ loading ? 'Please wait' : 'Login' }}
      </button>
      <p class="Login__Message" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import iconLoading from '@/components/icons/loading'

export default {
  components: {
    iconLoading
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async login () {
      this.loading = true
      this.error = null
      try {
        const { token } = await this.$moltin.login(this.form)
        this.$store.dispatch('setToken', token)
        this.$router.push('/account')
      } catch ({ json: { errors } }) {
        this.error = 'Invalid credentials'
      }
      this.loading = false
    }
  }
}
</script>

<style>
.Login {

}
.Login__Title {
  font-size: 24px;
  font-weight: 400;
  padding-bottom: 30px;
}
.Login__Form {

}
.Login__Form__Label {
  display: block;
  color: #555;
  font-size: 14px;
  padding-bottom: 7px;
}
.Login__Form__Input {
  width: 100%;
  display: block;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 16px;
  height: 36px;
  padding: 0 5px;
}
.Login__Form__Input:focus {
  outline: none;
  border-color: #E06A2C;
}
.Login__Form__Button {
  color: #fff;
  background-color: #F2711C;
  border-radius: 4px;
  padding: 10px 20px;
}
.Login__Form__Button:hover {
  background-color: #E06A2C;
}
.Login__Form__Button:focus {
  outline: none;
}
.Login__Message {
  color: #E06A2C;
  padding: 20px 0;
  float: right;
}
</style>
