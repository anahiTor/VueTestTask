<template>
 <div class="login-page">
   <div class="form">
      <h1 class="header">Sign in</h1>
      <login-form />
   </div>
  </div>
</template>

<script>
import LoginForm from '~/components/Form/LoginForm.vue'

export default{
  name: 'IndexPage',
  middleware: 'auth',
  components: {
    LoginForm,
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/main.scss';
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  @include mobile {
    width: 90%;
  }
  .form {
    width: 100%;
    max-width: 30rem;
    padding: 2rem;
    box-shadow: 2px 5px 23px 4px $BORDERLINE;
  }
}

</style>
