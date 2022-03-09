<template>
  <div class="section">
    <b-container>
      <h1 class="header"> User id: {{ id }}</h1>
      <User v-bind="user" />
    </b-container>
  </div>
</template>
<script>
import User from '~/components/User/User.vue'
import { mapState } from 'vuex'

export default {
  components: {
    User
  },
  async asyncData({params, store}) {
    const id = params.pathMatch
    if(!store.state.user) {
      await store.dispatch('getUser', id)
    }
    return { id }
  },
  computed: {
    ...mapState({user: 'user'})
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/main.scss';
</style>
