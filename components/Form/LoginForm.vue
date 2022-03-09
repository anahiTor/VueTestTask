<template>
  <div>
     <b-form @submit.prevent="onSubmit" class="login-form">
        <b-form-group
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
            size="lg"
            class="login-form-input"
            :state="validEmail"
          />
          <div>
            <b-form-invalid-feedback :state="validEmail">
              Invalid email
            </b-form-invalid-feedback>
          </div>
        </b-form-group>

        <b-form-group label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            placeholder="Enter password"
            type="password"
            required
            size="lg"
            class="login-form-input"
            :state="validPassword"
          />
          <div>
            <b-form-invalid-feedback :state="validPassword">
              Password must contain at least 5 characters
            </b-form-invalid-feedback>
          </div>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { INVALID_USER } from '~/constants'

export default{
  name: 'IndexPage',
  middleware: 'auth',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
    }
  },
  computed: {
    ...mapState({user: 'user'}),
    validEmail() {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if(this.form.email.length) {
        return !!this.form.email.match(regex)
      }
    },
    validPassword() {
      if(this.form.password.length) {
        return this.form.password.length > 5
      }
    }
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('login', this.form)
      if(this.user === INVALID_USER) {
        this.makeToast()
        this.form.email = ''
        this.form.password = ''
      }
      return
    },
    makeToast() {
      this.$bvToast.toast('Wrong login or password', {
        title: 'User not found',
        variant: 'danger',
        solid: true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/main.scss';

.login-form {
  &-input {
    margin-top: 1rem;
    &.is-valid {
      background-image: none;
      border-color: unset;
    }
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>