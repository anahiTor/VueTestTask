<template>
  <div class="section">
    <b-container>
      <h1 class="header">Users</h1>
      <Table :users='users' />
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from '~/components/Table/Table.vue'

export default {
 name:'Users',
 middleware: 'auth',
 components: {
  Table,
 },

 async asyncData({store}) {
  await store.dispatch('getUsers')
 },

 computed: {
   ...mapState({
     users: 'users'
   })
 },
 mounted() {
   console.log(this.users, 'useer')
 }
}
</script>
<style lang="scss" scoped>
@import '~/assets/styles/main.scss'
</style>
