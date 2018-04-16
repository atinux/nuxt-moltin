<template>
  <div class="Register">
    <h1 class="Register__Title">Create an account</h1>
    <form action="/" @submit.prevent="register">
      <label class="Register__Form__Label" for="name">Name</label>
      <input v-model="form.name" class="Register__Form__Input" id="name" type="text">
      <label class="Register__Form__Label" for="email">Email</label>
      <input v-model="form.email" class="Register__Form__Input" id="email" type="email">
      <label class="Register__Form__Label" for="pwd">Password</label>
      <input v-model="form.password" class="Register__Form__Input" id="pwd" type="password">
      <button class="Register__Form__Button" type="submit">Register</button>
      <p class="Register__Message" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async register() {
      this.loading = true
      this.error = null
      try {
        const { token } = await this.$moltin.register(this.form)

        this.$store.dispatch('setToken', token)
        this.loading = false
        this.$router.push('/account')
      } catch ({ json: { errors } }) {
        this.error = errors.map((error) => error.detail).join('. ')
      }
    }
  }
}
</script>

<style>
.Register {

}
.Register__Title {
  font-size: 24px;
  font-weight: 400;
  padding: 20px 0;
}
.Register__Form {

}
.Register__Form__Label {
  display: block;
  color: #555;
  font-size: 14px;
  padding-bottom: 7px;
}
.Register__Form__Input {
  width: 100%;
  display: block;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 16px;
  height: 36px;
  padding: 0 5px;
}
.Register__Form__Input:focus {
  outline: none;
  border-color: #E06A2C;
}
.Register__Form__Button {
  color: #fff;
  background-color: #F2711C;
  border-radius: 4px;
  padding: 10px 20px;
}
.Register__Form__Button:hover {
  background-color: #E06A2C;
}
.Register__Form__Button:focus {
  outline: none;
}
.Register__Message {
  color: #E06A2C;
  padding: 20px 0;
  float: right;
}
</style>
